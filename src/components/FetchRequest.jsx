/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider, wssProvider } from "@/constants/provider";
import { getModalContract } from "@/constants/contracts";
import { ethers } from "ethers";


export const useGetOPBalance = (address: any) => {
    const [userBalance, setUserBalance] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const fetchUserOpBalance = useCallback(async () => {
        try {
            const contract = getModalContract(readOnlyProvider);
            const res = await contract.getBalances(address);
            const converted = Number(res)
            setUserBalance(converted);
        } catch (error) {
            console.error(error);
        }
    }, [address]);

    const trackingMsgs = useCallback(() => {
        setCount((prevValue) => prevValue + 1);
        fetchUserOpBalance();
    }, [fetchUserOpBalance]);

    useEffect(() => {
        fetchUserOpBalance();

        const filter = {
            address: import.meta.env.VITE_MODA_CONTRACT_ADDRESS,
            topics: [ethers.id("DepositSuccessiful(address,uint256)")],
        };

        wssProvider.getLogs({ ...filter, fromBlock: 5834079 }).then((events) => {
            setCount(events.length + 1);
        });

        const provider = new ethers.WebSocketProvider(
            import.meta.env.VITE_WEB_SOCKET_RPC_URL
        );

        provider.on(filter, trackingMsgs);

        return () => {
            // Perform cleanup
            provider.off(filter, trackingMsgs);
        };

    }, [fetchUserOpBalance, trackingMsgs, count]);

    return userBalance;
}
import { useCallback } from "react"
import {
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";

import {
    getErc20TokenContract,
    getGovernanceContract
} from "../constants/contract";
import { parseUnits } from "ethers";

import { getProvider } from "../constants/providers";

export const useAddVotingPower = () => {
    const { walletProvider } = useWeb3ModalProvider();


    return useCallback(async (votingPower) => {
        if (votingPower !== "1000") {
            return toast.error("You can only add 1000 voting power!", {
                position: "top-center",
            });
        }

        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getGovernanceContract(signer);
        const erc20Contract = getErc20TokenContract(signer, import.meta.env.VITE_PEER_TOKEN_ADDRESS);

        try {
            const daoAddress = await contract.getAddress();
            const approveTx = await erc20Contract.approve(daoAddress, parseUnits(votingPower, 18));
            await approveTx.wait();

            const addVotingPowerTx = await contract.stakeForVotingPower();
            const receipt = await addVotingPowerTx.wait();

            console.log(receipt);

            return toast.success("Voting power added!", {
                position: "top-center",
            });

        } catch (error) {
            console.error(error)
            toast.error("Adding voting power failed!", {
                position: "top-center",
            });
        }

    }, [])
}

export const useReduceVotingPower = () => {
    const { walletProvider } = useWeb3ModalProvider();


    return useCallback(async () => {

        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getGovernanceContract(signer);

        try {
            const reduceVotingPowerTx = await contract.withdrawAndRevokeVotingPower();
            const receipt = await reduceVotingPowerTx.wait();

            console.log(receipt);

            return toast.success("Vote power reduced!", {
                position: "top-center",
            });
        } catch (error) {
            console.error(error)
            toast.error("Reducing voting power failed!", {
                position: "top-center",
            });
        }

    }, [])
}

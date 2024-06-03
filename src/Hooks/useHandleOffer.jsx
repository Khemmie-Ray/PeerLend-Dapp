import { useCallback } from "react"
import {
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";

import {
    getProtocolContract
} from "../constants/contract";

import { getProvider } from "../constants/providers";

const useHandleOffer = () => {
    const { walletProvider } = useWeb3ModalProvider();


    return useCallback(async (requestId, offerId, action) => {
        console.log(requestId, offerId, action)
        if (action !== "accept" && action !== "reject") {
            return toast.error("Invalid action!", {
                position: "top-center",
            });
        }

        const status = action === "reject" ? 1 : 2;

        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getProtocolContract(signer);

        try {
            const tx = await contract.respondToLendingOffer(requestId, offerId, status);
            const receipt = tx.wait();

            console.log(receipt);

            if (action === "accept") {
                return toast.success("Offer accepted!", {
                    position: "top-center",
                });
            } else {
                return toast.success("Offer rejected!", {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error(error)
            toast.error("Responding to offer failed!", {
                position: "top-center",
            });
        }

    }, [])
}

export default useHandleOffer
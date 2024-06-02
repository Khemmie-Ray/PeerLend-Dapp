import { useCallback } from "react"
import {
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";

import {
    getGovernanceContract
} from "../constants/contract";

import { getProvider } from "../constants/providers";

const useHandleVote = () => {
    const { walletProvider } = useWeb3ModalProvider();


    return useCallback(async (proposalId, optionId) => {

        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getGovernanceContract(signer);

        try {
            const voteTx = await contract.vote(proposalId, optionId);
            const voteReceipt = voteTx.wait();

            console.log(voteReceipt);

            return toast.success("Vote successful!", {
                position: "top-center",
            });

        } catch (error) {
            console.error(error)
            toast.error("Voting failed!", {
                position: "top-center",
            });
        }

    }, [])
}

export default useHandleVote
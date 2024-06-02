import { useCallback } from "react"
import {
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";

import {
    getGovernanceContract
} from "../constants/contract";

import { getProvider } from "../constants/providers";

const useHandleDelegateVote = () => {
    const { walletProvider } = useWeb3ModalProvider();


    return useCallback(async (delegateAddress, proposalId) => {

        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getGovernanceContract(signer);

        try {
            const delegateVoteTx = await contract.delegateVote(delegateAddress, proposalId);
            const delegateVoteReceipt = delegateVoteTx.wait();

            console.log(delegateVoteReceipt);

            return toast.success("Delegate vote successful!", {
                position: "top-center",
            });

        } catch (error) {
            console.error(error)
            toast.error("Delegate vote failed!", {
                position: "top-center",
            });
        }
    }, [])
}

export default useHandleDelegateVote
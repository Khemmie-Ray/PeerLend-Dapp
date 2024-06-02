import { useState } from "react";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getGovernanceContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";

const UpdateProposal = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const [proposalId, setProposalId] = useState('')
    const [status, setStatus] = useState("")

    async function handleUpdateProposal() {
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getGovernanceContract(signer);

        try {
            const tx = await contract.updateProposalStatus(proposalId, status);
            const receipt = await tx.wait();

            if (receipt.status) {
                return toast.success("Proposal update successful!", {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error(error)
            toast.error("Proposal update failed!", {
                position: "top-center",
            });
        }
    }

    return (
        <>
            <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
                Update Proposal Status
            </h2>
            <div className="flex w-[100%] justify-between flex-col lg:flex-row md:flex-row">
                <input
                    type="text"
                    placeholder="Proposal Id"
                    value={proposalId}
                    onChange={(e) => setProposalId(e.target.value)}
                    className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
                />
            </div>
            <div className="lg:w-[40%] md:w-[40%] w-[100%] mx-auto">
                <button
                    onClick={handleUpdateProposal}
                    className="bg-[#E0BB83] text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4 mx-auto text-center font-bold">
                    Update Proposal
                </button>
            </div>
        </>
    )
}

export default UpdateProposal
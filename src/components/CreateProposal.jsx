import { useState } from "react";
import { isSupportedChain } from "../utility";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getGovernanceContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from "ethers";

const CreateProposal = () => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [deadline, setDeadline] = useState('')
    const [proposedOptions, setproposedOptions] = useState('')
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState(0)
 
    async function handleCreateProposal() {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        // if (!isAddress(address)) return console.error("Invalid address");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
    
        const contract = getGovernanceContract(signer);
    
        try {
          const _deadlineDate = new Date(deadline).getTime() / 1000;
          const transaction = await contract.createProposal(title, proposedOptions, status, _deadlineDate);
          console.log("transaction: ", transaction);
          const receipt = await transaction.wait();
    
          console.log("receipt: ", receipt);
    
          if (receipt.status) {
            return toast.success("Proposal successful!", {
              position: "top-center",
            });
          }
    
          toast.error("Proposal failed!", {
            position: "top-center",
          });
        } catch (error) {
          console.error(error);
          toast.error("Proposal failed!", {
            position: "top-center",
          });
        } finally {
            setDeadline("")
    
      };
    }
      
  return (
    <div className="bg-deepBlue rounded-lg py-8 px-4 mb-4">
      <h2 className="lg:text-[36px] md:text-[36px] text-[24px] font-bold my-4">
        Create Proposal
      </h2>
      <div className="flex w-[100%] justify-between flex-col lg:flex-row md:flex-row">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
        <input
          type="text"
          placeholder="Options"
          onChange={(e) => setproposedOptions(e.target.value)}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
      </div>
      <div className="flex w-[100%] justify-between flex-col lg:flex-row md:flex-row">
        <input
          type="text"
          placeholder="Status"
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
        <input
          type="text"
          placeholder="Deadline"
          onChange={(e) => setDeadline(e.target.value)}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
      </div>
      <div className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto">
        <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4 mx-auto text-center" onClick={handleCreateProposal}>
          Create Proposals
        </button>
      </div>
    </div>
  );
}

export default  CreateProposal

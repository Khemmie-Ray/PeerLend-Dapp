import { useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getGovernanceContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateProposal = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [deadline, setDeadline] = useState('')
  const [deadlineEpoch, setDeadlineEpoch] = useState('')
  const [proposedOptions, setproposedOptions] = useState([])
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState("")

  function handleOptions(e) {
    const options = e.target.value.split(",");
    const optionsNew = [];

    options.forEach((option) => {
      optionsNew.push(option.trim());
    });

    if (optionsNew[optionsNew.length - 1] === "" || optionsNew[optionsNew.length - 1] === " ") {
      optionsNew.pop()
    }

    setproposedOptions(optionsNew);
  }

  async function handleCreateProposal() {
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getGovernanceContract(signer);

    try {
      console.log(title, proposedOptions, status, deadlineEpoch)
      const transaction = await contract.createProposal(title, proposedOptions, status, deadlineEpoch);
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
      setStatus("")
      setTitle("")
      setproposedOptions("")
    };
  }

  return (
    <div>
      <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
        Create Proposal
      </h2>
      <div className="flex w-[100%] justify-between flex-col lg:flex-row md:flex-row">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
        <input
          type="text"
          placeholder="Options"
          onChange={handleOptions}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
      </div>
      <div className="flex w-[100%] justify-between flex-col lg:flex-row md:flex-row">
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => {
            const now = Date.now();
            const deadline = Math.floor((Date.parse(e.target.value) - now) / 1000);
            setDeadline(e.target.value)
            setDeadlineEpoch(deadline)
          }}
          className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
        />
      </div>
      <div className="lg:w-[40%] md:w-[40%] w-[100%] mx-auto">
        <button className="bg-bg-ash text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4 mx-auto text-center font-bold" onClick={handleCreateProposal}>
          Create Proposals
        </button>
      </div>
    </div>
  );
}

export default CreateProposal

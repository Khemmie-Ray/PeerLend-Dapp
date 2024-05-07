import { useState } from "react";
import { isSupportedChain } from "../utility";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProtocolContract, getErc20TokenContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { ethers } from "ethers";

import TokenList from '../constants/tokenList';
const style = {
  position: 'absolute',
  top: '50% ',
  left: '50%',
  color: 'white',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  backgroundColor: '#1E1D34',
  p: 4,
};

const ServiceRequest = () => {
  const [requestId, setRequestId] = useState("");
  const [tokenAdd, setTokenAdd] = useState("");
  const [borrower, setBorrower] = useState("");
  const [lender, setLender] = useState("");
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState("");
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [returnDate, setReturnDate] = useState("");
  const [loanCurrency, setLoanCurrency] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function handleChange(event) {
    setRequestId(event.target.value);

    if (event.target.value === "" || event.target.value === "0" || event.target.value === undefined) {
      setBorrower("");
      setLender("");
      setAmount("");
      setInterest("");
      setTotalRepayment("");
      setReturnDate("");
      setLoanCurrency("");
      return console.log("No request found");
    }

    const readWriteProvider = getProvider(walletProvider);
    // const signer = await readWriteProvider.getSigner();

    const contract = getProtocolContract(readWriteProvider);
    const requests = await contract.getRequestById(event.target.value);

    // console.log("=====>", requests);


    const lender = requests[7];
    const tokenDecimals = TokenList[requests[8]].decimals;


    const _borrower = requests[1];
    const _amount = ethers.formatUnits(requests[2].toString(), tokenDecimals).toString();
    const _interest = requests[3].toString();
    const _totalRepayment = ethers.formatUnits(requests[4].toString(), tokenDecimals).toString();
    const _returnDate = requests[6].toString();
    const _tokenName = TokenList[requests[8]].name;
    const _tokenAdd = TokenList[requests[8]].address;

    setBorrower(_borrower);
    setLender(lender);
    setAmount(_amount);
    setInterest(_interest);
    setTotalRepayment(_totalRepayment);
    setReturnDate(_returnDate);
    setLoanCurrency(_tokenName);
    setTokenAdd(_tokenAdd);

    // console.log("=====>", requests)
  }

  async function handleRequest() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProtocolContract(signer);
    const erc20contract = getErc20TokenContract(signer, tokenAdd);

    const _amount = ethers.parseUnits(amount, TokenList[tokenAdd].decimals).toString();

    try {
      const approveTx = await erc20contract.approve(contract.getAddress(), _amount);
      const approveReceipt = await approveTx.wait();

      if (approveReceipt.status) {
        toast.success("Approval successful!", {
          position: "top-center",
        });
      } else {
        toast.error("Approval failed!", {
          position: "top-center",
        });
        throw new Error("Approval failed");
      }

      const serviceTx = await contract.serviceRequest(borrower, requestId, tokenAdd);
      const serviceReceipt = await serviceTx.wait();

      if (serviceReceipt.status) {
        return toast.success("Service request successful!", {
          position: "top-center",
        });
      } else {
        toast.error("Service request failed!", {
          position: "top-center",
        });
        throw new Error("Service request failed");
      }
    } catch (error) {
      console.log(contract.interface.parseError("0x06115b56"))
      toast.error("Transaction failed", {
        position: "top-center",
      });
      console.log(error);
    }

  };

  return (
    <div>
      <div>
        <button
          onClick={handleOpen}
          className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4"
        >Service</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <input type="text" placeholder='Request ID' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={requestId} onChange={(e) => handleChange(e)} />
            <input type="text" placeholder='Lender' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={lender} disabled />
            <input type="text" placeholder='Loan Currency' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={loanCurrency} disabled />
            <input type="text" placeholder='Amount' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={amount} />
            <input type="text" placeholder='Interest' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={interest} disabled />
            <input type="text" placeholder='Total Repayment' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={totalRepayment} disabled />
            <input type="text" placeholder='Return date' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={returnDate} disabled />
            <button className="bg-purple text-white py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4" onClick={handleRequest}>Service Request &rarr;</button>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default ServiceRequest
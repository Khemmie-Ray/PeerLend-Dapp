import { useState } from "react";
import { isSupportedChain } from "../utility";
// import { isAddress } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProtocolContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ethers } from "ethers";
import TokenList from '../constants/tokenList';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  color: 'white',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  backgroundColor: '#1E1D34',
  p: 4,
};

const CreateRequest = () => {

  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loanCurrency, setLoanCurrency] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function handleRequest() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    // if (!isAddress(address)) return console.error("Invalid address");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProtocolContract(signer);

    try {
      const _returnDate = new Date(returnDate).getTime() / 1000;
      const _amount = ethers.parseUnits(amount, TokenList[loanCurrency].decimals);
      console.log(_returnDate, _amount);
      const transaction = await contract.createLendingRequest(_amount, interest, _returnDate, loanCurrency);
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("Request successful!", {
          position: "top-center",
        });
      }

      toast.error("Request failed, Verify email first!", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Request failed!", {
        position: "top-center",
      });
    } finally {
      setAmount(0);
      setInterest("");
      setReturnDate("");
      setLoanCurrency("");

      handleClose();
    }
  };

  return (
    <div>
      <div>
        <button className="bg-purple text-white py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4" onClick={handleOpen}>Create Request</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <input type="text" placeholder='Amount' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder='Interest' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" onChange={(e) => setInterest(e.target.value)} />
            <input type="Date" placeholder='Return date' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" onChange={(e) => setReturnDate(e.target.value)} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>Loan Currency</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={loanCurrency}
                label="loan currency"
                onChange={(e) => setLoanCurrency(e.target.value)}
                sx={{ backgroundColor: "#ffffff23", outline: "none", color: "gray", marginBottom: "20px" }}
              >
                {Object.keys(TokenList).map((address) => {
                  const token = TokenList[address];
                  return (<MenuItem key={token.address} value={token.address}>{token.symbol}</MenuItem>)
                })}
              </Select>
            </FormControl>
            <button className="bg-purple text-white py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4" onClick={handleRequest}>Create &rarr;</button>
          </Box>
        </Modal>
      </div>
    </div>
  )
};

export default CreateRequest
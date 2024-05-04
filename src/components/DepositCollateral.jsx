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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ethers } from "ethers";

const DepositCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [tokenAdd, setTokenAdd] = useState("");
  const [depositAmount, setDepositAmount] = useState(0)

  const handleChange = (event) => {
    setTokenAdd(event.target.value);
  };

  console.log(tokenAdd)

  async function handleRequest() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProtocolContract(signer);
    const erc20contract = getErc20TokenContract(signer, tokenAdd);

    try {
      const approveTx = await erc20contract.approve(import.meta.env.VITE_CONTRACT_ADDRESS, ethers.parseUnits(depositAmount, 18));
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

      const transaction = await contract.depositCollateral(tokenAdd, ethers.parseUnits(depositAmount, 18));
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("Collateral deposit successful!", {
          position: "top-center",
        });
      } else {
        toast.error("Collateral deposit failed!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Collateral deposit failed", {
        position: "top-center",
      });
      console.log(error)
    }
  };

  return (
    <div>
      <p className='lg:text-[24px] md:text-[24px] text-[18px] mb-4'>Deposit collateral</p>
      <Box sx={{ minWidth: 120, backgroundColor: "#1E1D34" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>Token Address</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tokenAdd}
            label="tokenAdd"
            onChange={handleChange}
            sx={{ backgroundColor: "#ffffff23", outline: "none", color: "gray", marginBottom: "20px" }}
          >
            <MenuItem value="0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6">DAI</MenuItem>
            <MenuItem value="0x779877A7B0D9E8603169DdbD7836e478b4624789">LINK</MenuItem>
            <MenuItem value="0xf08A50178dfcDe18524640EA6618a1f965821715">USDC</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <input type="text" placeholder='amount of collateral' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" onChange={(e) => setDepositAmount(e.target.value)} />
      <button className="bg-purple py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4" onClick={handleRequest}>Deposit &rarr;</button>
    </div>
  )
}

export default DepositCollateral
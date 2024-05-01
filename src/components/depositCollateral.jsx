import { useState } from "react";
import { isSupportedChain } from "../utility";
import { isAddress } from "ethers";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
  } from "@web3modal/ethers/react";
import { getProtocolContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const depositCollateral = () => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [tokenAdd, setTokenAdd] = useState("");
    const [depositAmount, setDepositAmount] = useState(0)

    async function handleRequest () {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        if (!isAddress(address)) return console.error("Invalid address");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
    
        const contract = getProtocolContract(signer);
    
        try {
          const transaction = await contract.depositCollateral();
          console.log("transaction: ", transaction);
          const receipt = await transaction.wait();
    
          console.log("receipt: ", receipt);
    
          if (receipt.status) {
            return toast.success("UserName creation successful!", {
                position: "top-center",
              });
          }
    
          toast.error("UserName creation failed!", {
            position: "top-center",
          });
        } catch (error) {
          toast.error("UserName creation failed!", {
              position: "top-center",
            });
        }
      };

  return (
    <div>
        <p className='lg:text-[24px] md:text-[24px] text-[18px] mb-4'>Deposit collateral</p>
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Token Address</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tokenAdd}
          label="Token Address e"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <input type="text" placeholder='amount of collateral' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
    <button className="bg-purple py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4">Deposit &rarr;</button></div>
  )
}

export default depositCollateral
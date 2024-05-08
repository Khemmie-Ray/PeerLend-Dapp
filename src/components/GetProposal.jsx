import { useState } from "react";
import { isSupportedChain } from "../utility";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
  } from "@web3modal/ethers/react";
import { getGovernanceContract } from "../constants/contract";
import { readOnlyProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const GetProposals = () => {
    const { chainId } = useWeb3ModalAccount();
    // const { walletProvider } = useWeb3ModalProvider();
    const [allProposals, setAllProposals] = useState('')

    async function handleProposals () {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
      
        const contract = getGovernanceContract(readOnlyProvider);
    
        try {
          const transaction = await contract.getAllProposals();
            console.log(transaction)
            setAllProposals(transaction)
            
        } catch (error) {
          toast.error("Collateral deposit failed", {
              position: "top-center",
            });
          console.log(error)
        }
      };

      console.log(allProposals)

  return (
    <div>
        
       
</div>
  )
}

export default GetProposals
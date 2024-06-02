import { useState } from "react";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProtocolContract, getErc20TokenContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ethers } from "ethers";

import TokenList from '../constants/tokenList';
const style = {
    position: 'absolute',
    top: '50%',
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

const WithdrawCollateral = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const { address } = useWeb3ModalAccount();
    const [maxTokenCollateralAmount, setMaxTokenCollateralAmount] = useState(0);
    const [collateralAmount, setCollateralAmount] = useState(0);
    const [collateralCurrencyAddress, setCollateralCurrencyAddress] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function handleChange(event) {
        if (event.target.value === "" || event.target.value === "0" || event.target.value === undefined) {
            setCollateralCurrency("");
            return console.log("No collateral amount found");
        }
        const _collateralCurrencyAddress = event.target.value;
        setCollateralCurrencyAddress(event.target.value);

        const provider = getProvider(walletProvider);

        const contract = await getProtocolContract(provider);
        const totalTokenCollateral = await contract.gets_addressToCollateralDeposited(address, _collateralCurrencyAddress);

        setMaxTokenCollateralAmount(totalTokenCollateral);

        console.log(totalTokenCollateral);
    }

    async function handleWithdraw() {
        if (collateralAmount === "" || collateralAmount === "0" || collateralAmount === undefined) {
            toast.error("Collateral amount is required", {
                position: "top-center",
            })
            return console.log("No collateral amount found");
        }

        const provider = getProvider(walletProvider);
        const signer = await provider.getSigner();

        const contract = await getProtocolContract(signer);

        const _collateralAmount = ethers.parseUnits(collateralAmount, TokenList[collateralCurrencyAddress]?.decimals);

        try {
            const transaction = await contract.withdrawCollateral(collateralCurrencyAddress, _collateralAmount);
            const receipt = await transaction.wait();
            console.log(receipt);
            toast.success("Collateral withdraw successful", {
                position: "top-center",
            });
        } catch (error) {
            toast.error("Collateral withdraw failed", {
                position: "top-center",
            });
            console.log(error);
        } finally {
            setCollateralAmount(0);
            setCollateralCurrencyAddress("");
            handleClose();
        }
    }

    return (
        <div className="w-[100%]">
            <button
                onClick={handleOpen}
                className="bg-bg-gray border border-bg-ash/50 my-2 hover:bg-bg-ash hover:text-darkGrey hover:font-bold px-4 py-2 w-[98%] text-center text-[16px] font-bold rounded-lg"
            >Withdraw</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='lg:text-[24px] md:text-[24px] text-[18px] mb-4'>Withdraw collateral</p>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>Token Address</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={collateralCurrencyAddress}
                            label="collateralCurrencyAddress"
                            onChange={handleChange}
                            sx={{ backgroundColor: "#ffffff23", outline: "none", color: "gray", marginBottom: "20px" }}
                        >
                            {Object.keys(TokenList).map((address) => {
                                const token = TokenList[address];
                                return (<MenuItem key={token.address} value={token.address}>{token.symbol}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <input type="text" placeholder='Amount to withdraw' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={collateralAmount} onChange={(e) => setCollateralAmount(e.target.value)} />
                    <p
                        className='text-[14px]'
                    >Max: {ethers.formatUnits(maxTokenCollateralAmount, TokenList[collateralCurrencyAddress]?.decimals)} {TokenList[collateralCurrencyAddress]?.name}
                    </p>
                    <button
                        onClick={handleWithdraw}
                        className="bg-bg-ash font-bold text-darkGrey py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4"
                    >Withdraw</button>
                </Box>
            </Modal>
        </div>
    )
}

export default WithdrawCollateral
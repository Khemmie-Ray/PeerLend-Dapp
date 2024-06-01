import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { isSupportedChain } from "../utility";
// import { isAddress } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProtocolContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
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

const EmailVerification = () => {
    const { address } = useWeb3ModalAccount();
    const [email, setEmail] = useState('');
    const [otpCode, setOtpCode] = useState(0);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const [status, setStatus] = useState(false);

    const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

    const headers = {
        'Content-Type': 'application/json',
    };

    const handleAction = async () => {
        if (!email) {
            setError("Email is required.");
            return;
        }


        try {
            await sendOtpRequest(email);
        } catch (error) {
            setError('An error occurred, please try again.');
            console.error('Submission error:', error);
        }
    };

    const sendOtpRequest = async (email) => {
        const toastId = toast.loading('Sending OTP...', { autoClose: false, position: 'top-center' });

        try {
            const res = await axios.post('https://email-service-backend-2.onrender.com/api/v1/sendOtp', { email }, { headers });

            if (res.status === 201) {
                toast.update(toastId, { render: 'OTP sent successfully.', type: 'success', position: 'top-center', autoClose: 5000, isLoading: false });
                setError('OTP sent successfully.');
            }
        } catch (error) {
            toast.update(toastId, { render: 'Failed to send OTP. Please try again.', type: 'error', position: 'top-center', autoClose: 5000, isLoading: false });
            setError('Failed to send OTP. Please try again.');
            console.error('Error sending OTP:', error);
        }
    };



    const verifyOtp = async () => {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        // if (!isAddress(address)) return console.error("Invalid address");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
    
        const contract = getProtocolContract(signer);

        if (!otpCode) {
            setError("OTP is required.");
            return;
        }

        const toastId = toast.loading('Verifying OTP...', { autoClose: false, position: 'top-center' });

        try {
            // Replace this URL with the actual verification endpoint
            const res = await axios.post('https://email-service-backend-2.onrender.com/api/v1/verifyMail', { email, otp: otpCode }, { headers });


            if (res.status === 200) {
                toast.update(toastId, { render: 'OTP verified successfully.', type: 'success', position: 'top-center', autoClose: 5000, isLoading: false });
                const tx = await contract.updateEmail(address, email, true)
                const receipt = await tx.wait()
                setError('OTP verified successfully.')
            } else {
                toast.update(toastId, { render: res.data?.message, type: 'error', position: 'top-center', autoClose: 5000, isLoading: false });
                throw new Error('Failed to verify OTP. Please try again.');
            }

            console.log(res); // Log the response from the backend (if any

            if (updateRes.status === 200) {
                setError('User verified successfully.');
                toast.update(toastId, { render: 'User verified successfully.', type: 'success', position: 'top-center', autoClose: 5000, isLoading: false });
            } else {
                setError('Failed to verify user. Please try again.');
                throw new Error('Failed to verify user. Please try again.');
            }
        } catch (error) {
            toast.update(toastId, { render: error, type: 'error', position: 'top-center', autoClose: 5000, isLoading: false });
            setError('Failed to verify OTP. Please try again.');
            console.error('Error verifying OTP:', error);
        } finally {
            setError('');
            setOtpCode('');
            setEmail('');
            handleClose();
        }

    };



    return (
        <div className="flex flex-col items-center mt-2">
            <div className="flex items-center">
            <button className="border border-bg-ash py-2 px-4 rounded-lg text-[18px] w-[50%] mb-4" onClick={() => {
                handleOpen()
            }}>Verify &rarr;</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
            <input
                type="text"
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                className="w-[50%] px-4 py-2 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" />
            <button className="border border-bg-ash py-2 px-4 rounded-lg text-[18px] w-[50%] mb-4" onClick={() => {
                if (!email) return toast.error("Email is required");
                handleAction()
            }}>Verify &rarr;</button>
            </Box>  
            </Modal>
            </div>
          
             <button className="border border-bg-ash py-2 px-4 rounded-lg text-[18px] w-[50%] mb-4" onClick={() => {
                handleOpen()
            }}>OTP&rarr;</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='lg:text-[24px] md:text-[24px] text-[18px] mb-4'>Enter OTP</p>
                    <input
                        type="text"
                        placeholder='Email'
                        value={email}
                        className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" />
                    <input
                        type="text"
                        placeholder='OTP'
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" />
                    <button className="bg-purple text-white py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4" onClick={() => {
                        if (!otpCode) return toast.error("OTP is required");
                        verifyOtp();
                    }}>Verify OTP</button>
                </Box>
            </Modal>
        </div>
    );
};

export default EmailVerification;
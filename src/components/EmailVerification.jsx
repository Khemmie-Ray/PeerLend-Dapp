import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
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
                setError('OTP verified successfully.')
            } else {
                toast.update(toastId, { render: res.data?.message, type: 'error', position: 'top-center', autoClose: 5000, isLoading: false });
                throw new Error('Failed to verify OTP. Please try again.');
            }

            console.log(res); // Log the response from the backend (if any

            // Update the status to indicate the user is verified
            // setStatus(true); // Assuming status is a boolean indicating verification status

            // Prepare the data to send to the backend
            const dataToSend = {
                user: address,
                email: email, // The user's email
                isVerified: res.data?.verifiedStatus // The OTP code entered by the user
            };

            //   // Make a POST request to your backend endpoint
            const updateRes = await axios.post('https://relayer-node-js-1.onrender.com/updateEmail', dataToSend, { headers });
            // console.log(updateRes); // Log the response from the backend (if any)
            setError('Data sent to contract successfully.');

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
        <div className="flex items-center mt-2">
            <input
                type="text"
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg w-[50%] px-4 py-2 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" />
            <button className="bg-purple py-2 px-4 rounded-lg text-[18px] w-[50%] mb-4" onClick={() => {
                if (!email) return toast.error("Email is required");
                handleAction()
                handleOpen()
            }}>Verify &rarr;</button>
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
                        disabled
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
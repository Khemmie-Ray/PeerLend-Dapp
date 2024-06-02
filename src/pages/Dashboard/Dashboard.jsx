import WithdrawCollateral from "../../components/WithdrawCollateral";
import CreateRequest from "../../components/CreateRequest";
import GitCoinVerification from "../../components/GitCoinVerification";
import DepositCollateral from "../../components/DepositCollateral";
import UseFetchRequests from "../../Hooks/UseFetchRequests";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { isSupportedChain } from "../../utility";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProtocolContract } from "../../constants/contract";
import { getProvider } from "../../constants/providers";
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

const Dashboard = () => {
  const allRequests = UseFetchRequests()
  const { address } = useWeb3ModalAccount();
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(0);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEmailOpen = () => setOpenEmail(true);
  const handleEmailClose = () => setOpenEmail(false);
  const [openEmail, setOpenEmail] = useState('');
  const [value, setValue] = useState("Collateral");

  const handleChange = (event, value) => {
    setValue(value); 
  };

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
    <main className="">
      <div className='flex justify-between flex-col lg:flex-row md:flex-row items-center mb-6'>
      <h2 className="lg:text-[26px] md:text-[26px] text-[20px] font-bold mb-4 items-center">Welcome</h2>
        <div className='flex'>
            <p className='uppercase mr-8'>$PEER Balance <br /> <span className='lg:text-[20px] md:text-[22px] text-[18px] font-bold'>0.00</span></p>
            <p className='uppercase'>Collateral <br /> <span className='lg:text-[22px] md:text-[22px] text-[18px] font-bold'>0.00</span></p>
          </div>
        </div>
      <section className='flex justify-between flex-col lg:flex-row md:flex-row border bg-bg-gray border-bg-ash/50 p-6 rounded-lg'>
          <div className="w-[100%] lg:w-[28%] md:w-[28%]">
          <h2>Let's get you started!</h2>
        <p>Verify your identity to get started</p>
          </div>
        <div className="w-[100%] lg:w-[25%] md:w-[25%]" >
          <p className="uppercase">Step 1</p>
          <p>Gitcoin Verification</p>
          <GitCoinVerification />
        </div>
        <div className="w-[100%] lg:w-[25%] md:w-[25%]">
          <p className="uppercase">Step 2</p>
          <p>Email Verification</p>
          <div className="flex flex-col">
            <button className="border border-bg-ash/50 py-2 px-4 rounded-lg text-[16px] w-[50%] my-2 hover:bg-bg-ash hover:text-darkGrey hover:font-bold" onClick={handleEmailOpen}>Verify &rarr;</button>
            
            <Modal
                open={openEmail}
                onClose={handleEmailClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                  <p className="mb-4">Email Verification</p>
            <input
                type="text"
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                className="w-[100%] px-4 py-2 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" />
            <button className="bg-bg-ash text-darkGrey font-bold py-2 px-4 rounded-lg text-[18px] w-[100%] mb-4" onClick={() => {
                if (!email) return toast.error("Email is required");
                handleAction()
            }}>Verify &rarr;</button>
            </Box>  
            </Modal>
            </div>
        </div>
        <div className="w-[100%] lg:w-[20%] md:w-[20%]">
          <p className="uppercase">Step 3</p>
          <p>OTP Verification</p>
          <div>
          <button className="border border-bg-ash/50 py-2 px-4 rounded-lg text-[16px] w-[50%] my-2 hover:bg-bg-ash hover:text-darkGrey hover:font-bold" onClick={() => {
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
                    <button className="bg-bg-ash text-darkGrey py-2 px-4 rounded-lg text-[16px] w-[100%] my-4" onClick={() => {
                        if (!otpCode) return toast.error("OTP is required");
                        verifyOtp();
                    }}>Verify OTP</button>
                </Box>
            </Modal>
          </div>
        </div>
        {/* <img src="https://img.freepik.com/free-photo/account-verification-with-password-3d-padlock_107791-16181.jpg?t=st=1717266105~exp=1717269705~hmac=a5c53fa0e794f474233cf18cbd7799d0c9982b1959d781a71b3d83a38c1933ef&w=1800" alt="" /> */}     
        </section>
        <section className='bg-bg-gray border border-bg-ash/50 rounded-lg p-10 my-6 flex justify-between items-center'>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="Requests and collateral"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#E0BB83",
                  },
                }}
              >
                <Tab value="Collateral" label="Collateral" style={{ color: "white" }} />
                <Tab value="Requests" label="Requests" style={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value="Collateral">
                <div>
                <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
                    Manage your collateral
                </h2>
                <div className="flex flex-col lg:flex-row md:flex-row items-center ">
                  <DepositCollateral />
                  <WithdrawCollateral />
            </div>
                </div>
            </TabPanel>
            <TabPanel value="Requests">
                <div>
            <h2 className="lg:text-[22px] md:text-[22px] text-[18px]">
               Manage your requests
            </h2>
            <p className="mb-6">Create lend requests</p>
            <CreateRequest />
            </div>
            </TabPanel>
          </TabContext>
        </Box>
        </section>
        {/* <section>
     
          <div className='bg-deepBlue rounded-lg p-4 text-[22px] lg:w-[60%] md:w-[60%] w-[100%] mb-auto'>
          <h3 className="lg:text-[22px] md:text-[22px] text-[20px] mb-2">Manage Offers</h3>
          <div className="flex">
          <div className="my-2 mr-14">
            <p>Make offer</p>
            <MakeOffer />
          </div>
          <div className="my-2">
            <p>Service request</p>
            <ServiceRequest />
          </div>
          </div>
        </div>
        </section>
        <section className='bg-bg-gray border border-bg-ash rounded-lg w-[100%] px-10 py-6'>
          <h3 className='text-[26px] font-bold'>Requests.</h3>
            <RequestsTable /> */}
        {/* </section> */}
    </main>
  )
}

export default Dashboard
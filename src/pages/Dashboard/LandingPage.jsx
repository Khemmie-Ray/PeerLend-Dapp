import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateRequest from '../../components/CreateRequest';
import DepositCollateral from '../../components/DepositCollateral';
import ServiceRequest from '../../components/ServiceRequest';
import { useEffect, useState } from "react";
import { isSupportedChain } from '../../utility';
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { getProtocolContract } from '../../constants/contract';
import { getProvider } from '../../constants/providers';
import WithdrawCollateral from '../../components/WithdrawCollateral';
import MakeOffer from '../../components/MakeOffer';


const LandingPage = () => {

  const [tokenAdd, setTokenAdd] = useState("");
  const [collateralAmount, setCollateralAmount] = useState(0);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [loanRequests, setLoanRequests] = useState([])

  async function handleGetRequests() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProtocolContract(signer);

    try {
      const transaction = await contract.getAllRequest();
      console.log(transaction)
      setLoanRequests(transaction)
    } catch (error) {
      toast.error("Collateral deposit failed", {
        position: "top-center",
      });
      console.log(error)
    }
  };

  console.log(loanRequests)

  useEffect(() => {
    handleGetRequests()
  }, [])

  function createData(regid, tokenAddress, author, lender, amount, rate, totalRepay, offer, returnDate, status, action) {
    return { regid, tokenAddress, author, lender, amount, rate, totalRepay, offer, returnDate, status, action };
  }

  const rows = [
    createData(1, "0x9b***w45", "0x9b***w45", "0x9b***w45", 100000, "0.012%", 150100, "Accepted", "Accepted", "Accepted", "approve")
  ];


  return (
    <main className='lg:w-[85%] md:w-[85%] w-[100%] mx-auto py-4'>
      <section className='flex justify-between flex-col lg:flex-row md:flex-row border-b border-bg-ash'>
        <div className='lg:w-1/3 md:w-1/3 w-1/3  py-8'>
          <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Dashboard</h2>
          <div className='flex'>
            <p className='uppercase mr-8'>Balance <br /> <span className='lg:text-[30px] md:text-[30px] text-[20px] font-bold'>0.00</span></p>
            <p lassName='uppercase'>Collateral <br /> <span className='lg:text-[30px] md:text-[30px] text-[20px] font-bold'>0.00</span></p>
          </div>
        </div>
        <div className='w-2/3 flex justify-end items-end flex-col mb-4'>
          <div className='text-center mb-6'>
            <p className='lg:text-[24px] md:text-[24px] text-[20px]'>Create Lend Request.</p>
            <CreateRequest />
          </div>
          <div className='flex justify-between w-[50%]'>
            <button className='bg-bg-gray border border-bg-ash p-4 w-[50%] text-center mr-8 text-[20px] font-bold rounded-lg'>Add</button>
            {/* <button className='bg-bg-gray border border-bg-ash p-4 w-[50%] text-center text-[20px] font-bold rounded-lg'>Withdraw</button> */}
            <WithdrawCollateral />
          </div>
        </div>
      </section>
      <section className='flex justify-between flex-col lg:flex-row md:flex-row my-20 items-baseline'>
        <div className='lg:w-[28%] md:w-[28%] w-[100%]'>
          <h2 className='lg:text-[32px] md:text-[32px] text-[26px] font-semi-bold'>Create and  Manage Requests</h2>
        </div>
        <div className='flex lg:w-[42%] md:w-[42%] w-[100%] self-start justify-end'>
          <p className='mr-8'>Request</p>
          <p>Account State</p>
        </div>
      </section>
      <section className='bg-bg-gray border border-bg-ash px-6 py-12 rounded-lg flex flex-col lg:flex-row md:flex-row justify-between items-center my-16'>
        <div className='lg:w-[57%] md:w-[57%] w-[100%] self-start'>
          <div className='flex justify-between'>
            <p className='lg:text-[24px] md:text-[24px] text-[18px]'>Collateral tokens</p>
            <button className=''>View</button>
          </div>
          <table className='bg-shadeBlack rounded-lg w-[100%] my-8 text-left'>
            <thead>
              <tr>
                <th className='py-6 px-6'>Symbol</th>
                <th className='py-6'>Assets</th>
                <th className='py-6'>Tokens</th>
                <th className='py-6'>USD value</th>
                <th className='py-6 px-6'>APY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='py-6 px-6'>Tether</td>
                <td className='py-6'>Ether</td>
                <td className='py-6'>180.6ETH</td>
                <td className='py-6'>101</td>
                <td className='py-6 px-6'>0.012%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <DepositCollateral />
      </section>
      <section className='bg-bg-gray border-bg-ash rounded-lg p-10 '>
        <div className='bg-deepBlue rounded-lg p-6 flex flex-col lg:flex-row md:flex-row justify-between text-center text-[22px]'>
          <div >
            <p>Make offer</p>
            {/* <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4">Offer</button> */}
            <MakeOffer />
          </div>
          <div>
            <p>Respond to offer</p>
            <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4">Respond</button>
          </div>
          <div>
            <p>Service request</p>
            {/* <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4">Service</button> */}
            <ServiceRequest />
          </div>
        </div>
      </section>
      <section>
        <section className='bg-bg-gray border-bg-ash rounded-lg p-10 my-20'>
          <h3 className='my-4 text-[22px]'>Incoming requests.</h3>
          <TableContainer component={Paper} style={{ backgroundColor: '#14112D', padding: "10px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>Reg Id</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Token address</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Author</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Lender</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Amount</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Rate</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Total Repay</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Offer</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Return date</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Status</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ color: 'white' }}>{row.regid}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.tokenAddress}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.author}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.lender}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.amount}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.rate}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.totalRepay}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.offer}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.returnDate}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.status}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{row.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </section>
    </main>
  )
}

export default LandingPage
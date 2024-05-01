import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateRequest from '../../components/createRequest';
import { useState } from 'react';
// import LoanRequest from '../../components/LoanRequest';
// import { Select } from 'radix/ui/themes';


const LandingPage = () => {
  
//   const selectOptions = <Select.Root defaultValue="None">
//   <Select.Trigger />
//   <Select.Content>
//     <Select.Group>
//       <Select.Label>Action</Select.Label>
//       <Select.Item value="approve">Approve</Select.Item>
//       <Select.Item value="decline">Decline</Select.Item>
//     </Select.Group>  
//   </Select.Content>
// </Select.Root>
const [tokenAdd, setTokenAdd] = useState("");
const [collateralAmount, setCollateralAmount] = useState(0);

function createData(regid, tokenAddress, author, lender, amount, rate, totalRepay, offer, returnDate, status, action ) {
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
        <div className='w-2/3 flex justify-end items-center'>
          <button className='bg-bg-gray border border-bg-ash p-4 w-[30%] text-center mr-8 text-[20px] font-bold rounded-lg'>Add</button>
          <button className='bg-bg-gray border border-bg-ash p-4 w-[30%] text-center text-[20px] font-bold rounded-lg'>Withdraw</button>
        </div>
      </section>
      <section className='flex justify-between flex-col lg:flex-row md:flex-row my-20 items-baseline'>
        <div className='lg:w-[28%] md:w-[28%] w-[100%]'>
          <h2 className='lg:text-[32px] md:text-[32px] text-[26px] font-semi-bold'>Create and  Manage Requests</h2>
        </div>
        <div className='lg:w-[25%] md:w-[25%] w-[100%] text-center'>
          <p className='lg:text-[24px] md:text-[24px] text-[20px]'>Create Lend Request.</p>
          <CreateRequest />
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
        <div className='lg:w-[35%] md:w-[35%] w-[100%] flex flex-col'>
          <p className='lg:text-[24px] md:text-[24px] text-[18px] mb-4'>Deposit collateral</p>
          <input type="text" placeholder='Token Collateral Address' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"/>
          <input type="text" placeholder='amount of collateral' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
          <button className="bg-purple py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] w-[100%] my-4">Deposit &rarr;</button>
        </div>
      </section>
      <section className='bg-bg-gray border-bg-ash rounded-lg p-10 '>
        <div className='bg-deepBlue rounded-lg p-6 flex flex-col lg:flex-row md:flex-row justify-between text-center text-[22px]'>
          <div >
            <p>Liquidate User</p>
          <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4">Liquidate</button>
          </div>
          <div>
            <p>Respond to offer</p>
          <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4">Respond</button>
          </div>
          <div>
            <p>Service request</p>
          <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4">Service</button>
          </div>
        </div>
      </section>
      <section>
      <section className='bg-bg-gray border-bg-ash rounded-lg p-10 my-20'>
        <h3 className='my-4 text-[22px]'>Incoming requests.</h3>
      <TableContainer component={Paper} style={{backgroundColor:'#14112D', padding: "10px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell style={{ color: 'white'}}>Reg Id</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Token address</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Author</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Lender</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Amount</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Rate</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Total Repay</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Offer</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Return date</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Status</TableCell>
            <TableCell style={{ color: 'white'}} align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{ color: 'white'}}>{row.regid}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.tokenAddress}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row. author}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.lender}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.amount}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.rate}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.totalRepay}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.offer}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.returnDate}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.status}</TableCell>
              <TableCell style={{ color: 'white'}} align="right">{row.action}</TableCell>
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
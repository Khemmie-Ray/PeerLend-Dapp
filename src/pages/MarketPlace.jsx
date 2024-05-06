import { useCallback, useEffect, useMemo, useState } from "react";
import { isSupportedChain } from "../utility";
import Slider from "react-slick";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
  } from "@web3modal/ethers/react";
import { getProtocolContract } from "../constants/contract";
import { readOnlyProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import loanIcon from "../assets/loan.png"

const MarketPlace = () => {
  const [allRequests, setAllRequests] = useState("")
  const [requests, setRequests] = useState([])
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  let settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
            },
        },
      ]
  };

  const getData = useCallback(async()=>{
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    // if (!isAddress(address)) return console.error("Invalid address");
    const contract = getProtocolContract(readOnlyProvider);

    try{
        const transaction = await contract.getAllRequest();
        setAllRequests(transaction);  
        const converted = allRequests?.map((item)=>{
            return{id: item[0],
            address: item[1],
            amount: item[2],
            interest: item[3],
            repayment: item[4],
            Offer: item[5]?.map((ite)=>{
                return{
                    offerId: ite[0],
                    tokenAdd: ite[1],
                    author: ite[2],
                    loanAmount: ite[3],
                    loanInt: ite[4],
                    rDate: ite[5],
                    offerStat: ite[6]
                }
            }),
            rDate: item[6],
            lender: item[7],
            loanReq: item[8],
            loanStatus: item[9]

           }
        }) 
        setRequests(converted)
    }catch(error){
        console.log(error)
    }
  },[])

  useEffect(()=>{
    getData();
  },[])

  return (
    <main className="w-[90%] mx-auto"> 
       <section className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto text-center my-10">
        <h2 className="lg:text-[54px] md:text-[54px] text-[36px] font-bold mb-4">Marketplace</h2>
        <p className="text-[24px]">Seamlessly Supply, Borrow, and Manage Assets in the PeerLend Marketplace.</p>
       </section>
       <section className="flex justify-between items-center my-16">
        <div className="lg:w-[55%] md:w-[55%] w-[100%]">
        <h2 className="lg:text-[50px] md:text-[50px] text-[36px] font-bold mb-4">How to participate.</h2>
        <p>Three Easy Steps to Supply, Borrow, and Manage Your Crypto Assets with Confidence in themarketplace</p>
        <button className="bg-purple text-white py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] lg:w-[30%] md:w-[30%] w-[100%] my-4">Dashboard &rarr;</button>
        </div>
        <div className="lg:w-[35%] md:w-[35%] w-[100%] flex flex-col">
            <div className="self-center mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash text-[64px]">1</p>
                <p>Connect Wallet</p>
            </div>
            <div className="mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash text-[64px]">2</p>
                <p>Borrow Against Collateral</p>
            </div>
            <div className="self-end mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash text-[64px]">3</p>
                <p>Manage Your Positions</p>
            </div>
        </div>
       </section>
       <section>
       <h3 className="lg:text-[50px] md:text-[50px] text-[36px] font-bold my-6">Check out all active requests</h3>
       <Slider  {...settings}>
       {requests.map((info) => ( <div className="bg-bg-gray border border-bg-ash p-6 rounded-lg lg:w-[31%] md:w-[31%] w-[31%]">
            <div className="flex items-center mb-4">
                <img src={loanIcon} alt="" className="h-[60px] w-[60px] mr-4"/>
            <h3 className="lg:text-[28px] md:text-[28px] text-[20px]">Loan Requests</h3>
            </div>
            <p>Id: {info.id}</p>
            <p className="my-2">Loan request: {info.loanReq}</p>
            <p>Author: {info.author}</p>
            <p className="my-2">Amount: {info.amount}</p>
            <p>Rate: {info.interest}</p>
            <p className="my-2">Repayment: {info.repayment}</p>
            <p>Return Date: {info.rDate}</p>
        </div>))}
        </Slider>
       </section>
       <section className="my-12">
        <h3 className="lg:text-[50px] md:text-[50px] text-[36px] font-bold my-4">Check out all active requests</h3>
       <TableContainer component={Paper} style={{ backgroundColor: '#14112D', padding: "10px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>Id</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Loan Request</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Author</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Lender</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Amount</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Rate</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Repayment</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Return date</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Action</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Status</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Offer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((info) => (
                  <TableRow
                    key={info.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ color: 'white' }}>{Number(info.id)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.loanReq}</TableCell>
                    <TableCell style={{ color: 'white', overflow: 'hidden'}} align="right" className="overflow-x-clip">{info.address}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.lender}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.amount)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.interest)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.repayment)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.rDate)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.loanStatus)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.Offer}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       </section>
       <section>
       <h3 className="lg:text-[50px] md:text-[50px] text-[36px] font-bold my-4">Check out all Offers</h3>
       <TableContainer component={Paper} style={{ backgroundColor: '#14112D', padding: "10px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>Id</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Loan Request</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Author</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Lender</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Amount</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Rate</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Repayment</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Return date</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Action</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Status</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">Offer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((info) => (
                  <TableRow
                    key={info.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ color: 'white' }}>{Number(info.id)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.loanReq}</TableCell>
                    <TableCell style={{ color: 'white', overflow: 'hidden'}} align="right" className="overflow-x-clip">{info.address}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.lender}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.amount)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.interest)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.repayment)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.rDate)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{Number(info.loanStatus)}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.Offer}</TableCell>
                    <TableCell style={{ color: 'white' }} align="right">{info.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       </section>
    </main>
  )
}

export default MarketPlace
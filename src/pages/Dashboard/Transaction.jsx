import UseFetchRequests from "../../Hooks/UseFetchRequests"
import TokenList from "../../constants/tokenList.json"
import { Link } from "react-router-dom";
import requestImage from '../../assets/request.jpeg'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from 'react';

import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { formatUnits } from "ethers";

import useLocalStorage from "../../Hooks/useLocalStorage";
import useFetchUserCollateral from "../../Hooks/useFetchUserCollateral";

const Transaction = () => {
    const allRequests = UseFetchRequests()
    const { address } = useWeb3ModalAccount();
    const [value, setValue] = useState("All Requests");
  
    const collateral = useFetchUserCollateral();
  
    const [storedValue,] = useLocalStorage("passportScore");
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <main>
    <h2 className="lg:text-[26px] md:text-[26px] text-[20px] mb-6 flex justify-between font-bold">Portfolio<span className="text-[16px]">ebukiz@gmail.com</span></h2>
    <section className="flex lg:flex-row md:flex-row flex-col justify-between">
      <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
        <h3>Gitcoin Score</h3>
        <p className="lg:text-[28px] md:text-[28px] text-[20px] font-bold">{storedValue}</p>
      </div>
      <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
        <h3>Total Collateral</h3>
        <p className="lg:text-[28px] md:text-[28px] text-[20px] font-bold"><span>&#36;</span>{parseFloat(formatUnits(collateral, 18)).toFixed(2)}</p>
      </div>
      <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
        <h3>Total Requests</h3>
        <p className="lg:text-[28px] md:text-[28px] text-[20px] font-bold">5</p>
      </div>
      <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
        <h3>Total Offer</h3>
        <p className="lg:text-[28px] md:text-[28px] text-[20px] font-bold">5</p>
      </div>
    </section>
    <section>
      <h2 className="lg:text-[26px] md:text-[26px] text-[20px] font-bold mt-8">Transaction History</h2>
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
              aria-label="Track my transaction history"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#E0BB83",
                },
              }}
            >
              <Tab value="My Requests" label="My Requests" style={{ color: "white" }} />
              <Tab value="All Requests" label="All Requests" style={{ color: "white" }} />
            </TabList>
          </Box>
          <TabPanel value="My Requests">
            {
              allRequests.map((data, index) => {
                if (data?.address == address) {
                  return (
                    <div key={index} className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                    <Link to={`/dashboard/transaction/${data?.id}`}>
                      <img src={requestImage} alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4" />
                      <p>Amount: {formatUnits(data?.amount, TokenList[data?.loanReq]?.decimals)}</p>
                      <p>Rate: {data?.interest.toString()}<span>&#37;</span></p>
                      <p>Repayment: {formatUnits(data?.repayment, TokenList[data?.loanReq]?.decimals + 1)}</p>
                      <p>Return date: <span>{(new Date(Number(data?.rDate) * 1000)).toLocaleString()}</span></p>
                      </Link>
                    </div>
                  )
                }
              })
            }
          </TabPanel>
          <TabPanel value="All Requests">
          <section className="flex justify-between flex-wrap">
            {allRequests.map((data, index) => (
            <div key={index} className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <Link to={`/dashboard/transaction/${data?.id}`}>
                <img src={requestImage} alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4" />
                <p>Amount: {formatUnits(data?.amount, TokenList[data?.loanReq]?.decimals)}</p>
                <p>Rate: {data?.interest.toString()}<span>&#37;</span></p>
                <p>Repayment: {formatUnits(data?.repayment, TokenList[data?.loanReq]?.decimals + 1)}</p>
                <p>Return date: <span>{(new Date(Number(data?.rDate) * 1000)).toLocaleString()}</span></p>
                </Link>
            </div>
            ))}
        </section>
          </TabPanel>
        </TabContext>
      </Box>
    </section>
    
       
    </main>
  )
}

export default Transaction
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from 'react';

const Profile = () => {
  const [value, setValue] = useState("My Requests");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main>
        <h2 className="lg:text-[24px] md:text-[24px] text-[20px] mb-6 flex justify-between">User Data <span className="text-[16px]">ebukiz@gmail.com</span></h2>
        <section className="flex lg:flex-row md:flex-row flex-col justify-between">
            <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%]">
                <h3>Gitcoin Score</h3>
                <p>5</p>
            </div>
            <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%]">
                <h3>Total Collateral</h3>
                <p>5</p>
            </div>
            <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%]">
                <h3>Total Requests</h3>
                <p>5</p>
            </div>
            <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%]">
                <h3>Total Offer</h3>
                <p>5</p>
            </div>
        </section>
        <section>
            <h2 className="lg:text-[24px] md:text-[24px] text-[20px] mt-8">Transaction History</h2>

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
                <Tab value="My Offers" label="My Offers" style={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value="My Requests">
            <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src="https://img.freepik.com/free-vector/3d-cashback-with-flying-gold-coins-dollar-bill_88138-974.jpg?w=1800&t=st=1717184738~exp=1717185338~hmac=40c12b1e890a608add26b80343d64ed3f04dcf8ce411fada1dcb42a9c0c7b172" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4"/>
                <p>Amount: </p>
                <p>Rate</p>
                <p>Repayment</p>
                <p>Return date: <span>3 Days: 12Hrs : 02Secs</span></p>
            </div>
            </TabPanel>
            <TabPanel value="My Offers">
            <div className="flex justify-between">
            <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src="https://img.freepik.com/free-photo/3d-render-businessman-hand-holding-money-banknotes_107791-17027.jpg?size=626&ext=jpg" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4"/>
                <p className="truncate">Lender: </p>
                <p>Amount: </p>
                <p>Rate: </p>
                <p>Repayment: </p>
                <p>Return date: <span>3 Days: 12Hrs : 02Secs</span></p>
            </div>    
            </div>
            </TabPanel>
          </TabContext>
        </Box>       
        </section>
    </main>
  )
}

export default Profile
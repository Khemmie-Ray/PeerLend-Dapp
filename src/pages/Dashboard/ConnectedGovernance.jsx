import { useState } from "react";
import { isSupportedChain } from "../../utility";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getGovernanceContract } from "../../constants/contract";
import { getProvider } from "../../constants/providers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateProposal from "../../components/CreateProposal";
import UseFetchProposals from "../../Hooks/UseFetchProposals";
import { all } from "axios";

const ConnectedGovernance = () => {
  const [value, setValue] = useState("Create");
  const [proposalValue, setProposalValue] = useState("Active");
  const allProposals = UseFetchProposals()

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };

  const handleProposal = (event, proposalVal) => {
    setProposalValue(proposalVal)
  };

  return (
    <main>
        <h2 className="lg:text-[26px] md:text-[26px] text-[20px] font-bold mb-4">
          Governance
        </h2>
      <section className="flex justify-between lg:flex-row md:flex-row flex-col">
      <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
          <p>Total Proposals</p>
          <h3 className="lg:text-[28px] md:text-[28px] text-[20px] font-bold">{allProposals.length}</h3>
        </div>
        <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
          <p>Total Votes</p>
          <h3 className="lg:text-[28px] md:text-[28px] text-[20px] font-bold">1000</h3>
        </div>
        <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
          <p>My Votes</p>
          <h3 className="lg:text-[28px] md:text-[28px] text-[20px] font-bold">2</h3>
        </div>
        <div className="bg-bg-gray border border-bg-ash/50 p-6 rounded-lg w-[100%] lg:w-[23%] md:w-[23%] text-center">
          <p>Total Delegated Votes</p>
          <h3 className="lg:text-[28px] md:text-[28px] text-[20px] font-bold">23,000</h3>
        </div>
      </section>
      <section>
        <h2 className="lg:text-[26px] md:text-[26px] text-[20px] font-bold mt-10">
        Governance Operations
        </h2>
        <div className=" bg-bg-gray border border-bg-ash/45  lg:p-8  md:p-8 py-4 px-2 rounded-lg my-12">
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
                aria-label="create and update proposals"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#E0BB83",
                  },
                }}
              >
                <Tab value="Create" label="Create" style={{ color: "white" }} />
                <Tab value="Update" label="Update" style={{ color: "white" }} />
                <Tab value="delegate" label="delegate" style={{ color: "white" }} />
                <Tab value="Voting power" label="Voting power" style={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value="Create">
              <div>
                <CreateProposal />
              </div>
            </TabPanel>
            <TabPanel value="Update">
              <div>
                <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
                  Update Proposal Status
                </h2>
                <div className="flex w-[100%] justify-between flex-col lg:flex-row md:flex-row">
                  <input
                    type="text"
                    placeholder="Title"
                    className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Options"
                    className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
                  />
                </div>
                <div className="lg:w-[40%] md:w-[40%] w-[100%] mx-auto">
                  <button className="bg-[#E0BB83] text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4 mx-auto text-center font-bold">
                    Update Proposal
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="delegate">
            <div>
            <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
              Delegate Vote
            </h2>
            <div className="flex w-[100%] justify-between flex-col lg:flex-row md:flex-row">
            <input
              type="text"
              placeholder="Delegate Address"
              className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
            />
            <input
              type="text"
              placeholder="Proposal ID"
              className="rounded-lg lg:w-[48%] md:w-[48%] w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
            />
          </div>
          <div className="lg:w-[40%] md:w-[40%] w-[100%] mx-auto">
          <button className="bg-[#E0BB83] text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4 mx-auto text-center font-bold">
              Delegate Vote &rarr;
            </button>
            </div>
          </div>
            </TabPanel>
            <TabPanel value="Voting power">
            <div>
            <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
              Voting Power
            </h2>
            <p className="mb-6">Balance: 100peer</p>
            <input
              type="text"
              placeholder="Enter amount"
              className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
            />
              <div className="w-[100%] mx-auto flex flex-col lg:flex-row md:flex-row my-6">
              <button className="text-white border border-bg-ash py-2 px-4 rounded-lg text-[18px] lg:mr-2 md:mr-2 mr-0 w-[100%] mb-4">
                Reduce Power &rarr;
              </button>
              <button className="bg-bg-ash text-darkGrey font-bold py-2 px-4 rounded-lg text-[18px] w-[100%] mb-4">
                Add Power &rarr;
              </button>
            </div>
          </div>
            </TabPanel>
          </TabContext>
        </Box>
        </div>
      </section>
      <section>
      <h2 className="lg:text-[26px] md:text-[26px] text-[20px] font-bold mt-10">
        Proposal Data
        </h2>
        <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={proposalValue}>
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
                onChange={handleProposal}
                aria-label="Proposal data"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#E0BB83",
                  },
                }}
              >
                <Tab value="Active" label="Active" style={{ color: "white" }} />
                <Tab value="Inactive" label="Inactive" style={{ color: "white" }} />
                <Tab value="Rejected" label="Rejected" style={{ color: "white" }} />
                <Tab value="Approved" label="Approved" style={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value="Active">
            <div className="flex justify-between">
            <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src="https://img.freepik.com/free-photo/3d-illustration-hand-putting-tick-paper_107791-15903.jpg?t=st=1717201122~exp=1717204722~hmac=66b25ce253f83481a7812deb962a9cd16f5858fa92e32c952d25af7ec2defe43&w=1380" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4"/>
                {allProposals.map((info) => (<div className="p-4">
                <p className="uppercase font-bold"><span className="mr-2">ID: {Number(info.id)}</span> - {info.title}</p>
                  <p className="truncate">{info.address}</p>
                <button className="border border-bg-ash px-4 py-2 rounded-lg text-[18px] my-4">
                  Vote
                </button>
              </div>))}
            </div>    
            </div>
            </TabPanel>
            <TabPanel value="Inactive">
            <div className="flex justify-between">
            <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src="https://img.freepik.com/free-photo/3d-illustration-hand-putting-tick-paper_107791-15903.jpg?t=st=1717201122~exp=1717204722~hmac=66b25ce253f83481a7812deb962a9cd16f5858fa92e32c952d25af7ec2defe43&w=1380" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4"/>
                {allProposals.map((info) => (<div className="p-4">
                <p className="uppercase font-bold"><span className="mr-2">ID: {Number(info.id)}</span> - {info.title}</p>
                  <p className="truncate">{info.address}</p>
                <button className="border border-bg-ash px-4 py-2 rounded-lg text-[18px] my-4">
                  Vote
                </button>
              </div>))}
            </div>    
            </div>
            </TabPanel>
            <TabPanel value="Rejected">
            <div className="flex justify-between">
            <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src="https://img.freepik.com/free-photo/3d-illustration-hand-putting-tick-paper_107791-15903.jpg?t=st=1717201122~exp=1717204722~hmac=66b25ce253f83481a7812deb962a9cd16f5858fa92e32c952d25af7ec2defe43&w=1380" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4"/>
                {allProposals.map((info) => (<div className="p-4">
                <p className="uppercase font-bold"><span className="mr-2">ID: {Number(info.id)}</span> - {info.title}</p>
                  <p className="truncate">{info.address}</p>
                <button className="border border-bg-ash px-4 py-2 rounded-lg text-[18px] my-4">
                  Vote
                </button>
              </div>))}
            </div>    
            </div>
            </TabPanel>
            <TabPanel value="Approved">
            <div className="flex justify-between">
            <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src="https://img.freepik.com/free-photo/3d-illustration-hand-putting-tick-paper_107791-15903.jpg?t=st=1717201122~exp=1717204722~hmac=66b25ce253f83481a7812deb962a9cd16f5858fa92e32c952d25af7ec2defe43&w=1380" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4"/>
                {allProposals.map((info) => (<div className="p-4">
                <p className="uppercase font-bold"><span className="mr-2">ID: {Number(info.id)}</span> - {info.title}</p>
                  <p className="truncate">{info.address}</p>
                <button className="border border-bg-ash px-4 py-2 rounded-lg text-[18px] my-4">
                  Vote
                </button>
              </div>))}
            </div>    
            </div>
            </TabPanel>
          </TabContext>
        </Box>
        </div>
      </section>
    </main>
  );
};

export default ConnectedGovernance;

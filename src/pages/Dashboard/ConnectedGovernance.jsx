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

const ConnectedGovernance = () => {
  const [value, setValue] = useState("Create");
  const [allProposals, setAllProposals] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function handleProposals() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getGovernanceContract(signer);

    try {
      const transaction = await contract.getAllProposals();
      setAllProposals(transaction);

      console.log(allProposals);

      if (transaction.status) {
        return toast.success("Collateral deposit successful!", {
          position: "top-center",
        });
      }

      toast.error("Collateral deposit failed!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Collateral deposit failed", {
        position: "top-center",
      });
      console.log(error);
    }
  }

  return (
    <main className="w-[90%] mx-auto">
      <section className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto text-center my-10">
        <h2 className="lg:text-[54px] md:text-[54px] text-[36px] font-bold mb-4">
          Governance
        </h2>
        <p className="text-[24px]">
          Join in governance activities and vote on new proposals and protocol
          upgrades
        </p>
      </section>
      <section className="flex justify-between lg:flex-row md:flex-row flex-col">
        <div className="lg:w-[32%] md:w-[32%] w-[100%] bg-bg-gray border border-bg-ash h-[166px] p-4 rounded-lg flex flex-col justify-center mb-4">
          <p>Total Proposals</p>
          <h3 className="text-[40px] font-bold my-2">1000</h3>
        </div>
        <div className="lg:w-[32%] md:w-[32%] w-[100%] bg-bg-gray border border-bg-ash h-[166px] p-4 rounded-lg flex flex-col justify-center mb-4">
          <p>Total Votes</p>
          <h3 className="text-[40px] font-bold my-2">1000</h3>
        </div>
        <div className="lg:w-[32%] md:w-[32%] w-[100%] bg-bg-gray border border-bg-ash h-[166px] p-4 rounded-lg flex flex-col justify-center mb-4">
          <p>Total Delegated Votes</p>
          <h3 className="text-[40px] font-bold my-2">230,000</h3>
        </div>
      </section>
      <section className=" bg-bg-gray border border-bg-ash  lg:p-8  md:p-8 py-4 px-2 rounded-lg my-12">
        <h2 className="lg:text-[36px] md:text-[36px] text-[24px] font-bold">
          Proposal
        </h2>
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
                    backgroundColor: "#A604F2",
                  },
                }}
              >
                <Tab value="Create" label="Create" style={{ color: "white" }} />
                <Tab value="Update" label="Update" style={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value="Create">
              <div>
                <CreateProposal />
              </div>
            </TabPanel>
            <TabPanel value="Update">
              <div className="bg-deepBlue rounded-lg py-8 px-4 mb-4">
                <h2 className="lg:text-[36px] md:text-[36px] text-[24px] font-bold my-4">
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
                <div className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto">
                  <button className="bg-purple py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[100%] my-4 mx-auto text-center">
                    Update Proposal
                  </button>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </section>
      <section className="mt-14 flex flex-col lg:flex-row md:flex-row justify-between">
        <div className="bg-bg-gray border border-bg-ash  p-8 rounded-lg lg:w-[60%] md:w-[60%] w-[100%]">
          <h2
            className="lg:text-[36px] md:text-[36px] text-[24px] font-bold my-4"
            onClick={handleProposals}
          >
            Proposals
          </h2>
          <div className="bg-deepBlue flex flex-col lg:flex-row md:flex-row justify-between rounded-lg py-8 px-4 mb-4">
            <div className="flex">
              <p className="mr-4">100</p>
              <p>
                Peerlend Interest rate 4% increase proposal <br />{" "}
                <span>Active . 21.00.24 Left</span>
              </p>
            </div>
            <button className="border border-purple px-4 py-2 rounded-lg lg:text-[20px] md:text-[20px] text-[16px]">
              Vote
            </button>
          </div>
          <div className="bg-deepBlue flex flex-col lg:flex-row md:flex-row justify-between rounded-lg py-8 px-4">
            <div className="flex">
              <p className="mr-4">100</p>
              <p>
                Peerlend Interest rate 4% increase proposal <br />{" "}
                <span>Active . 21.00.24 Left</span>
              </p>
            </div>
            <button className="border border-purple px-4 py-2 rounded-lg lg:text-[20px] md:text-[20px] text-[16px]">
              Vote
            </button>
          </div>
          <div className="bg-deepBlue flex flex-col lg:flex-row md:flex-row justify-between rounded-lg py-8 px-4">
            <div className="flex">
              <p className="mr-4">100</p>
              <p>
                Peerlend Interest rate 4% increase proposal <br />{" "}
                <span>Active . 0 Left</span>
              </p>
            </div>
            <button className="border border-purple px-4 py-2 rounded-lg lg:text-[20px] md:text-[20px] text-[16px]">
              Vote
            </button>
          </div>
        </div>
        <div className="lg:w-[35%] md:w-[35%] w-[100%] my-10">
          <div className=" flex flex-col ml-auto bg-bg-gray border border-bg-ash  p-8 rounded-lg mb-4">
            <h2 className="lg:text-[36px] md:text-[36px] text-[24px] font-bold my-4">
              Delegate Vote
            </h2>
            <input
              type="text"
              placeholder="Delegate Address"
              className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
            />
            <input
              type="text"
              placeholder="Proposal ID"
              className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
            />
            <button className="bg-purple py-4 px-12 rounded-lg lg:text-[20px] md:text-[20px] text-[16px]">
              Delegate Vote &rarr;
            </button>
          </div>
          <div className=" flex flex-col ml-auto bg-bg-gray border border-bg-ash  p-8 rounded-lg  mb-4">
            <h2 className="lg:text-[36px] md:text-[36px] text-[24px] font-bold mt-4">
              Voting Power
            </h2>
            <p className="mb-4">Balance: 100peer</p>
            <input
              type="text"
              placeholder="Enter amount"
              className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
            />
            <div className="flex flex-col lg:flex-row md:flex-row">
              <button className="text-white border border-purple py-4 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] lg:mr-2 md:mr-2 mr-0 lg:w-1/2 mb-4">
                Reduce Power &rarr;
              </button>
              <button className="bg-purple py-4 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] lg:w-1/2 mb-4">
                Add Power &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConnectedGovernance;

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UseFetchProposals from '../Hooks/UseFetchProposals';

import { useState } from 'react';

const DAOPage = () => {
  const [value, setValue] = useState('Active');
  const allProposals = UseFetchProposals()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main className="w-[90%] mx-auto"> 
       <section className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto text-center my-10">
        <h2 className="lg:text-[54px] md:text-[54px] text-[36px] font-bold mb-4">Governance</h2>
        <p className="text-[24px]">Join in governance activities and vote on new proposals and protocol upgrades</p>
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
       <section className=" bg-bg-gray border border-bg-ash  p-8 rounded-lg">
                <h2 className='lg:text-[36px] md:text-[36px] text-[24px] font-bold'>Proposal</h2>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'end' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{
                        style: {
                        backgroundColor: "#A604F2"
                        }
                    }}>
                    <Tab value="Active" label="Active" style={{ color: 'white' }} />
                    <Tab value="Ended" label="Ended" style={{ color: 'white' }} />
                    </TabList>
                    </Box>
                    <TabPanel value="Active">
                        <div className="bg-deepBlue flex flex-col lg:flex-row md:flex-row justify-between rounded-lg py-8 px-4 mb-4">
                            <div className='flex'>
                            <p className='mr-4'>100</p>
                            <p>Peerlend Interest rate 4% increase proposal <br /> <span>Active . 21.00.24 Left</span></p>
                            </div>
                            <p>800 <br /> <span>100</span></p>
                        </div>
                        <div className="bg-deepBlue flex flex-col lg:flex-row md:flex-row justify-between rounded-lg py-8 px-4">
                            <div className='flex'>
                            <p className='mr-4'>100</p>
                            <p>Peerlend Interest rate 4% increase proposal <br /> <span>Active . 21.00.24 Left</span></p>
                            </div>
                            <p>800 <br /> <span>100</span></p>
                        </div>
                        </TabPanel>
                    <TabPanel value="Ended">
                    <div className="bg-deepBlue flex flex-col lg:flex-row md:flex-row justify-between rounded-lg py-8 px-4">
                        <div className='flex'>
                        <p className='mr-4'>100</p>
                        <p>Peerlend Interest rate 4% increase proposal <br /> <span>Active . 0 Left</span></p>
                        </div>
                        <p>700 <br /> <span>100</span></p>
                        </div>
                    </TabPanel>
                </TabContext>
                </Box>     
       </section>
    </main>
  )
}

export default DAOPage
import Terms from "./Terms";
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PrivacyPolicy from "./PrivacyPolicy";

const TermsCondition = () => {
  const [value, setValue] = useState("Terms");

  const handleChange = (event, value) => {
    setValue(value); 
  };

  return (
    <main>
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
                aria-label="Proposal data"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#E0BB83",
                  },
                }}
              >
                <Tab value="Terms" label="Terms" style={{ color: "white" }} />
                <Tab value="Policy" label="Policy" style={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value="Terms">
                <div>
                <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
                    Terms & Conditions
                </h2>
                <Terms />
                </div>
            </TabPanel>
            <TabPanel value="Policy">
                <div>
            <h2 className="lg:text-[22px] md:text-[22px] text-[18px] mb-6">
               Privacy Policy
            </h2>
            <PrivacyPolicy />
            </div>
            </TabPanel>
          </TabContext>
        </Box>
    </main>
  )
}

export default TermsCondition
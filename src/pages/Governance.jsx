import DAOTab from "../components/DAOTab"
import { Box, Card, Flex, Text } from "@radix-ui/themes"

const Governance = () => {
  return (
    <main className="lg:w-[80%] md:w-[80%] w-[90%] mx-auto"> 
       <section className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto text-center">
        <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Governance</h2>
        <p>Join in governance activities and vote on new proposals and protocol upgrades</p>
       </section>
       <section className="flex justify-between lg:flex-row md:flex-row flex-col">
        <div className="lg:w-[32%] md:w-[32%] w-[100%] bg-bg-gray border-bg-ash h-[166px] p-4 rounded-lg flex flex-col justify-center mb-4">
            <p>Total Proposals</p>
            <h3 className="text-[40px] font-bold my-2">1000</h3>
        </div>
        <div className="lg:w-[32%] md:w-[32%] w-[100%] bg-bg-gray border-bg-ash h-[166px] p-4 rounded-lg flex flex-col justify-center mb-4">
            <p>Total Votes</p>
            <h3 className="text-[40px] font-bold my-2">1000</h3>
        </div>
        <div className="lg:w-[32%] md:w-[32%] w-[100%] bg-bg-gray border-bg-ash h-[166px] p-4 rounded-lg flex flex-col justify-center mb-4">
            <p>Total Delegated Votes</p>
            <h3 className="text-[40px] font-bold my-2">230,000</h3>
        </div>
       </section>
       <section className="lg:w-[90%] md:w-[90%] mx-auto w-[100%] bg-bg-gray border-bg-ash h-[166px] p-8 rounded-lg">
            <div className="flex flex-col lg:flex-row md:flex-row justify-center mb-4">
                <h2>Proposal</h2>
                <DAOTab />
            </div>
            <div className="bg-black">
            <Box maxWidth="" backgroundColor="black" >
        <Card>
            <Flex gap="3" align="center">
            <Text as="div" size="2" weight="bold">
                10
            </Text>
            <Box>
                <Text as="div" size="2" weight="bold">
                Peerlend Interest rate 4% increase proposal
                </Text>
                <Text as="div" size="2" color="gray">
                Active <span> . 21:00:30 Left</span>
                </Text>
            </Box>
            <Box>
                <Text as="div" size="2" weight="bold">
                800
                </Text>
                <Text as="div" size="2" color="gray">
                100
                </Text>
            </Box>
            </Flex>
        </Card>
        </Box>
        </div>
       </section>
    </main>
  )
}

export default Governance
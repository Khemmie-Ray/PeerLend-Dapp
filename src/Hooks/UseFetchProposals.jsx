import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getGovernanceContract } from "../constants/contract";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";

const UseFetchProposals = () => {
    const [allProposals, setAllProposals] = useState([]);
    const [count, setCount] = useState(0);


    const fetchAllProposals = useCallback(async () => {
        try {
            const contract = getGovernanceContract(readOnlyProvider);
            const res = await contract.getAllProposals();
            console.log(res)
            const converted = res?.map((item)=>{
                return{id: item[0],
                address: item[1],
                title: item[2],
               proposedOptions: item[3]?.map((ite)=>{
                    return{
                    }
                }),
                votes: item[4]?.map((info)=>{
                    return{
                    }
                }),
                status: item[5],
                deadline: item[6],
               }
            }) 
            setAllProposals(converted)
        } catch (error) {
            console.error(error);
        }
    }, []);

    console.log(allProposals)

    const trackingProposals = useCallback(() => {
        setCount((prevValue) => prevValue + 1);
        fetchAllProposals();
    }, [fetchAllProposals]);


    useEffect(() => {
        fetchAllProposals();

        const filter = {
            address: import.meta.env.VITE_DAO_CONTRACT_ADDRESS,
            topics: [ethers.id("CreatedProposal(address,uint,uint)")],
        };

        wssProvider.getLogs({ ...filter, fromBlock: 5833273 }).then((events) => {
            setCount(events.length + 1);
        });

        const provider = new ethers.WebSocketProvider(
            import.meta.env.VITE_WSS_RPC_URL
        );
        provider.on(filter, trackingProposals);

        return () => {
            // Perform cleanup
            provider.off(filter, trackingProposals);
        };

    }, [fetchAllProposals, trackingProposals, count]);

    return allProposals;
}

export default UseFetchProposals
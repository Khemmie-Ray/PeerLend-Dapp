import { useEffect, useState } from 'react'
import { readOnlyProvider } from "../constants/providers";
import { getGovernanceContract } from "../constants/contract";


const useFetchGovernanceDetails = () => {
    const [totalProposals, setTotalProposals] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const contract = getGovernanceContract(readOnlyProvider);
                const res = await contract.getTotalProposals();
                setTotalProposals(res);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return { totalProposals };
}

export default useFetchGovernanceDetails
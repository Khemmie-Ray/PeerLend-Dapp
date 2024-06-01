import { useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getProtocolContract } from "../constants/contract";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useFetchUserCollateral = () => {
    const { address } = useWeb3ModalAccount();
    const [collateral, setCollateral] = useState(0);


    useEffect(() => {
        (async () => {
            try {
                const contract = getProtocolContract(readOnlyProvider);
                const res = await contract.getAccountCollateralValue(address);
                setCollateral(res);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [address]);

    return collateral;
}

export default useFetchUserCollateral
import { ethers } from "ethers";
import protocolABI from "./protocolABI.json"

export const getProtocolContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        protocolABI,
        providerOrSigner
    );
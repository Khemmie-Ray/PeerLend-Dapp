import { ethers } from "ethers";
import protocolABI from "./protocolABI.json"
import governanceABI from './governance.json'

export const getProtocolContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        protocolABI,
        providerOrSigner
);

export const getGovernanceContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_DAO_CONTRACT_ADDRESS,
        governanceABI,
        providerOrSigner
);
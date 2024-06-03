import { useState, useEffect } from "react";
import { getProtocolContract } from "../constants/contract";
import { getProvider } from "../constants/providers";

import { useWeb3ModalProvider } from "@web3modal/ethers/react";

import { toast } from "react-toastify";

const useFetchOffers = (id) => {
    const [offers, setOffers] = useState([]);
    const { walletProvider } = useWeb3ModalProvider();

    useEffect(() => {
        (async () => {
            if (id === "" || id === "0" || id === undefined) {
                return console.log("No request id found");
            }

            try {
                const provider = getProvider(walletProvider);

                const contract = await getProtocolContract(provider);
                const request = await contract.getRequestById(id);

                const _offers = request["5"];
                // console.log("offers", _offers.toArray());
                setOffers(_offers.toArray());

            } catch (error) {
                console.log(error);
                toast.error("Offer not found", {
                    position: "top-center",
                });
                console.log("Offer not found");
            }
        })();
    }, [id]);

    return offers;
}

export default useFetchOffers
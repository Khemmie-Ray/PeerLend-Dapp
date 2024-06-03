import React from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import UseFetchRequests from "../../Hooks/UseFetchRequests";
import TokenList from "../../constants/tokenList.json";
import { formatUnits } from "ethers";
import requestImage from '../../assets/request.jpeg'
import ServiceRequest from "../../components/ServiceRequest";
import MakeOffer from "../../components/MakeOffer"
import useFetchOffers from '../../Hooks/useFetchOffers';
import useHandleOffer from '../../Hooks/useHandleOffer';
import { convertService } from '../../utility';

const TransactionDetails = () => {
    const { id } = useParams();
    const { address } = useWeb3ModalAccount();
    const allRequests = UseFetchRequests();
    const handleOffer = useHandleOffer();
    const transaction = allRequests.find(data => data?.id.toString() === id);
    const offers = useFetchOffers(id);

    if (!transaction) {
        return <p>Transaction not found.</p>;
    }

    // console.log(transaction)

    return (
        <main>
            <h2 className="lg:text-[26px] md:text-[26px] text-[20px] mb-6 font-bold">Transaction Details</h2>
            <div className="w-[100%] flex flex-col lg:flex-row  md:flex-row justify-between rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src={requestImage} alt="" className="w-[100%] lg:w-[50%] md:w-[50%] rounded-lg h-[200px] object-cover object-center mb-4" />
                <div className="w-[100%] lg:w-[47%] md:w-[47%]">
                    <p>Request ID: {id}</p>
                    <p>Amount: {formatUnits(transaction?.amount, TokenList[transaction?.loanReq]?.decimals)}</p>
                    <p>Rate: {transaction?.interest.toString()}<span>&#37;</span></p>
                    <p>Repayment: {formatUnits(transaction?.repayment, TokenList[transaction?.loanReq]?.decimals + 1)}</p>
                    <p>Return date: <span>{(new Date(Number(transaction?.rDate) * 1000)).toLocaleString()}</span></p>
                    <h2>Manage Requests</h2>
                    <div className='flex justify-between'>
                        <MakeOffer id={id} />
                        <ServiceRequest id={id} />
                    </div>
                </div>
            </div>
            <section>
                <h2 className="lg:text-[26px] md:text-[26px] text-[20px] my-6 font-bold">Transaction Offers</h2>
                <div className="flex justify-between">
                    {offers && offers.map((offer, index) => {
                        console.log(offer)
                        return (
                            <div key={index} className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                                <img src="https://img.freepik.com/free-photo/3d-render-businessman-hand-holding-money-banknotes_107791-17027.jpg?size=626&ext=jpg" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4" />
                                <p className="truncate">Lender: {offer[2]}</p>
                                <p>Amount: {formatUnits(offer[3], TokenList[offer[1].decimals])}</p>
                                <p>Rate: {offer[4].toString()}</p>
                                <p>Status: {convertService(offer[6].toString())}</p>
                                <p>Return date: <span>{(new Date(Number(offer[5]) * 1000)).toDateString()}</span></p>
                                {((address === transaction?.address) && (offer[6].toString() === "0")) && <div className="flex justify-between flex-col lg:flex-row md:flex-row flex-wrap">
                                    <button
                                        onClick={() => handleOffer(id, offer[0].toString(), "accept")}
                                        className="bg-bg-ash text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[40%] my-4 mx-auto text-center font-bold truncate flex">
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleOffer(id, offer[0].toString(), "reject")}
                                        className="bg-bg-ash text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[40%] my-4 mx-auto text-center font-bold truncate flex">
                                        Reject
                                    </button>
                                </div>}
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    );
}

export default TransactionDetails;

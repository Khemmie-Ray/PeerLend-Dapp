import React from 'react';
import { useParams } from 'react-router-dom';
import UseFetchRequests from "../../Hooks/UseFetchRequests";
import TokenList from "../../constants/tokenList.json";
import { formatUnits } from "ethers";
import requestImage from '../../assets/request.jpeg'
import ServiceRequest from "../../components/ServiceRequest";
import MakeOffer from "../../components/MakeOffer"

const TransactionDetails = () => {
    const { id } = useParams();
    const allRequests = UseFetchRequests();
    const transaction = allRequests.find(data => data?.id.toString() === id);

    if (!transaction) {
        return <p>Transaction not found.</p>;
    }

    return (
        <main>
            <   h2 className="lg:text-[26px] md:text-[26px] text-[20px] mb-6 font-bold">Transaction Details</h2>
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
                    <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                        <img src="https://img.freepik.com/free-photo/3d-render-businessman-hand-holding-money-banknotes_107791-17027.jpg?size=626&ext=jpg" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4" />
                        <p className="truncate">Lender: </p>
                        <p>Amount: </p>
                        <p>Rate: </p>
                        <p>Repayment: </p>
                        <p>Return date: <span>3 Days: 12Hrs : 02Secs</span></p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default TransactionDetails;

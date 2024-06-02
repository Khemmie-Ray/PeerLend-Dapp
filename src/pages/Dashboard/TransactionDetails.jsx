import React from 'react';
import { useParams } from 'react-router-dom';
import UseFetchRequests from "../../Hooks/UseFetchRequests";
import TokenList from "../../constants/tokenList.json";
import { formatUnits } from "ethers";
import requestImage from '../../assets/request.jpeg'

const TransactionDetails = () => {
    const { id } = useParams();
    const allRequests = UseFetchRequests();
    const transaction = allRequests.find(data => data?.id.toString() === id);

    if (!transaction) {
        return <p>Transaction not found.</p>;
    }

    return (
        <div className="w-[100%] flex flex-col lg:flex-row  md:flex-row justify-between rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
            <img src={requestImage} alt="" className="w-[100%] lg:w-[50%] md:w-[50%] rounded-lg h-[200px] object-cover object-center mb-4" />
            <div className="w-[100%] lg:w-[47%] md:w-[47%]">
            <p>Amount: {formatUnits(transaction?.amount, TokenList[transaction?.loanReq]?.decimals)}</p>
            <p>Rate: {transaction?.interest.toString()}<span>&#37;</span></p>
            <p>Repayment: {formatUnits(transaction?.repayment, TokenList[transaction?.loanReq]?.decimals + 1)}</p>
            <p>Return date: <span>{(new Date(Number(transaction?.rDate) * 1000)).toLocaleString()}</span></p>
            </div>
        </div>
    );
}

export default TransactionDetails;

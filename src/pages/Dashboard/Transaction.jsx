import UseFetchRequests from "../../Hooks/UseFetchRequests"
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import TokenList from "../../constants/tokenList.json"
import { Link } from "react-router-dom";
import requestImage from '../../assets/request.jpeg'

import { formatUnits } from "ethers";

const Transaction = () => {
    const allRequests = UseFetchRequests()

  return (
    <main>
        <h2>All</h2>
        <section className="flex justify-between flex-wrap">
         {allRequests.map((data, index) => (
         <div key={index} className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
             <Link to={`/dashboard/transaction/${data?.id}`}>
            <img src={requestImage} alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4" />
            <p>Amount: {formatUnits(data?.amount, TokenList[data?.loanReq]?.decimals)}</p>
            <p>Rate: {data?.interest.toString()}<span>&#37;</span></p>
            <p>Repayment: {formatUnits(data?.repayment, TokenList[data?.loanReq]?.decimals + 1)}</p>
            <p>Return date: <span>{(new Date(Number(data?.rDate) * 1000)).toLocaleString()}</span></p>
            </Link>
        </div>
         ))}
        </section>
    </main>
  )
}

export default Transaction
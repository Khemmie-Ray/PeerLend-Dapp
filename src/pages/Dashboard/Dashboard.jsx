import WithdrawCollateral from "../../components/WithdrawCollateral";
import CreateRequest from "../../components/CreateRequest";
import GitCoinVerification from "../../components/GitCoinVerification";
import DepositCollateral from "../../components/DepositCollateral";
import ServiceRequest from "../../components/ServiceRequest";
import MakeOffer from "../../components/MakeOffer"
import RequestsTable from "../../components/RequestsTable";

import UseFetchRequests from "../../Hooks/UseFetchRequests";
import EmailVerification from "../../components/EmailVerification";


const Dashboard = () => {
  const allRequests = UseFetchRequests()

  return (
    <main className="">
      <section className='flex justify-between flex-col lg:flex-row md:flex-row border bg-bg-gray border-bg-ash p-6 rounded-lg'>
        <div className="w-3/6" >
          <h2 className="lg:text-[42px] md:text-[42px] text-[24px] font-bold mb-4">Welcome</h2>
          <div className='flex'>
            <p className='uppercase mr-8'>Balance <br /> <span className='lg:text-[24px] md:text-[24px] text-[18px] font-bold'>0.00</span></p>
            <p className='uppercase'>Collateral <br /> <span className='lg:text-[24px] md:text-[24px] text-[18px] font-bold'>0.00</span></p>
          </div>
          <GitCoinVerification />
        </div>
        <div className='w-3/6 flex justify-end items-end flex-col mb-4'>
          <div>
            <p className='lg:text-[22px] md:text-[22px] text-[20px] font-bold mb-2'>Get started</p>
            <p>Verify your email first to access the platform</p>
            <EmailVerification />
          </div>
          <div className='text-center mb-6'>
            <p className='lg:text-[22px] md:text-[22px] text-[20px]'>Create Lend Request.</p>
            <CreateRequest />
          </div>
          <div className='w-[80%]'>
            <h3 className="lg:text-[22px] md:text-[22px] text-[20px] mb-2">Manage Collateral</h3>
            <div className="flex justify-between items-center">
              <DepositCollateral />
              <WithdrawCollateral />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-bg-gray border-bg-ash rounded-lg p-10 my-6 flex justify-between items-center'>
        <div className='bg-deepBlue rounded-lg p-6 text-center text-[22px] lg:w-[40%] md:w-[40%] w-[100%] mb-auto'>
          <div >
            <p>Make offer</p>
            <MakeOffer />
          </div>
          <div>
            <p>Service request</p>
            <ServiceRequest />
          </div>
        </div>
        <section className='bg-bg-gray border-bg-ash rounded-lg lg:w-[55%] md:w-[55%] w-[100%]'>
          <h3 className='mb-4 text-[26px] font-bold'>Incoming requests.</h3>
          <RequestsTable />
        </section>
      </section>

    </main>
  )
}

export default Dashboard
import WithdrawCollateral from "../../components/WithdrawCollateral";
import CreateRequest from "../../components/CreateRequest";
import GitCoinVerification from "../../components/GitCoinVerification";
import DepositCollateral from "../../components/DepositCollateral";
import ServiceRequest from "../../components/ServiceRequest";
import MakeOffer from "../../components/MakeOffer"
import RequestsTable from "../../components/RequestsTable";
import UseFetchRequests from "../../Hooks/UseFetchRequests";
import EmailVerification from "../../components/EmailVerification";
import RespondToOffer from "../../components/RespondToOffer";


const Dashboard = () => {
  const allRequests = UseFetchRequests()

  return (
    <main className="">
        <h2 className="lg:text-[42px] md:text-[42px] text-[24px] font-bold mb-4">Welcome</h2>
      <section className='flex justify-between flex-col lg:flex-row md:flex-row border bg-bg-gray border-bg-ash p-6 rounded-lg'>
        <div className="w-3/6" >
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
          </div>
        </section>
        <section className='bg-bg-gray border border-bg-ash rounded-lg p-10 my-6 flex justify-between items-center'>
        <div className='lg:w-[30%] md:w-[30%] w-[80%] mb-auto'>
            <h3 className="lg:text-[22px] md:text-[22px] text-[20px] mb-6">Manage Collateral</h3>
            <div className="flex flex-col">
            <DepositCollateral />
            <WithdrawCollateral />
            </div>
          </div>
          <div className='bg-deepBlue rounded-lg p-4 text-[22px] lg:w-[60%] md:w-[60%] w-[100%] mb-auto'>
          <h3 className="lg:text-[22px] md:text-[22px] text-[20px] mb-2">Manage Offers</h3>
          <div className="flex">
          <div className="my-2 mr-14">
            <p>Make offer</p>
            <MakeOffer />
          </div>
          <div className="my-2">
            <p>Service request</p>
            <ServiceRequest />
          </div>
          </div>
        </div>
        </section>
        <section className='bg-bg-gray border border-bg-ash rounded-lg w-[100%] px-10 py-6'>
          <h3 className='text-[26px] font-bold'>Requests.</h3>
            <RequestsTable />
        </section>
    </main>
  )
}

export default Dashboard
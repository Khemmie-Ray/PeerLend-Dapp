// import RequestsTable from "../components/RequestsTable"

const MarketPlace = () => {

  return (
    <main className="w-[90%] mx-auto"> 
       <section className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto text-center my-10">
        <h2 className="lg:text-[54px] md:text-[54px] text-[36px] font-bold mb-4">Marketplace</h2>
        <p className="text-[24px]">Seamlessly Supply, Borrow, and Manage Assets in the PeerLend Marketplace.</p>
       </section>
       <section className="flex justify-between items-center my-16">
        <div className="lg:w-[55%] md:w-[55%] w-[100%]">
        <h2 className="lg:text-[50px] md:text-[50px] text-[36px] font-bold mb-4">How to participate.</h2>
        <p>Three Easy Steps to Supply, Borrow, and Manage Your Crypto Assets with Confidence in themarketplace</p>
        <button className="bg-purple text-white py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] lg:w-[30%] md:w-[30%] w-[100%] my-4">Dashboard &rarr;</button>
        </div>
        <div className="lg:w-[35%] md:w-[35%] w-[100%] flex flex-col">
            <div className="self-center mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash text-[64px]">1</p>
                <p>Connect Wallet</p>
            </div>
            <div className="mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash text-[64px]">2</p>
                <p>Borrow Against Collateral</p>
            </div>
            <div className="self-end mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash text-[64px]">3</p>
                <p>Manage Your Positions</p>
            </div>
        </div>
       </section>
      <h3 className="lg:text-[50px] md:text-[50px] text-[36px] font-bold">Check out all active requests</h3>
       {/* <RequestsTable /> */}
    </main>
  )
}

export default MarketPlace
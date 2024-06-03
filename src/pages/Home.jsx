import { NavLink } from "react-router-dom"
import bgChart from "../assets/bg.svg"
import { FaGithub } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

const Home = () => {
  return (
    <main>
        <section className="mb-10 bg-cover bg-center bg-[#1d1d1d] bg-blend-overlay"  style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150428791.jpg?size=626&ext=jpg&ga=GA1.2.931180814.1714092703&semt=ais"}}>
            <div className="w-[90%] mx-auto flex items-center flex-col lg:flex-row md:flex-row">
            <div className="w-[100%] lg:w-[48%] md:w-[48%]">
                <h1 className="lg:text-[64px] md:text-[64px] text-[30px] font-bold">Deep <span className="text-bg-ash">Crypto</span>  <br /> Liquidity Access.</h1>
                <p className="mb-10">A decentralized peer-to-peer liquidity protocol providing users with a secure sandbox for managing DeFi assets, backed by transparency and governance.</p>
            <a className="bg-bg-ash py-4 px-12 rounded-lg text-[18px] text-darkGrey font-bold" href='#getStarted'>Get Started &rarr;</a>
            </div>
            <div className="w-[100%] lg:w-[52%] md:w-[52%]">
                <img src={bgChart} alt="" className="w-[100%]" />
            </div>
            </div>
        </section>
        <section className="flex justify-between items-center flex-col lg:flex-row md:flex-row w-[90%] mx-auto">
            <div className="w-[100%] lg:w-[48%] md:w-[48%] bg-bg-gray rounded-lg p-6 border border-bg-ash/50">
                <h2 className="lg:text-[40px] md:text-[40px] text-[26px] font-bold mb-4">Governance</h2>
                <p className="mb-10">PeerLend operates under a decentralized governance model where rules are voted on by stakers. The protocol is maintained and enhanced by core contributors and community members. Join in governance activities and vote on new proposals and protocol upgrades</p>
            </div>
            <div className="w-[100%] lg:w-[48%] md:w-[48%] bg-bg-gray rounded-lg p-6 border border-bg-ash/50">
                <h2 className="lg:text-[40px] md:text-[40px] text-[26px] font-bold mb-4">Risk Management</h2>
                <p className="mb-10">Access a real-time reporting and performance dashboard featuring key performance and risk metrics. Generate easily readable reports with provable data on all transactions at any point in history. Implement scoring mechanisms and KYC procedures for enhanced risk management</p>
            </div>
        </section>
        <section className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto text-center mt-20">
        <h2 className="lg:text-[48px] md:text-[48px] text-[26px] font-bold mb-4">Get Started</h2>
        <p className="text-[18px]">Seamlessly Supply, Borrow, and Manage Assets in Three Easy Steps on PeerLend .</p>
       </section>
       <section className="flex justify-between items-center my-16 w-[90%] mx-auto" id="getStarted">
        <div className="lg:w-[55%] md:w-[55%] w-[100%] self-center">
        <img src="https://img.freepik.com/free-photo/group-afro-americans-working-together_1303-8971.jpg?t=st=1717371328~exp=1717374928~hmac=a3c98d6c49c0ce82df02d900fbbe31449bca521dc5b23f64673f21440a9940c1&w=1800" alt="" className="rounded-lg"/>
        </div>
        <div className="lg:w-[35%] md:w-[35%] w-[100%] flex flex-col">
            <div className="self-center mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash/50 text-[64px]">1</p>
                <p>Connect Wallet</p>
            </div>
            <div className="mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash/50 text-[64px]">2</p>
                <p>Borrow Against Collateral</p>
            </div>
            <div className="self-end mb-4">
                <p className="bg-bg-gray p-12 rounded-full w-[130px] h-[130px] flex justify-center items-center border border-bg-ash/50 text-[64px]">3</p>
                <p>Manage Your Positions</p>
            </div>
        </div>
       </section>
        <section className="w-[90%] mx-auto lg:text-[24px] md:text-[24px] text-[18px] my-24">
            <h2 className="lg:text-[48px] md:text-[48px] text-[26px] font-bold mb-4 text-center">Stay Connected</h2>
            <p className="w-[100%] lg:w-[70%] md:w-[70%] text-ash mx-auto text-center">Join our vibrant community be part of the conversation, contribute your ideas, and help shape the future of PeerLend!</p>
            <div className="flex items-baseline justify-between my-16">
            <div className=" my-4 w-[100%] lg:w-[45%] md:w-[45%]">
            <h2 className="lg:text-[40px] md:text-[40px] text-[26px] font-bold mb-4">Follow Us On</h2>
                <div className="flex flex-col lg:flex-row md:flex-row justify-between w-[100%] lg:w-[80%] md:w-[80%]">
                <div className="bg-bg-gray p-6 border border-bg-ash/50 rounded-lg flex flex-col items-center">
                    <SiDiscord className="text-white text-[2rem] mb-4"/>
                    <p>Discord</p>
                </div>
                <div className="bg-bg-gray p-6 border border-bg-ash/50 rounded-lg flex flex-col items-center">
                    <RiTwitterXFill className="text-blue-500 text-[2rem] mb-4"/>
                    <p>Twitter</p>
                </div>
                <div className="bg-bg-gray p-6 border border-bg-ash/50 rounded-lg flex flex-col items-center">
                    <FaGithub className="text-white text-[2rem] mb-4"/>
                    <p>Github</p>
                </div>
                </div>
            </div>
        <div className=" w-[100%] lg:w-[50%] md:w-[50%] p-4">
            <h2 className="lg:text-[40px] md:text-[40px] text-[26px] font-bold mb-4">Subscribe</h2>
            <p>Stay up to date with the latest news, announcements, and reports</p>
            <div className="flex flex-col">
            <input type="text" placeholder="Email" className="py-4 px-12  rounded-lg bg-[#ffffff23] backdrop-blur-lg my-6"/>
            <button className="bg-bg-ash text-darkGrey font-bold py-4 px-12 rounded-lg text-[16px]">Subscribe &rarr;</button>
            </div>
        </div>
        </div>
        </section>
        <section className="bg-bg-gray py-16">
            <div className="flex flex-col lg:flex-row md:flex-row w-[90%] mx-auto">
            <div className="lg:w-[45%] md:w-[45%] w-[90%] self-center">
                <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Contact</h2>
                <p className="w-[100%] p-4 lg:w-[70%] md:w-[70%] lg:text-[20px] md:text-[20px] text-[18px]">Our team will contact you soon to talk about your message.</p>
            </div>
            <div className="lg:w-[45%] md:w-[45%] w-[90%] flex flex-col ml-auto">
                <input type="text" placeholder="Name" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"/>
                <input type="text" placeholder="Email" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
                <input type="text" placeholder="Phone Number" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
                <textarea name="" id="" rows="3" placeholder="Message" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
            <button className="bg-bg-ash text-darkGrey font-bold py-4 px-12 rounded-lg text-[18px]">Submit &rarr;</button>
            </div>
            </div>
        </section>
        
    </main>
  )
}

export default Home
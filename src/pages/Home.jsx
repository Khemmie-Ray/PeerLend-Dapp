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
                <h1 className="lg:text-[64px] md:text-[64px] text-[30px]">Deep <span className="text-purple">Crypto</span>  <br /> Liquidity Access.</h1>
                <p className="mb-10">A decentralized peer-to-peer liquidity protocol providing users with a secure sandbox for managing DeFi assets, backed by transparency and governance.</p>
            <NavLink className="bg-purple py-4 px-12 rounded-lg lg:text-[24px] md:text-[24px] text-[16px]">Get Started &rarr;</NavLink>
            </div>
            <div className="w-[100%] lg:w-[52%] md:w-[52%]">
                <img src={bgChart} alt="" className="w-[100%]" />
            </div>
            </div>
        </section>
        <section className="flex justify-between items-center flex-col lg:flex-row md:flex-row w-[90%] mx-auto">
            <div className="w-[100%] lg:w-[48%] md:w-[48%] bg-bg-gray rounded-lg p-6 border border-bg-ash">
                <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Governance</h2>
                <p className="mb-10">PeerLend operates under a decentralized governance model where rules are voted on by stakers. The protocol is maintained and enhanced by core contributors and community members. Join in governance activities and vote on new proposals and protocol upgrades</p>
            <NavLink className="bg-purple py-4 px-12 rounded-lg lg:text-[24px] md:text-[24px] text-[16px]">Governance &rarr;</NavLink>
            </div>
            <div className="w-[100%] lg:w-[48%] md:w-[48%] bg-bg-gray rounded-lg p-6 border border-bg-ash">
                <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Risk Management</h2>
                <p className="mb-10">Access a real-time reporting and performance dashboard featuring key performance and risk metrics. Generate easily readable reports with provable data on all transactions at any point in history. Implement scoring mechanisms and KYC procedures for enhanced risk management</p>
            <NavLink className="bg-purple py-4 px-12 rounded-lg lg:text-[20px] md:text-[20px] text-[16px]">Dashboard &rarr;</NavLink>
            </div>
        </section>
        <section className="w-[90%] mx-auto lg:text-[24px] md:text-[24px] text-[18px] my-24">
            <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Join the Community</h2>
            <p className="w-[100%] lg:w-[70%] md:w-[70%] text-ash">Join our vibrant community be part of the conversation, contribute your ideas, and help shape the future of PeerLend!</p>
            <div className="flex flex-col lg:flex-row md:flex-row justify-between my-14">
                <div className="bg-bg-gray p-6 border border-bg-ash lg:w-[30%] md:w-[30%] w-[90%] lg:h-[333px] md:h-[333px] h-[200px] flex flex-col justify-center items-center rounded-[60px]">
                    <SiDiscord className="text-white lg:text-[8rem] md:text-[8rem] text-[3rem] mb-4"/>
                    <p>Discord</p>
                </div>
                <div className="bg-bg-gray p-6 border border-bg-ash lg:w-[30%] md:w-[30%] w-[90%] lg:h-[333px] md:h-[333px] h-[200px] flex flex-col justify-center items-center rounded-[60px]">
                    <RiTwitterXFill className="text-blue-500 lg:text-[8rem] md:text-[8rem] text-[3rem] mb-4"/>
                    <p>Twitter</p>
                </div>
                <div className="bg-bg-gray p-6 border border-bg-ash lg:w-[30%] md:w-[30%] w-[90%] lg:h-[333px] md:h-[333px] h-[200px] flex flex-col justify-center items-center rounded-[60px]">
                    <FaGithub className="text-white lg:text-[8rem] md:text-[8rem] text-[3rem] mb-4"/>
                    <p>Github</p>
                </div>
            </div>
        </section>
        <section className="my-16 w-[100%] lg:w-[30%] md:w-[30%] p-4 mx-auto text-center">
            <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Subscribe</h2>
            <p>Stay up to date with the latest news, announcements, and reports</p>
            <div className="flex flex-col">
            <input type="text" placeholder="Email" className="py-4 px-12 rounded-lg bg-[#ffffff23] backdrop-blur-lg my-6"/>
            <button className="bg-purple py-4 px-12 rounded-lg lg:text-[20px] md:text-[20px] text-[16px]">Subscribe &rarr;</button>
            </div>
        </section>
        <section className="bg-bg-gray py-16">
            <div className="flex flex-col lg:flex-row md:flex-row w-[90%] mx-auto">
            <div className="lg:w-[45%] md:w-[45%] w-[90%] self-center">
                <h2 className="lg:text-[54px] md:text-[54px] text-[30px] font-bold mb-4">Contact</h2>
                <p className="w-[100%] p-4 lg:w-[70%] md:w-[70%] lg:text-[20px] md:text-[20px] text-[16px]">Our team will contact you soon to talk about your message.</p>
            </div>
            <div className="lg:w-[45%] md:w-[45%] w-[90%] flex flex-col ml-auto">
                <input type="text" placeholder="Name" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"/>
                <input type="text" placeholder="Email" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
                <input type="text" placeholder="Phone Number" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
                <textarea name="" id="" rows="3" placeholder="Message" className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4" />
            <button className="bg-purple py-4 px-12 rounded-lg lg:text-[20px] md:text-[20px] text-[16px]">Submit &rarr;</button>
            </div>
            </div>
        </section>
        
    </main>
  )
}

export default Home
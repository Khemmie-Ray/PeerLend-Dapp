import logo from "../assets/logo.svg"
import { FaGithub } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="mt-14 p-4">
        <section className="flex justify-between flex-col lg:flex-row md:flex-row w-[90%] mx-auto py-4">
        <div>
        <div className="flex items-center mb-4">
        <img src={logo} alt="" className="w-[30px] h-[30px]"/>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] font-black">PeerLend</p>
        </div>
        <div className="flex items-center">
            <p className="mr-4">Follow Us:</p>
            <FaGithub className="mr-4 text-[28px]" />
            <RiTwitterXFill className="mr-4" /> 
            <SiDiscord />
        </div>
        </div>
        <div>
            <h3 className="lg:text-[24px] md:text-[24px] text-[18px] my-4 font-black">Pages</h3>
            <NavLink className="mr-4">MarketPlace <span className="h-[50px] w-[50px] rounded-full bg-white">1</span></NavLink>
            <NavLink className="mr-4">Governance .</NavLink>
            <NavLink>Blog</NavLink>
        </div>
        <div>
            <h3 className="lg:text-[24px] md:text-[24px] text-[18px] my-4">Contact</h3>
            <p>peerlend_int@gmail.com</p>
        </div>
        </section>
        <section className="border-t border-bg-ash text-center p-4">
            <p>&copy; All Rights reserved PeerLend Team.</p>
        </section>
    </footer>
  )
}

export default Footer
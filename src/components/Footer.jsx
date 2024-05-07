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
        <div className="my-4">
        <div className="flex items-center mb-4">
        <img src={logo} alt="" className="w-[30px] h-[30px]"/>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] font-black">PeerLend</p>
        </div>
        <div className="flex items-center">
            <p className="mr-4">Follow Us:</p>
            <FaGithub className="mr-4 text-[28px]" />
            <RiTwitterXFill className="mr-4 text-[28px]" /> 
            <SiDiscord className="text-[28px]"/>
        </div>
        </div>
        <div className="my-4">
            <h3 className="lg:text-[24px] md:text-[24px] text-[18px] mb-4 font-black">Pages</h3>
            <div className="flex items-center">
            <NavLink className="flex items-center">MarketPlace <p className="h-[10px] w-[10px] rounded-full bg-white mx-4"></p></NavLink>
            <NavLink className="flex items-center">Governance <p className="h-[10px] w-[10px] rounded-full bg-white mx-4"></p></NavLink>
            <NavLink>Blog</NavLink>
            </div>
        </div>
        <div className="my-4">
            <h3 className="lg:text-[24px] md:text-[24px] text-[18px] mb-4 font-black">Contact</h3>
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
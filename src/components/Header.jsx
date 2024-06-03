import { NavLink } from "react-router-dom"
import logoIcon from "../assets/logo.svg"
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const Header = () => {
  const { walletProvider } = useWeb3ModalProvider()
  const [showNav, setShowNav] = useState(false)
  const { isConnected } = useWeb3ModalAccount();

  return (
    <header className="py-10 px-2 text-[18px] font-bold sticky top-0 bg-gradient-to-tr from-darkGrey to-lightGrey">
        <div className="w-[90%] mx-auto lg:flex md:flex justify-between items-center hidden">
        <div className="flex items-center w-1/3">
        <NavLink to="/"><img src={logoIcon} alt="" className="w-[30px] h-[30px]"/></NavLink>
        <p>PeerLend</p>
        </div> 
          <w3m-button />
        </div>
            <div className="w-[90%] mx-auto flex justify-between items-center lg:hidden md:hidden">
            <div className="flex items-center w-1/3">
            <NavLink to="/"><img src={logoIcon} alt="" className="w-[30px] h-[30px]"/></NavLink>
            <p>PeerLend</p>
            </div>
            {showNav ? <IoMdClose onClick={(e) => setShowNav(false)} className="text-[30px]"/> : <CiMenuFries onClick={(e) => setShowNav(true)} className="text-[30px]" />}
            {showNav && ( <nav className="flex flex-col justify-between items-center absolute top-28 p-6 w-full bg-bg-gray">
                <div>
                <NavLink to="governance" className="mb-8 block">Governance</NavLink>
                <NavLink to="marketplace" className="mb-8 block">MarketPlace</NavLink>
                {/* <NavLink to="" className="mb-8 block">Blog</NavLink> */}
                </div>
                <div >
                <w3m-button />
                </div>
            </nav>
        )}
        </div>
    </header>
  )
}

export default Header
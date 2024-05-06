import { NavLink } from "react-router-dom"
import logoIcon from "../assets/logo.svg"
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { walletProvider } = useWeb3ModalProvider()
  const [isConnected, setIsConnected] = useState(false);
  const [showNav, setShowNav] = useState(false)
  
    useEffect(() => {
      if (walletProvider) {
        setIsConnected(true);
      }
    }, [walletProvider]);

  return (
    <header className="py-10 px-2 text-[18px] font-bold sticky top-0 bg-gradient-to-tr from-darkGrey to-lightGrey">
        <div className="w-[90%] mx-auto lg:flex md:flex justify-between items-center hidden">
        <div className="flex items-center w-1/3">
        <NavLink to="/"><img src={logoIcon} alt="" className="w-[30px] h-[30px]"/></NavLink>
        <p>PeerLend</p>
        </div>
        <nav className="flex justify-between items-center w-2/3">
            <div>
              {isConnected && (
              <NavLink to="landingpage" className="mr-8">Dashboard</NavLink>
              )}
            <NavLink to="governance" className="mr-8">Governance</NavLink>
            <NavLink to="marketplace" className="mr-8">MarketPlace</NavLink>
            <NavLink to="">Blog</NavLink>
            </div>
            <div >
            <w3m-button balance="show"/>
            </div>
        </nav>
        </div>
            <div className="w-[90%] mx-auto flex justify-between items-center lg:hidden md:hidden">
            <div className="flex items-center w-1/3">
            <NavLink to="/"><img src={logoIcon} alt="" className="w-[30px] h-[30px]"/></NavLink>
            <p>PeerLend</p>
            </div>
            {showNav ? <IoMdClose onClick={(e) => setShowNav(false)} className="text-[30px]"/> : <CiMenuFries onClick={(e) => setShowNav(true)} className="text-[30px]" />}
            {showNav && ( <nav className="flex flex-col justify-between items-center absolute top-28 p-6 w-full bg-bg-gray">
                <div>
                  {isConnected && (
                  <NavLink to="landingpage" className="mb-8 block">Dashboard</NavLink>
                  )}
                <NavLink to="governance" className="mb-8 block">Governance</NavLink>
                <NavLink to="marketplace" className="mb-8 block">MarketPlace</NavLink>
                <NavLink to="" className="mb-8 block">Blog</NavLink>
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
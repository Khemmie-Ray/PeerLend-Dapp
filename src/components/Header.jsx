import { NavLink } from "react-router-dom"
import logoIcon from "../assets/logo.svg"
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useState, useEffect } from "react";

const Header = () => {
  const { walletProvider } = useWeb3ModalProvider()
  const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      if (walletProvider) {
        setIsConnected(true);
      }
    }, [walletProvider]);

  return (
    <header className="py-10 px-2 text-[18px] font-bold sticky top-0 bg-gradient-to-tr from-darkGrey to-lightGrey">
        <div className="w-[90%] mx-auto lg:flex justify-between items-center hidden">
        <div className="flex items-center w-1/3">
        <img src={logoIcon} alt="" className="w-[30px] h-[30px]"/>
        <p>PeerLend</p>
        </div>
        <nav className="flex justify-between items-center w-2/3">
            <div>
              {isConnected && (
              <NavLink to="landingpage" className="mr-8">Dashboard</NavLink>
              )}
            <NavLink to="governance" className="mr-8  ">Governance</NavLink>
            <NavLink>MarketPlace</NavLink>
            </div>
            <div >
            <w3m-button />
            </div>
        </nav>
        </div>
    </header>
  )
}

export default Header
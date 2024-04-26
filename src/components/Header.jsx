import { NavLink } from "react-router-dom"
import logoIcon from "../assets/logo.svg"

const Header = () => {
  return (
    <header className="py-10 px-2 text-[18px] font-bold sticky top-0 bg-gradient-to-tr from-darkGrey to-lightGrey">
        <div className="w-[90%] mx-auto flex justify-between items-center">
        <div className="flex items-center w-1/3">
        <img src={logoIcon} alt="" className="w-[30px] h-[30px]"/>
        <p>PeerLend</p>
        </div>
        <nav className="flex justify-between items-center w-2/3">
            <div>
            <NavLink className="mr-6">Governance</NavLink>
            <NavLink>MarketPlace</NavLink>
            </div>
            <div>
            <NavLink className="mr-6">Sign In</NavLink>
            <NavLink className="bg-purple py-4 px-12 rounded-lg">App &rarr;</NavLink>
            </div>
        </nav>
        </div>
    </header>
  )
}

export default Header
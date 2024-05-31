import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoNotifications } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { RiGovernmentFill } from "react-icons/ri";
import { useDisconnect } from "@web3modal/ethers/react";
import { RxAvatar } from "react-icons/rx";

const Sidebar = () => {
  const { disconnect } = useDisconnect()
    const activeStyle = {
        backgroundColor: '#E0BB83',
        fontWeight: 'bold',
        color: '#0A0D17',
        width: '100%',
        padding: '20px 30px'
    };

  return (
    <div className="bg-bg-gray w-[20%] h-[80vh] py-8 flex flex-col">
        <NavLink to="/dashboard"  end className="flex items-center py-4 px-8 my-4" style={({isActive}) => isActive ? activeStyle : null }><MdDashboard className="mr-2" end /> Dashboard</NavLink>
        <NavLink to="transaction" className="flex items-center py-4 px-8 my-4" style={({isActive}) => isActive ? activeStyle : null }><GrTransaction className="mr-2"/> Transaction</NavLink>
        <NavLink to="connectedGovernance" className="flex items-center py-4 px-8 my-4" style={({isActive}) => isActive ? activeStyle : null }><RiGovernmentFill className="mr-2" /> Governance</NavLink>
        <NavLink to="profile" className="flex items-center py-4 px-8 my-4" style={({isActive}) => isActive ? activeStyle : null }><RxAvatar className="mr-2" /> Profile</NavLink>
        <div className="mt-auto">
            <button className="flex items-center py-4 px-8 my-4" onClick={disconnect}><IoLogOut className="mr-2" /> Log Out</button>
        </div>
    </div>
  )
}

export default Sidebar
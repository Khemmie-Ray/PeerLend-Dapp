import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoNotifications } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { RiGovernmentFill } from "react-icons/ri";

const Sidebar = () => {
    const activeStyle = {
        backgroundColor: '#7302A8',
        width: '100%',
        padding: '20px'
    };

  return (
    <div className="bg-bg-gray w-[20%] h-[80vh] py-8 flex flex-col">
        <NavLink to="/dashboard" className="flex items-center p-4 my-4" style={({isActive}) => isActive ? activeStyle : null }><MdDashboard className="mr-2" end /> Dashboard</NavLink>
        <NavLink to="transaction" className="flex items-center p-4 my-4" style={({isActive}) => isActive ? activeStyle : null }><GrTransaction className="mr-2"/> Transaction</NavLink>
        <NavLink to="connectedGovernance" className="flex items-center p-4 my-4" style={({isActive}) => isActive ? activeStyle : null }><RiGovernmentFill className="mr-2" /> Governance</NavLink>
        <NavLink to="notification" className="flex items-center p-4 my-4" style={({isActive}) => isActive ? activeStyle : null }><IoNotifications className="mr-2" /> Notifications</NavLink>
        <div className="mt-auto">
            <button className="flex items-center p-4 my-4"><IoLogOut className="mr-2" /> Log Out</button>
        </div>
    </div>
  )
}

export default Sidebar
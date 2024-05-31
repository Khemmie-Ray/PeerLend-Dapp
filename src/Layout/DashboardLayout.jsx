import Sidebar from "../components/Sidebar"
import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const DashboardLayout = () => {
  const { isConnected } = useWeb3ModalAccount();
  return !isConnected ? <Navigate to={'/'}/> : (
    <div>
      <Header />
    <div className="flex justify-between items-center">
        <Sidebar />
        <div className="w-[100%] lg:w-[77%] md:w-[77%] h-auto lg:h-[80vh] md:h-[80vh] overflow-y-scroll p-8">
        <Outlet />
        </div>
    </div>
    </div>
  )
}

export default DashboardLayout
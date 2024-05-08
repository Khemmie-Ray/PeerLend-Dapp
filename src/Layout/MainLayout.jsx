import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useWeb3ModalAccount } from "@web3modal/ethers/react"

const MainLayout = () => {
  const { isConnected } = useWeb3ModalAccount();
  return isConnected ? <Navigate to={'/dashboard'}/> : (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  ) 
}

export default MainLayout
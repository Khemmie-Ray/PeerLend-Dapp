import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import { configWeb3Modal } from "./connection";
import DAOPage from "./pages/DAOPage";
import MarketPlace from "./pages/MarketPlace";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ConnectedGovernance from "./pages/Dashboard/ConnectedGovernance";
import Profile from "./pages/Dashboard/Profile";
import TermsCondition from "./pages/Dashboard/TermsCondition";

configWeb3Modal();

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<MainLayout />} >
      <Route index element={<Home />} />
      <Route path="/governance" element={<DAOPage />} />
      <Route path="/marketplace" element={<MarketPlace />} />
    </Route>
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="connectedGovernance" element={<ConnectedGovernance />} />
      <Route path="profile" element={<Profile />} />
      <Route path="terms" element={<TermsCondition />} />
    </Route>
  </Route>
))

const App = () => {
  return (
    <div className=" w-full mx-auto  min-h-[100vh] text-text-bg font-ubuntu from-darkGrey to-lightGrey bg-gradient-to-tr">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

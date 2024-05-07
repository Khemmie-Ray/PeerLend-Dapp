import { 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Governance from "./pages/Governance";
import { configWeb3Modal } from "./connection";
import LandingPage from "./pages/Dashboard/LandingPage";
import MarketPlace from "./pages/MarketPlace";

configWeb3Modal();

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<MainLayout />} >
    <Route index element={<Home />} />
    <Route path="governance" element={<Governance/>} />
    <Route path="landingpage" element={<LandingPage />} />
    <Route path="marketplace" element={<MarketPlace />} />
    </Route>
  </Route>
))

const App = () => {
  return (
    <div className=" w-full mx-auto  min-h-[100vh] text-white font-ubuntu from-darkGrey to-lightGrey bg-gradient-to-tr">
        <RouterProvider router={router} />
    </div> 
  )
}

export default App

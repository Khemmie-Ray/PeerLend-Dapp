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

configWeb3Modal();

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<MainLayout />} >
    <Route index element={<Home />} />
    <Route path="governance" element={<Governance/>} />
    <Route path="landingpage" element={<LandingPage />} />
    </Route>
  </Route>
))

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto bg-gradient-to-tr from-darkGrey to-lightGrey min-h-[100vh] text-white font-ubuntu">
        <RouterProvider router={router} />
    </div> 
  )
}

export default App

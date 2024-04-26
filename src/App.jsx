import { 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<MainLayout />} >
    <Route index element={<Home />} />
    </Route>
  </Route>
))

const App = () => {
  return (
    <div className="max-w-[1440px] bg-gradient-to-tr from-darkGrey to-lightGrey min-h-[100vh] text-white font-ubuntu">
        <RouterProvider router={router} />
    </div> 
  )
}

export default App

import { 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom";
import Home from "./pages/Home"
import { configWeb3Modal } from "./connection";
import HomeLayout from "./layout/HomeLayout";

configWeb3Modal();


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
  <Route path="/" element={<HomeLayout />} >
    <Route index element={<Home />} />
  </Route>
 
  </Route>
))

function App() {

    return (
      <div className="text-[#FFF] lg:max-w-[1440px] md:max-w-[1440px] font-roboto-serif font-[100]">
        <RouterProvider router={router} />
    </div> 
    )
}

export default App
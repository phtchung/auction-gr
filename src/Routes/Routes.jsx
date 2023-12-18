import ReqOrderTracking from "../Pages/ReqOrderTracking/reqOrderTracking.jsx";
import WinOrderDetail from "../Pages/WinOrderDetail/winOrderDetail.jsx";
import ReqOrderDetail from "../Pages/ReqOrderDetail/reqOrderDetail.jsx";
import WinOrdersTracking from "../Pages/WinOrdersTracking/winOrdersTracking.jsx";
import Home from "../Pages/Home/home.jsx";



export const NormalRoutes = [
    {path: "/reqOrderTracking", element: <ReqOrderTracking/>},
    {path:"/winOrderDetail", element :<WinOrderDetail/>},
    {path: "/reqOrderDetail", element: <ReqOrderDetail/>},
    {path: "/winOrderTracking", element: <WinOrdersTracking/>},
    {path: "/", element: <Home/>},

]

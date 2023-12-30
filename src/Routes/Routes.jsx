import ReqOrderTracking from "../Pages/ReqOrderTracking/reqOrderTracking.jsx";
import WinOrderDetail from "../Pages/WinOrderDetail/winOrderDetail.jsx";
import ReqOrderDetail from "../Pages/ReqOrderDetail/reqOrderDetail.jsx";
import WinOrdersTracking from "../Pages/WinOrdersTracking/winOrdersTracking.jsx";
import Profile from "../Pages/Profile/profile.jsx";
import ProductBidding from "../Pages/ProductBidding/productBidding.jsx";
import AuctionHistory from "../Pages/AuctionHistory/auctionHistory.jsx";
import RequestHistory from "../Pages/RequestHistory/requestHistory.jsx";
import SaleHistory from "../Pages/SaleHistory/saleHistory.jsx";
import AucHistoryDetail from "../Components/AuctionHistoryDetail/aucHistoryDetail.jsx";
import Login from "../Pages/Login/login.jsx";
import Home from "../Pages/Home/home.jsx";

export const NormalRoutes = [
    {path: "/login", element: <Login/>},


]

export const UserRoutes = [
    {path: "/", element: <Home/>},
    {path: "/reqOrderTracking", element: <ReqOrderTracking/>},
    {path:"/winOrderTracking/winOrderDetail", element :<WinOrderDetail/>},
    {path:"/saleHistory/reqOrderDetail", element :<ReqOrderDetail/>},
    {path: "/reqOrderTracking/reqOrderDetail", element: <ReqOrderDetail/>},
    {path: "/reqHistory/reqOrderDetail", element: <ReqOrderDetail/>},
    {path: "/winOrderTracking", element: <WinOrdersTracking/>},
    {path: "/user/profile", element: <Profile/>},
    {path: "/productBid", element: <ProductBidding/>},
    {path: "/auctionHistory", element: <AuctionHistory/>},
    {path: "/reqHistory", element: <RequestHistory/>},
    {path: "/saleHistory", element: <SaleHistory/>},
    {path: "/auctionHistory/auction/:id", element: <AucHistoryDetail/>},
]

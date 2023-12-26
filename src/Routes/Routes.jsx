import ReqOrderTracking from "../Pages/ReqOrderTracking/reqOrderTracking.jsx";
import WinOrderDetail from "../Pages/WinOrderDetail/winOrderDetail.jsx";
import ReqOrderDetail from "../Pages/ReqOrderDetail/reqOrderDetail.jsx";
import WinOrdersTracking from "../Pages/WinOrdersTracking/winOrdersTracking.jsx";
import Home from "../Pages/Home/home.jsx";
import ProductBidding from "../Pages/ProductBidding/productBidding.jsx";
import AuctionHistory from "../Pages/AuctionHistory/auctionHistory.jsx";
import RequestHistory from "../Pages/RequestHistory/requestHistory.jsx";
import SaleHistory from "../Pages/SaleHistory/saleHistory.jsx";



export const NormalRoutes = [
    {path: "/reqOrderTracking", element: <ReqOrderTracking/>},
    {path:"/winOrderDetail", element :<WinOrderDetail/>},
    {path: "/reqOrderDetail", element: <ReqOrderDetail/>},
    {path: "/winOrderTracking", element: <WinOrdersTracking/>},
    {path: "/", element: <Home/>},
    {path: "/productBid", element: <ProductBidding/>},
    {path: "/auctionHistory", element: <AuctionHistory/>},
    {path: "/reqHistory", element: <RequestHistory/>},
    {path: "/saleHistory", element: <SaleHistory/>},


]

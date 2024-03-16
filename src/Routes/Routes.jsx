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
import ReqHistoryDetail from "../Pages/ReqHistoryDetail/reqHistoryDetail.jsx";
import ResultPage from "../Components/ResultPage/resultPage.jsx";
import PageNotFound from "../Components/PageNotFound/pageNotFound.jsx";
import ReturnProduct from "../Pages/ProductReturn/productReturn.jsx";
import CategoriesFilter from "../Pages/CategoriesFilter/categoriesFilter.jsx";
import SellerHome from "../Pages/Seller/sellerHome.jsx";
import ProductDetail from "../Pages/ProductDetail/productDetail.jsx";
import Blog from "../Pages/Blog/blog.jsx";
import BlogDetail from "../Pages/Blog/blogDetail.jsx";


export const NormalRoutes = [
    { path: "/login", element: <Login /> },
  { path: "/", element: <Home /> },
  { path:"/categories/:id", element: <CategoriesFilter /> },
  { path:"/seller/:name", element: <SellerHome /> },
  { path:"/auction/item/:id", element: <ProductDetail /> },
  { path:"/articles/news", element: <Blog /> },
  { path:"/articles/news/:id", element: <BlogDetail /> }

];

export const UserRoutes = [

  { path: "/reqHistory", element: <RequestHistory /> },
  { path: "/reqHistory/reqHistoryDetail/:id", element: <ReqHistoryDetail /> },
  { path: "/winOrderTracking", element: <WinOrdersTracking /> },
  { path: "/winOrderTracking/winOrderDetail/:id", element: <WinOrderDetail /> },
  { path: "/winOrderTracking/winOrderDetail/return/:id", element: <ReturnProduct /> },
  { path: "/user/profile", element: <Profile /> },
  { path: "/saleHistory", element: <SaleHistory /> },
  { path: "/saleHistory/reqOrderDetail/:id", element: <ReqOrderDetail /> },
  { path: "/auctionHistory", element: <AuctionHistory /> },
  { path: "/auctionHistory/auction/:id", element: <AucHistoryDetail /> },
  { path: "/reqOrderTracking", element: <ReqOrderTracking /> },
  { path: "/reqOrderTracking/reqOrderDetail/:id", element: <ReqOrderDetail /> },
  { path: "/productBid", element: <ProductBidding /> },
  { path: "/404", element: <PageNotFound /> },
  { path: "/resultSuccess", element: <ResultPage /> },

];


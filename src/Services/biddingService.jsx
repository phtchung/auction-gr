import privateHttp from "./Http/privateHttp.config.jsx";
import publicHttp from "./Http/publicHttp.config.jsx";

export const getBiddingList = async () => {
  return privateHttp({
    method: "GET",
    url: "/bidding",
  });
};

export const sendAuctionData = async (auctionData) => {
  return privateHttp({
    method: "POST",
    url: "/auction/bid",
    data: auctionData,
  });
};

export const sendAuctionDataOnline = async (auctionData) => {
  return privateHttp({
    method: "POST",
    url: "/auction/online/bid",
    data: auctionData,
  });
};


export const getProductBiddingCount = async (productId) => {
  return privateHttp({
    method: "GET",
    url: `/auction/bidCount/${productId}`,
  });
};

export const sendBuyData = async (auctionData) => {
  return privateHttp({
    method: "POST",
    url: "/auction/buy",
    data: auctionData,
  });
};

export const getSellerHomeData = async (seller) => {
  return publicHttp({
    method: "GET",
    url: `/auction/seller/${seller}`,
  });
};

export const getProductsFilterSellerHome = async (name,params) => {
  return publicHttp({
    method: "GET",
    url: `/home/seller/${name}`,
    params
  });
};


export const getBlogs = async () => {
  return publicHttp({
    method: "GET",
    url: `/articles`,
  });
};

export const FinishAuction = async (auctionData) => {
  return publicHttp({
    method: "POST",
    url: "/auction/finish",
    data: auctionData,
  });
};

export const getBlogDetail = async (Id) => {
  return publicHttp({
    method: "GET",
    url: `/articles/${Id}`,
  });
};


export const getProductPrepareEnd = async () => {
  return publicHttp({
    method: "GET",
    url: `/auction/prepareToEnd`,
  });
};

export const getProductBidding1k = async () => {
  return publicHttp({
    method: "GET",
    url: `/auction/product1k`,
  });
};

export const getProductRare = async () => {
  return publicHttp({
    method: "GET",
    url: `/auction/productRare`,
  });
};

export const getStandOutProducts = async () => {
  return publicHttp({
    method: "GET",
    url: `/auction/standOut`,
  });
};
export const getTopSeller = async () => {
  return publicHttp({
    method: "GET",
    url: `/auction/topSeller`,
  });
};

export const getCategories = async () => {
  return publicHttp({
    method: "GET",
    url: `/categories`,
  });
};

export const getCategoryDetail = async (Id) => {
  return publicHttp({
    method: "GET",
    url: `/category/${Id}`,
  });
};

export const getProductsByCategory = async (id,params) => {
  return publicHttp({
    method: "GET",
    url: `/home/category/${id}`,
    params
  });
};

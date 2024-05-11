import privateHttp from "./Http/privateHttp.config.jsx";
import publicHttp from "./Http/publicHttp.config.jsx";

export const getBiddingList = async (pageParam,keyword) => {
  let url = `/bidding?page=${pageParam}`;
  if (keyword !== undefined) {
    url += `&keyword=${keyword}`;
  }
  return privateHttp({
    method: "GET",
    url: url,
  });
};

export const sendAuctionData = async (auctionData) => {
  return privateHttp({
    method: "POST",
    url: "/auction/bid",
    data: auctionData,
  });
};


export const CheckOutDeposit = async (data) => {
  return privateHttp({
    method: "POST",
    url: "/auction/checkoutDeposit",
    data: data,
  });
};

export const VerifyCodeRoom = async (data) => {
  return privateHttp({
    method: "POST",
    url: "/auction/checkPasswordStreamRoom",
    data: data,
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

export const FinishAuctionOnline = async (auctionData) => {
  return publicHttp({
    method: "POST",
    url: "/auction/online/finish",
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

export const getProductRealTimeHome = async (type,query) => {
  return privateHttp({
    method: "POST",
    url: "/auction/productRealtime",
    data: {
      type,
      query,
    },
  });
};

export const getStreamGeneral = async (type,query) => {
  return privateHttp({
    method: "POST",
    url: "/auction/streamGeneral",
    data: {
      type,
      query,
    },
  });
};


export const getProductStreamHome = async (type,query) => {
  return privateHttp({
    method: "POST",
    url: "/auction/productStream",
    data: {
      type,
      query,
    },
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

export const getCheckOutInfor = async (Id) => {
  return privateHttp({
    method: "GET",
    url: `/checkoutDeposit/${Id}`,
  });
};

export const getConfirmDeposit = async (Id) => {
  return privateHttp({
    method: "GET",
    url: `/getConfirmDeposit/${Id}`,
  });
};

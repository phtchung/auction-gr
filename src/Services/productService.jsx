import privateHttp from "./Http/privateHttp.config.jsx";
import privateHttp1 from "./Http/privateHttp1.config.jsx";

export const getAuctionHistory = async ({ status = "" }) => {
  return privateHttp({
    method: "POST",
    url: "/product/history",
    data: {
      status: status,
    },
  });
};

export const getAuctionHistoryDetail = async (productId) => {
  return privateHttp({
    method: "GET",
    url: `/product/history/${productId}`,
  });
};

export const getWinTrackingData = async (status) => {
  return privateHttp({
    method: "POST",
    url: "/product/winOrderList",
    data: {
      status: status,
    },
  });
};

export const getWinOrderDetail = async (Id) => {
  return privateHttp({
    method: "GET",
    url: `/product/win/${Id}`,
  });
};

export const getWinCount = async () => {
  return privateHttp({
    method: "GET",
    url: `/product/winCount`,
  });
};

export const getReqCount = async () => {
  return privateHttp({
    method: "GET",
    url: `/product/reqCount`,
  });
};
export const getReqTracking = async (status) => {
  return privateHttp({
    method: "POST",
    url: "/product/reqOrderList",
    data: {
      status: status,
    },
  });
};

export const getReqDetail = async (reqId) => {
  return privateHttp({
    method: "GET",
    url: `/product/req/${reqId}`,
  });
};

export const getAuctionProductDetail = async (Id) => {
  return privateHttp({
    method: "GET",
    url: `/auction/item/${Id}`,
  });
};
export const getProductRealTimeDetail = async (Id) => {
  return privateHttp({
    method: "GET",
    url: `/auction/realtime/item/${Id}`,
  });
};

export const getProductStreamDetail = async (Id) => {
  return privateHttp({
    method: "GET",
    url: `/auction/stream/item/${Id}`,
  });
};


export const reviewProduct = async (reviewData) => {
  return privateHttp1({
    method: "POST",
    url: "/user/reviewProduct",
    data: reviewData,
  });
};

export const getReview = async (auction_id) => {
  return privateHttp({
    method: "POST",
    url: "/getReview",
    data: auction_id,
  });
};


export const getRelatedProduct = async (Id) => {
  return privateHttp({
    method: "GET",
    url: `/auction/relatedItem/${Id}`,
  });
};


export const getTopBidListOnlineAuction = async (productId) => {
  return privateHttp({
    method: "GET",
    url: `/auction/topBidList/${productId}`,
  });
};

export const getTopBidListStreamAuction = async (data) => {
  return privateHttp({
    method: "POST",
    url: `/auction/topBidStream`,
    data: data,
  });
};

export const getFullBidListOnlineAuction = async (productId) => {
  return privateHttp({
    method: "GET",
    url: `/auction/fullBidList/${productId}`,
  });
};

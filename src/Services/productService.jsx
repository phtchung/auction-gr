import privateHttp from "./http/privateHttp.config";
import privateHttp1 from "./Http/privateHttp1.config.js";

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

export const reviewProduct = async (reviewData) => {
  return privateHttp1({
    method: "POST",
    url: "/user/reviewProduct",
    data: reviewData,
  });
};

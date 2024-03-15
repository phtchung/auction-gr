import privateHttp from "./Http/privateHttp.config.js";
import publicHttp from "./Http/publicHttp.config.js";

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
  return privateHttp({
    method: "GET",
    url: `/auction/seller/${seller}`,
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

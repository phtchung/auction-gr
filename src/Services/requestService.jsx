import privateHttp from "./http/privateHttp.config";
import privateHttp1 from "./Http/privateHttp1.config.js";

export const getRequestHistory = async (params) => {
  return privateHttp({
    method: "POST",
    url: "/request",
    params,
  });
};

export const getReqHistoryDetail = async (reqId) => {
  return privateHttp({
    method: "GET",
    url: `/request/history/${reqId}`,
  });
};

export const sendRequest = async (request) => {
  return privateHttp1({
    method: "POST",
    url: "/requests",
    data: request,
  });
};

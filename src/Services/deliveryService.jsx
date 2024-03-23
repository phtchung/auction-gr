import privateHttp from "./Http/privateHttp.config.jsx";

export const sendDeliveryInfor = async (dlvInfor) => {
  return privateHttp({
    method: "POST",
    url: `/auction/checkout`,
    data: dlvInfor,
  });
};

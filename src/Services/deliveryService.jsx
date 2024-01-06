import privateHttp from "./Http/privateHttp.config.js";

export const sendDeliveryInfor = async (dlvInfor) => {
    return privateHttp({
        method: 'POST',
        url: `/delivery`,
        data:
        dlvInfor

    })
}

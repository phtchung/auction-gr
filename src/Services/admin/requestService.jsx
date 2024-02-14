import privateHttp from "../Http/privateHttp.config.js";

export const AdminGetReqCount = async () => {
    return privateHttp({
        method: "GET",
        url: `admin/product/reqCount`,
    });
};

export const AdminGetReqTracking = async (status) => {
    return privateHttp({
        method: "POST",
        url: "admin/product/reqList",
        data: {
            status: status,
        },
    });
};

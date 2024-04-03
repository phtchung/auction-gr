import privateHttp from "./Http/privateHttp.config.jsx";

export const getNotify = async (data) => {
    return privateHttp({
        method: "POST",
        url: "/notification",
        data,
    });
};

export const getCountNotify = async (data) => {
    return privateHttp({
        method: "POST",
        url: "/notification/count",
        data,
    });
};

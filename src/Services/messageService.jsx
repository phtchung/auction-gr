import privateHttp from "./Http/privateHttp.config.jsx";

export const getUsersChatSideBar = async () => {
    return privateHttp({
        method: "GET",
        url: `/userSideBar`,
    });
};

export const sendMessage = async (message,id) => {
    return privateHttp({
        method: "POST",
        url: `/api/message/send/${id}`,
        data: message,
    });
};

export const getFullMessages = async (id) => {
    return privateHttp({
        method: "GET",
        url: `/api/messages/${id}`,
    });
};

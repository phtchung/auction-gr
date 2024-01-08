import privateHttp from "./Http/privateHttp.config.js";

export const updateStatus = async ( newState) => {
    return privateHttp({
        method: "POST",
        url: `/product/updateStatus`,
        data: newState

    });
};

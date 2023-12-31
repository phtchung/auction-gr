
import privateHttp from "./http/privateHttp.config";

export const getRequestHistory = async (params ) => {
    return privateHttp({
        method: 'POST',
        url: '/request',
        params

    })
}



import privateHttp from "./http/privateHttp.config";

export const getRequestHistory = async (params ) => {
    return privateHttp({
        method: 'POST',
        url: '/request',
        params

    })
}

export const getReqDetail = async (reqId) =>{
    return  privateHttp({
        method: 'GET',
        url: `/request/${reqId}`,

    })
}


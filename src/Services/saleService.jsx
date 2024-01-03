
import privateHttp from "./http/privateHttp.config";

export const getSaleHistory = async (params ) => {
    return privateHttp({
        method: 'POST',
        url: '/sale/history',
        params

    })
}

// export const getReqDetail = async (reqId) =>{
//     return  privateHttp({
//         method: 'GET',
//         url: `/request/${reqId}`,
//
//     })
// }
//

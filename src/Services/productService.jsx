
import privateHttp from "./http/privateHttp.config";

export const getAuctionHistory = async ({status = ""} ) => {
    return privateHttp({
        method: 'POST',
        url: '/product/history',
        data:{
            status : status
        },

    })
}


export const getAuctionHistoryDetail = async(productId) => {
    return privateHttp({
        method: 'GET',
        url: `/product/history/${productId}`
    })
}


export const getWinTrackingData = async (status ) => {
    return privateHttp({
        method: 'POST',
        url: '/product/winOrderList',
        data:{
            status : status
        },

    })
}

export const getWinOrderDetail = async (Id) =>{
    return  privateHttp({
        method: 'GET',
        url: `/product/win/${Id}`,
    })
}


export const getWinCount = async() => {
    return privateHttp({
        method: 'GET',
        url: `/product/winCount`
    })
}

export const getReqCount = async() => {
    return privateHttp({
        method: 'GET',
        url: `/product/reqCount`
    })
}

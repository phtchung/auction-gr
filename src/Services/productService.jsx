
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

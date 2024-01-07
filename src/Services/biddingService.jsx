import privateHttp from "./Http/privateHttp.config.js";

export const getBiddingList = async ( ) => {
    return privateHttp({
        method: 'GET',
        url: '/bidding',
    })
}

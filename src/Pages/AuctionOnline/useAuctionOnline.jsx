import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {getFullBidListOnlineAuction, getTopBidListOnlineAuction} from "../../Services/productService.jsx";
import {useParams} from "react-router-dom";

export default function useAuctionOnline(state) {
    const {id} = useParams()

    const parseData = useCallback((item) => {
        const list = item?.list?.map((data) => {
            return {
                id: data?._id,
                bid_price:data?.bid_price,
                username:data?.username,
                bid_time:data?.bid_time,
            };
        });
        const product = item?.product
        const highest_price = item?.highest_price

        return { list , product , highest_price };
    }, []);

    const { data, isSuccess, isLoading,isError } = useQuery({
        queryKey: ["getTopBidListOnlineAuction",id],
        queryFn: () => getTopBidListOnlineAuction(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled : !!id,
    });

    const { data: fullList, isSuccess : isSc, isLoading : isLd  } = useQuery({
        queryKey: ["getFullBidListOnlineAuction",id],
        queryFn: () => getFullBidListOnlineAuction(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled : !!id && !!state,
    });

    return {
        fullBidListData : fullList?.list,
        isLd,isSc,
        topBidListData: data?.list,
        productData : data?.product,
        highestPriceData : data?.highest_price,
        isSuccess,
        isLoading,
        isError
    };
}

import {useCallback, useEffect, useState} from "react";
import { useQuery} from "@tanstack/react-query";
import {getFullBidListOnlineAuction, getTopBidListOnlineAuction} from "../../Services/productService.jsx";
import {useParams} from "react-router-dom";
import useAuctionOnlineTracking from "../../zustand/useAuctionOnlineTracking.jsx";

export default function useAuctionOnline(state) {
    const [loading, setLoading] = useState(false);
    const {selectedAuction , bidList , setBidList ,highestPrice,  setHighestPrice } = useAuctionOnlineTracking()
    const [productData, setProductData] = useState({});
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);
    const {id} = useParams()

    useEffect(() => {
        const getBidList = async () => {
            setLoading(true);
            setSuccess(false)
            try {
                const res = await getTopBidListOnlineAuction(id);
                const data = res.data;
                if (data.error) throw new Error(data.error);
                setBidList(data.list);
                setProductData(data.product)
                setHighestPrice(data.highest_price)
            } catch (error) {
                setErr(true)
            } finally {
                setLoading(false);
                setSuccess(true)
            }
        };

        if (id) getBidList();
    }, [id, setBidList]);

    const parseData = useCallback((item) => {
        const list = item?.list?.map((data) => {
            return {
                id: data?._id,
                bid_price:data?.bid_price,
                username:data?.username,
                bid_time:data?.bid_time,
            };
        });
        const highest_price = item?.highest_price
        const product = item?.product

        return { list , product , highest_price  };
    }, []);

    // const { data, isSuccess, isLoading,isError,error } = useQuery({
    //     queryKey: ["getTopBidListOnlineAuction",id],
    //     queryFn: () => getTopBidListOnlineAuction(id),
    //     select: (data) => parseData(data.data),
    //     enabled : !!id,
    // });

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
        bidList,
        productData : productData,
        highestPrice,
        isSuccess : success,
        isLoading : loading,
        isError : err
    };
}

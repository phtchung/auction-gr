import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    formatDateTime,
} from "../../Utils/constant.js";
import {
    getProductBidding1k,
    getProductPrepareEnd,
    getProductRare, getStandOutProducts, getTopSeller
} from "../../Services/biddingService.jsx";

export default function useHome() {

    const parseData = useCallback((item) => {
        const biddingData = item?.map((data) => {
            return {
                product_id: data?._id,
                product_name: data?.product_name,
                final_price: data.final_price ? data.final_price : data.reserve_price ,
                finish_time:formatDateTime(new Date(data?.finish_time)),
                coutdown_time : data?.finish_time,
                main_image : data?.main_image,
                reserve_price : data?.reserve_price,
                flag : data.reserve_price < 1000 ? 1 : 0,
            };
        });
        return { biddingData };
    }, []);

    const parseData1 = useCallback((item) => {

        const topSeller = item?.map((data) => {
            return {
                user_id: data?._id,
                username: data?.username,
                name: data?.name ,
                average_rating : data?.average_rating,
                product_done_count : data?.product_done_count,
                avatar: data?.avatar
            };
        });
        return { topSeller };
    }, []);

    const { data, isSuccess, isLoading, refetch } = useQuery({
        queryKey: ["getProductPrepareEnd"],
        queryFn: () => getProductPrepareEnd(),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
    });

    const {data: products1k, isSuccess: is1dSc, isLoading: is1dLd} = useQuery({
        queryKey: ["getProductBidding1k"],
        queryFn: () => getProductBidding1k(),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
    });

    const {data: productRare, isSuccess: isRareSc, isLoading: isRareLd} = useQuery({
        queryKey: ["getProductRare"],
        queryFn: () => getProductRare(),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
    });


    const {data: topSeller, isSuccess: isTopSc, isLoading: isTopLd} = useQuery({
        queryKey: ["getTopSeller"],
        queryFn: () => getTopSeller(),
        staleTime: 20 * 1000,
        select: (data) => parseData1(data.data),
    });

    const {data: standOutProducts, isSuccess: isStandOutSc, isLoading: isStandOutLd} = useQuery({
        queryKey: ["getStandOutProducts"],
        queryFn: () => getStandOutProducts(),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
    });


    return {
        standOut : standOutProducts?.biddingData,
        isStandOutSc,
        isStandOutLd,
        productsPreEnd: data?.biddingData,
        isSuccess,
        isLoading,
        products1k: products1k?.biddingData,
        refetch,
        is1dSc,
        is1dLd,
        productRare: productRare?.biddingData,
        isRareLd,
        isRareSc,
        topSeller: topSeller?.topSeller,
        isTopLd,
        isTopSc

    };
}

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {formatDateTime} from "../../Utils/constant.js";
import {
    getAuctionProductDetail,
    getFullBidListOnlineAuction,
    getRelatedProduct
} from "../../Services/productService.jsx";
import {getProductBiddingCount} from "../../Services/biddingService.jsx";

export default function useAuctionProductDetail(state) {
    const { id } = useParams();

    const parseData = useCallback((data) => {
        const detail = {
            product_id: data?._id,
            product_name: data?.product_id?.product_name,
            phone: data?.seller_id.phone,
            description: data?.product_id?.description,
            step_price: data?.step_price,
            shipping_fee: data?.shipping_fee,
            sale_price: data?.sale_price,
            reserve_price: data?.reserve_price,
            start_time: formatDateTime(new Date(data?.start_time)),
            finish_time: formatDateTime(new Date(data?.finish_time)),
            final_price: data.final_price ? data.final_price : data?.reserve_price ,
            procedure_complete_time: formatDateTime(
                new Date(data?.delivery?.procedure_complete_time),
            ),
            countdownTime:data?.finish_time,
            seller_user_name:data?.seller_id?.username,
            seller_name : data?.seller_id?.name,
            seller:data?.seller_id,
            average_rating:data?.seller_id?.average_rating?.toFixed(2),
            product_done_count:data?.seller_id?.product_done_count,
            point:data?.seller_id?.point,
            rate_count:data?.seller_id?.rate_count,
            image_list:data?.product_id?.image_list,
            main_image:data?.product_id?.main_image,
            rank: data?.product_id?.rank,
            status: data?.status,
            is_used:data?.product_id?.is_used === 0 ? 'Chưa sử dụng' : 'Đã sử dụng',
            is_used_interger:data?.product_id?.is_used ,
            min_auction_price : data.final_price  ? data.final_price + data?.step_price : data?.reserve_price + data?.step_price,
            brand:data?.product_id?.brand ? data.product_id.brand : 'Không',
            can_return:data?.product_id?.can_return === 0 ? 'Không' : 'Có thể',
            delivery_from:data?.product_id?.delivery_from,
            type_of_auction: data?.type_of_auction === 1 ? 'Đấu giá tăng' : 'Đấu giá giảm',
            category_name: data?.category_id?.name,
            parent : data?.parent,
        };
        return { detail };
    }, []);

    const parseData1 = useCallback((item) => {
        const product = item?.map((data) => {
            return {
                product_id: data?._id,
                product_name: data?.product_id?.product_name,
                reserve_price: data?.reserve_price,
                final_price: data.final_price ? data?.final_price : data?.reserve_price,
                finish_time: formatDateTime(new Date(data?.finish_time)),
                countdownTime: data?.finish_time,
                main_image:data?.product_id?.main_image,
            };
        });

        return { product };
    }, []);

    const parseData2 = useCallback((item) => {
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


    const { data, isSuccess, isLoading,isError,refetch } = useQuery({
        queryKey: ["getAuctionProductDetail", id],
        queryFn: () => getAuctionProductDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id,
    });

    const { data:bidCount, isSuccess:isSc, isLoading:isLd,isError:isErr,refetch:rf } = useQuery({
        queryKey: ["getProductBiddingCount", id],
        queryFn: () => getProductBiddingCount(id),
        staleTime: 20 * 1000,
        enabled: !!id,
    });

    const { data : relatedProducts, isSuccess : sc, isLoading : ld,isError : err} = useQuery({
        queryKey: ["getRelatedProduct", id],
        queryFn: () => getRelatedProduct(id),
        staleTime: 20 * 1000,
        select: (data) => parseData1(data.data),
        enabled: !!id,
    });

    const { data : fullBidListData, isSuccess : isScFullBid, isLoading : isLdFullBid} = useQuery({
        queryKey: ["getFullBidListOnlineAuction",id],
        queryFn: () => getFullBidListOnlineAuction(id),
        staleTime: 20 * 1000,
        select: (data) => parseData2(data.data),
        enabled : !!id && !!state,
    });

    return {
        ralatedPro : relatedProducts?.product,
        sc,ld,err,
        auctionProductData: data?.detail,
        isSuccess,
        isLoading,
        isError,
        refetch,
        bidCount:bidCount?.data?.bidCount,
        isLd,isSc,rf,
        fullBidListData : fullBidListData?.list,
        isScFullBid,
        isLdFullBid
    };
}

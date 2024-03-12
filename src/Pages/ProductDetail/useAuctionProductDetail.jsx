import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../Utils/constant.js";
import {getAuctionProductDetail} from "../../Services/productService.jsx";
import {getProductBiddingCount} from "../../Services/biddingService.jsx";

export default function useAuctionProductDetail() {
    const { id } = useParams();

    const parseData = useCallback((data) => {
        const detail = {
            product_id: data?._id,
            product_name: data?.product_name,
            phone: data?.seller_id.phone,
            description: data?.description,
            step_price: data?.step_price,
            shipping_fee: data?.shipping_fee,
            sale_price: data?.sale_price,
            reserve_price: data?.reserve_price,
            start_time: formatDateTime(new Date(data?.start_time)),
            finish_time: formatDateTime(new Date(data?.finish_time)),
            final_price: data.final_price ? data.final_price : data?.reserve_price ,
            procedure_complete_time: formatDateTime(
                new Date(data?.procedure_complete_time),
            ),
            countdownTime:data?.finish_time,
            seller_user_name:data?.seller_id?.username,
            seller_name:data?.seller_id?.name,
            average_rating:data?.seller_id?.average_rating,
            product_done_count:data?.seller_id?.product_done_count,
            point:data?.seller_id?.point,
            rate_count:data?.seller_id?.rate_count,
            image_list:data?.image_list,
            main_image:data?.main_image,
            rank: data?.rank,
            status: data?.status,
            is_used:data?.is_used === 0 ? 'Chưa sử dụng' : 'Đã sử dụng',
            is_used_interger:data?.is_used ,
            min_auction_price : data.final_price  ? data.final_price + data?.step_price : data?.reserve_price + data?.step_price,
            brand:data?.brand,
            can_return:data?.can_return === 0 ? 'Không' : 'Có thể',
            delivery_from:data?.delivery_from,
            type_of_auction: data?.type_of_auction === 1 ? 'Đấu giá tăng' : 'Đấu giá giảm',
            category_name: data?.category_id?.name,
        };
        return { detail };
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
    return {
        auctionProductData: data?.detail,
        isSuccess,
        isLoading,
        isError,
        refetch,
        bidCount:bidCount?.data?.bidCount,
        isLd,isSc,rf
    };
}

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {formatDateTime} from "../../Utils/constant.js";
import {getProductStreamDetail} from "../../Services/productService.jsx";

export default function useProductStreamDetail() {
    const { id } = useParams();

    const parseData = useCallback((data) => {
        const detail = {
            product_id: data?._id,
            product_name: data?.product_name,
            description: data?.description,
            step_price: data?.step_price,
            shipping_fee: data?.shipping_fee,
            reserve_price: data?.reserve_price,
            start_time: formatDateTime(new Date(data?.start_time)),
            finish_time: formatDateTime(new Date(data?.finish_time)),
            countdownTime:data?.register_time,
            seller_user_name:data?.seller_id?.username,
            seller_name : data?.seller_id?.name,
            seller:data?.seller_id,
            average_rating:data?.seller_id?.average_rating ? data?.seller_id?.average_rating?.toFixed(2) : 0,
            product_done_count:data?.seller_id?.product_done_count ? data?.seller_id?.product_done_count : 0,
            rate_count:data?.seller_id?.rate_count ? data?.seller_id?.rate_count : 0 ,
            image_list:data?.image_list,
            main_image:data?.main_image,
            rank: data?.rank,
            is_used:data?.is_used === 0 ? 'Chưa sử dụng' : 'Đã sử dụng',
            is_used_interger:data?.is_used ,
            brand:data?.brand ? data.brand : 'Không',
            can_return:data?.can_return === 0 ? 'Không' : 'Có thể',
            delivery_from:data?.delivery_from,
            type_of_auction: data?.type_of_auction === 1 ? 'Đấu giá tăng' : 'Đấu giá giảm',
            category_name: data?.category_id?.name,
            parent : data?.parent,
        };
        return { detail };
    }, []);

    const { data, isSuccess, isLoading,isError } = useQuery({
        queryKey: ["getProductStreamDetail", id],
        queryFn: () => getProductStreamDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id,
    });

    return {
        auctionProductData: data?.detail,
        isSuccess,
        isLoading,
        isError,
    };
}

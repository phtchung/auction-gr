import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {formatDateTime} from "../../Utils/constant.js";
import {
    getProductRealTimeDetail,
    getRelatedProduct
} from "../../Services/productService.jsx";

export default function useAuctionRealTimeDetail() {
    const {id} = useParams();

    const parseData = useCallback((data) => {
        const detail = {
            product_id: data?._id,
            product_name: data?.product_id?.product_name,
            description: data?.product_id?.description,
            step_price: data?.step_price,
            shipping_fee: data?.shipping_fee,
            reserve_price: data?.reserve_price,
            start_time: formatDateTime(new Date(data?.start_time)),
            finish_time: formatDateTime(new Date(data?.finish_time)),
            countdownTime: data?.finish_time,
            seller_user_name: data?.seller_id?.username,
            seller_name: data?.seller_id?.name,
            seller: data?.seller_id,
            average_rating: data?.seller_id?.average_rating ? data?.seller_id?.average_rating.toFixed(2) : 0,
            product_done_count: data?.seller_id?.product_done_count ? data?.seller_id?.product_done_count : 0,
            rate_count: data?.seller_id?.rate_count ? data?.seller_id?.rate_count : 0,
            image_list: data?.product_id?.image_list,
            main_image: data?.product_id?.main_image,
            rank: data?.product_id?.rank,
            is_used: data?.product_id?.is_used === 0 ? 'Chưa sử dụng' : 'Đã sử dụng',
            is_used_interger: data?.product_id?.is_used,
            brand: data?.product_id?.brand ? data.product_id?.brand : 'Không',
            can_return: data?.product_id?.can_return === 0 ? 'Không' : 'Có thể',
            delivery_from: data?.product_id?.delivery_from,
            type_of_auction: data?.type_of_auction === 1 ? 'Đấu giá tăng' : 'Đấu giá giảm',
            category_name: data?.category_id?.name,
            parent: data?.parent,
            type : data?.type_of_auction,
        };
        return {detail};
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
                main_image: data?.product_id?.main_image,
            };
        });
        return {product};
    }, []);


    const {data, isSuccess, isLoading, isError} = useQuery({
        queryKey: ["getProductRealTimeDetail", id],
        queryFn: () => getProductRealTimeDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id,
    });

    const {data: relatedProducts, isSuccess: sc, isLoading: ld, isError: isErr} = useQuery({
        queryKey: ["getRelatedProduct", id],
        queryFn: () => getRelatedProduct(id),
        staleTime: 20 * 1000,
        select: (data) => parseData1(data.data),
        enabled: !!id,
    });

    return {
        ralatedPro: relatedProducts?.product,
        sc, ld, isErr,
        auctionProductData: data?.detail,
        isSuccess,
        isLoading,
        isError,

    };
}

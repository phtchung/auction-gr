import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {formatDateTime} from "../../Utils/constant.js";
import {getSellerHomeData} from "../../Services/biddingService.jsx";

export default function useSellerHome() {
    const {name} = useParams();
    const parseData = useCallback((data) => {

        const userData = {
            seller_user_name: data?.user?.username,
            seller_name: data?.user?.name,
            average_rating: data?.user?.average_rating,
            product_done_count: data?.user?.product_done_count,
            point: data?.user?.point,
            rate_count: data?.user?.rate_count,
        };

        const products = data?.products?.map((data) => {
            return {
                product_id: data?._id,
                product_name: data?.product_name,
                reserve_price: data?.reserve_price,
                start_time: formatDateTime(new Date(data?.start_time)),
                finish_time: formatDateTime(new Date(data?.finish_time)),
                final_price: data.final_price ? data?.final_price : data?.reserve_price,
                shipping_fee:data?.shipping_fee,
                countdownTime: data?.finish_time,
                main_image: data?.main_image,
                type_of_auction: data?.type_of_auction === 1 ? 'Đấu giá tăng' : 'Đấu giá giảm',
                bidCount:data?.count,
            };
        });
        return {userData, products};
    }, []);

    const {data, isSuccess, isLoading, isError, refetch} = useQuery({
        queryKey: ["getSellerHomeData", name],
        queryFn: () => getSellerHomeData(name),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!name,
    });


    return {
        sellerHomeData: data?.userData,
        products: data?.products,
        isSuccess,
        isLoading,
        isError,
        refetch,
    };
}

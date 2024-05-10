import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {formatDateTime} from "../../Utils/constant.js";
import { getProductsFilterSellerHome, getSellerHomeData} from "../../Services/biddingService.jsx";
import useQueryString from "../../Hooks/useQueryString.js";

export default function useSellerHome() {
    const {name} = useParams();

    const { queryString, setQueryString } = useQueryString();

    const parseData = useCallback((data) => {

        const userData = {
            seller_user_name: data?.user?.username,
            seller_name: data?.user?.name,
            average_rating: data?.user?.average_rating ? data?.user?.average_rating.toFixed(2) : 0,
            product_done_count: data?.user?.product_done_count ? data?.user?.product_done_count : 0 ,
            rate_count: data?.user?.rate_count ? data?.user?.rate_count : 0 ,
        };
        const total_product = data?.total_product

        return {userData , total_product};
    }, []);

    const parseData1 = useCallback((item) => {

        const products = item?.products?.map((data) => {
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

        const pagination = {
            page: item?.currentPage,
            totalPage: item?.totalPage,
            total:item?.total,
        };

        return {pagination, products };
    }, []);


    const {data, isSuccess, isLoading, isError, refetch} = useQuery({
        queryKey: ["getSellerHomeData", name],
        queryFn: () => getSellerHomeData(name),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!name,
    });

    const { data : data1, isSuccess : isSc, isLoading : isLd } = useQuery({
        queryKey: ["getProductsFilterSellerHome", name,queryString],
        queryFn: () => getProductsFilterSellerHome(name,queryString),
        staleTime: 20 * 1000,
        select: (data) => parseData1(data.data),
        enabled: !!name,
    });

    const handlePageChange = useCallback(
        (e, value) => {
            setQueryString({ ...queryString, page: value });
            window.scrollTo(0, 0);
        },
        [queryString, setQueryString],
    );

    return {
        sellerHomeData: data?.userData,
        products: data1?.products,
        total_product:data?.total_product,
        isSuccess,
        isLoading,
        isLd,isSc,
        isError,
        refetch,
        totalPage: data1?.pagination?.totalPage,
        total:data1?.pagination?.total,
        queryString, setQueryString,handlePageChange,
        currentPage : data1?.pagination?.page,
    };
}

import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getCategoryDetail, getProductsByCategory} from "../../Services/biddingService.jsx";
import { formatDateTime} from "../../Utils/constant.js";
import useQueryString from "../../Hooks/useQueryString.js";

export default function useCategoryDetail() {
    const {id} = useParams()

    const { queryString, setQueryString } = useQueryString();

    const parseData = useCallback((data) => {
        const category = {
            cate_id: data._id,
            name: data?.name,
            child: data?.children,
        };
        return { category };
    }, []);


    const parseData1 = useCallback((item) => {
        const product = item?.products.map((data) => {
            return {
                product_id: data?._id,
                shipping_fee:data?.shipping_fee,
                product_name: data?.product_name,
                reserve_price: data?.reserve_price,
                final_price: data.final_price ? data?.final_price : data?.reserve_price,
                finish_time: formatDateTime(new Date(data?.finish_time)),
                countdownTime: data?.finish_time,
                main_image:data?.main_image,
                bidCount:data?.count,
            };
        });

        const pagination = {
            page: item?.currentPage,
            totalPage: item?.totalPage,
            total:item?.total,
        };

        return {pagination, product };
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getCategoryDetail", id],
        queryFn: () => getCategoryDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id,
    });

    const { data : data1, isSuccess : isSc, isLoading : isLd } = useQuery({
        queryKey: ["getProductsByCategory", id,queryString],
        queryFn: () => getProductsByCategory(id,queryString),
        staleTime: 20 * 1000,
        select: (data) => parseData1(data.data),
        enabled: !!id,
    });

    const handlePageChange = useCallback(
        (e, value) => {
            setQueryString({ ...queryString, page: value });
            window.scrollTo(0, 0);
        },
        [queryString, setQueryString],
    );

    return {
        products:data1?.product,
        category: data?.category,
        isSuccess,
        handlePageChange,
        isLoading,
        isLd,isSc,
        totalPage: data1?.pagination?.totalPage,
        total:data1?.pagination?.total,
        queryString, setQueryString,
        currentPage : data1?.pagination?.page,
    };
}

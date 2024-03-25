import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getCategoryDetail, getProductsByCategory} from "../../Services/biddingService.jsx";
import { formatDateTime, formatNumber} from "../../Utils/constant.js";

export default function useCategoryDetail() {
    const {id} = useParams()

    const parseData = useCallback((data) => {
        const category = {
            cate_id: data._id,
            name: data?.name,
            child: data?.children,
        };
        return { category };
    }, []);


    const parseData1 = useCallback((item) => {
        const product = item?.map((data) => {
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

        return { product };
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getCategoryDetail", id],
        queryFn: () => getCategoryDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id,
    });

    const { data : data1, isSuccess : isSc, isLoading : isLd } = useQuery({
        queryKey: ["getProductsByCategory", id],
        queryFn: () => getProductsByCategory({id : id}),
        staleTime: 20 * 1000,
        select: (data) => parseData1(data.data),
        enabled: !!id,
    });

    return {
        products:data1?.product,
        category: data?.category,
        isSuccess,
        isLoading,
        isLd,isSc
    };
}

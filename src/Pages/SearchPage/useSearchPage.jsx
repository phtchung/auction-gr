import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import { getSerachProducts} from "../../Services/biddingService.jsx";
import { formatDateTime} from "../../Utils/constant.js";
import useQueryString from "../../Hooks/useQueryString.js";

export default function useSearchPage() {

    const { queryString, setQueryString } = useQueryString();

    const parseData1 = useCallback((item) => {
        const product = item?.products.map((data) => {
            return {
                product_id: data?._id,
                shipping_fee:data?.shipping_fee,
                product_name: data?.product_id?.product_name,
                reserve_price: data?.reserve_price,
                final_price: data.final_price ? data?.final_price : data?.reserve_price,
                finish_time: formatDateTime(new Date(data?.finish_time)),
                countdownTime: data?.finish_time,
                main_image:data?.product_id?.main_image,
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


    const { data : data1, isSuccess : isSc, isLoading : isLd, isError : isEr } = useQuery({
        queryKey: ["getSerachProducts",queryString],
        queryFn: () => getSerachProducts(queryString),
        staleTime: 20 * 1000,
        select: (data) => parseData1(data.data),
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
        isEr,
        handlePageChange,
        isLd,isSc,
        totalPage: data1?.pagination?.totalPage,
        total:data1?.pagination?.total,
        queryString, setQueryString,
        currentPage : data1?.pagination?.page,
    };
}

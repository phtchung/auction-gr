import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProductStreamHome} from "../../Services/biddingService.jsx";
import useQueryString from "../../Hooks/useQueryString.js";
import {reqConvertType} from "../../Utils/constant.js";

export default function useAuctionStreamHome() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { queryString, setQueryString } = useQueryString();

    const [type, setType] = useState(
        reqConvertType(searchParams.get("type"))
    );

    const parseData = useCallback((item) => {
        const realTimeData = item?.products?.map((data) => {
            return {
                product_id: data?._id,
                product_name: data?.product_name,
                register : data?.register,
                main_image : data?.main_image,
            };
        });

        const pagination = {
            page: item?.currentPage,
            totalPage: item?.totalPage,
            total:item?.total,
        };

        return { realTimeData , pagination};
    }, []);

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getProductStreamHome",type,queryString],
        queryFn: () => getProductStreamHome(type,queryString),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!type,
    });

    const handlePageChange = useCallback(
        (e, value) => {
            setQueryString({ ...queryString, page: value });
            window.scrollTo(0, 0);
        },
        [queryString, setQueryString],
    );

    return {
        data : data?.realTimeData,
        isSuccess,
        isLoading,
        type,
        setType,
        totalPage: data?.pagination?.totalPage,
        total:data?.pagination?.total,
        queryString, setQueryString,handlePageChange,
        currentPage : data?.pagination?.page,
    };
}

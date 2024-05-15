import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStreamGeneral} from "../../Services/biddingService.jsx";
import useQueryString from "../../Hooks/useQueryString.js";
import {formatDateTime, reqConvertType} from "../../Utils/constant.js";

export default function useStreamGeneral() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { queryString, setQueryString } = useQueryString();

    const [type, setType] = useState(
        reqConvertType(searchParams.get("type"))
    );

    const parseData = useCallback((item) => {
        const streamAuctionGeneral = item?.products?.map((data) => {
            return {
                product_id: data?._id,
                product_name: data?.product_id?.product_name,
                coutdown_time : data?.finish_time,
                main_image : data?.product_id?.main_image,
                room : data?.room_id
            };
        });

        const pagination = {
            page: item?.currentPage,
            totalPage: item?.totalPage,
            total:item?.total,
        };

        return { streamAuctionGeneral , pagination};
    }, []);

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getStreamGeneral",type,queryString],
        queryFn: () => getStreamGeneral(type,queryString),
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
        data : data?.streamAuctionGeneral,
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

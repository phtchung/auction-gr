import {useCallback, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {
    colAuctionWin,
    colCompletion,
    colDlvWait,
    colWinCancel, colWinReturn,
    formatDateTime, formatMoney,
    processStatus,
} from "../../Utils/constant.js";
import {useSearchParams} from "react-router-dom";
import {
    getWinCount,
    getWinTrackingData,
} from "../../Services/productService.jsx";

export default function useWinOrdersTracking() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState(
        processStatus(parseInt(searchParams.get("status"))),
    );

    const parseData = useCallback((item) => {
        const winTrackingData = item?.winOrderList?.map((data) => {
            return {
                product_id: data?._id,
                product_name: data?.product_id?.product_name,
                rank: data?.product_id?.rank,
                status: data?.status,
                status_word: data?.status === 9 ? 'Yêu cầu trả hàng' : data?.status === 14 ? 'Trả hàng thành công' : 'Từ chối trả hàng',
                createdAt: formatDateTime(new Date(data?.createdAt)),
                reserve_price: formatMoney(data?.reserve_price),
                final_price: formatMoney(data?.final_price),
                victory_time: formatDateTime(new Date(data?.victory_time)),
                total_price: formatMoney(data?.final_price + data?.shipping_fee),
                completed_time: formatDateTime(
                    new Date(data?.delivery?.completed_time),
                ),
                cancel_time : formatDateTime(data?.cancel_time),
            };
        });

        const colTrackingData =
            item.status === 4
                ? colAuctionWin
                : item.status === 567
                    ? colDlvWait
                    : item.status === 8
                        ? colCompletion
                        : item.status === 11
                            ? colWinCancel
                            : colWinReturn;

        return {winTrackingData, colTrackingData};
    }, []);

    const {
        data,
        isSuccess,
        isLoading,
        refetch: refetch1,
    } = useQuery({
        queryKey: ["getWinTracking", status],
        queryFn: () => getWinTrackingData(status),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!status,
    });

    const {
        data: winCount,
        isSuccess: isScCount,
        isLoading: isLdCount,
        refetch,

    } = useQuery({
        queryKey: ["getWinCount"],
        queryFn: () => getWinCount(),
        staleTime: 20 * 1000,
    });


    return {
        winTrackingData: data?.winTrackingData,
        colData: data?.colTrackingData,
        isSuccess,
        isLoading,
        winCount: winCount?.data,
        isScCount,
        isLdCount,
        status,
        setStatus,
        refetch,
        refetch1,
    };
}

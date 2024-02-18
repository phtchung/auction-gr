import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
     adminProductStatus, approvedColumns, biddingColumns,
    formatDateTime, newReqColumns, rejectColumns,
} from "../../../Utils/constant.js";
import { useSearchParams } from "react-router-dom";
import {
    AdminGetBiddingCount,
    AdminGetBiddingTracking,
} from "../../../Services/admin/requestService.jsx";

export default function useAdminBiddingTracking() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState(
        adminProductStatus(searchParams.get("status")),
    );
    console.log(status)

    const parseData = useCallback((item) => {
        const adminBidData = item?.adminBiddingList?.map((data) => {
            return {
                request_id : data?._id,
                product_name: data?.product_name,
                status: data?.status,
                createdAt: formatDateTime(new Date(data?.createdAt)),
                reserve_price: data?.reserve_price,
                sale_price:data?.sale_price,
                final_price: data?.final_price,
                seller_name:data?.seller_id?.username,
                phone: data?.seller_id?.phone,
                start_time:formatDateTime(new Date(data?.start_time)),
                finish_time:formatDateTime(new Date(data?.finish_time)),
                victory_time: formatDateTime(new Date(data?.victory_time)),
                total_price: data?.final_price + data?.shipping_fee,
                completed_at: formatDateTime(
                    new Date(data?.product_delivery?.completed_at),
                ),
            };
        });

        const colTrackingData =
            item.status === 1
                ? newReqColumns
                : item.status === 2
                    ? approvedColumns
                    : item.status === 3
                        ? biddingColumns
                        : item.status === 11
                            ? rejectColumns
                            : rejectColumns;

        return { adminBidData, colTrackingData };
    }, []);

    const {
        data, isSuccess, isLoading, refetch: refetch1,} = useQuery({
        queryKey: ["AdminGetBiddingTracking", status],
        queryFn: () => AdminGetBiddingTracking(status),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!status,
    });

    const {
        data: AdminBidCount, isSuccess: isScCount, isLoading: isLdCount, refetch,} = useQuery({
        queryKey: ["AdminGetBiddingCount"],
        queryFn: () => AdminGetBiddingCount(),
        staleTime: 20 * 1000,
    });


    return {
        data: data?.adminBidData,
        columns: data?.colTrackingData,
        isSuccess,
        isLoading,
        adminBidCount: AdminBidCount?.data,
        isScCount,
        isLdCount,
        status,
        setStatus,
        refetch,
        refetch1,
    };
}

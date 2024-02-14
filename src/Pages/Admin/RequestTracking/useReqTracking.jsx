import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    adminProcessStatus, approvedColumns, biddingColumns,
    colWinCancel,
    formatDateTime, newReqColumns, rejectColumns,
} from "../../../Utils/constant.js";
import { useSearchParams } from "react-router-dom";
import {AdminGetReqCount, AdminGetReqTracking} from "../../../Services/admin/requestService.jsx";

export default function useAdminRequestTracking() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState(
        adminProcessStatus(parseInt(searchParams.get("status"))),
    );

    const parseData = useCallback((item) => {
        const adminReqData = item?.adminRequestList?.map((data) => {
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

        return { adminReqData, colTrackingData };
    }, []);

    const {
        data,
        isSuccess,
        isLoading,
        refetch: refetch1,
    } = useQuery({
        queryKey: ["adminGetRequestTracking", status],
        queryFn: () => AdminGetReqTracking(status),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!status,
    });

    const {
        data: AdminReqCount,
        isSuccess: isScCount,
        isLoading: isLdCount,
        refetch,

    } = useQuery({
        queryKey: ["adminGetRequestCount"],
        queryFn: () => AdminGetReqCount(),
        staleTime: 20 * 1000,
    });


    return {
        data: data?.adminReqData,
        columns: data?.colTrackingData,
        isSuccess,
        isLoading,
        adminReqCount: AdminReqCount?.data,
        isScCount,
        isLdCount,
        status,
        setStatus,
        refetch,
        refetch1,
    };
}

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  convertStatusToData,
  formatDateTime,
  reqConvertStatus,
} from "../../Utils/constant.js";
import { useSearchParams } from "react-router-dom";
import { getReqCount, getReqTracking } from "../../Services/productService.jsx";

export default function useReqOrderTracking() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState(
    reqConvertStatus(parseInt(searchParams.get("status"))),
  );

  const parseData = useCallback((item) => {
    const reqTrackingData = item?.reqOrderList?.map((data) => {
      return {
        product_id: data?._id,
        product_name: data?.product_name,
        rank: data?.rank,
        status: data?.status,
        request_time: formatDateTime(new Date(data?.createdAt)),
        reserve_price: data?.reserve_price + " VND",
        sale_price: data?.sale_price + " VND",
        final_price: data?.final_price + " VND",
        status_string:data?.status === 3 ? 'Đang đấu giá' : data?.status === 4 ? 'Chờ thông tin giao hàng' : data?.status === 9 ? 'Yêu cầu trả hàng ' : data?.status === 14 ? 'Duyệt yêu cầu trả hàng' : 'Từ chối yêu cầu trả hàng',
        start_time:formatDateTime(new Date(data?.start_time)),
        finish_time:formatDateTime(new Date(data?.finish_time)),
        return_time:formatDateTime(new Date(data?.product_delivery?.return_time)),
        // cancel_time:formatDateTime(new Date(data?.updatedAt)),
        victory_time: formatDateTime(new Date(data?.victory_time)),
        reject_time: formatDateTime(new Date(data?.reject_time)),
        total_price: data?.final_price + data?.shipping_fee + " VND",
        completed_time: formatDateTime(
          new Date(data?.product_delivery?.completed_time),
        ),
        shipping_fee:data?.shipping_fee,
        phone:data?.product_delivery?.phone,
        address:data?.product_delivery?.address,
        request_id: data?._id,
      };
    });

    const colTrackingData = convertStatusToData(item.status);

    return { reqTrackingData, colTrackingData };
  }, []);

  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["getReqTracking", status],
    queryFn: () => getReqTracking(status),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!status,
  });

  const {
    data: reqCount,
    isSuccess: isScCount,
    isLoading: isLdCount,
    refetch: refetch1,
  } = useQuery({
    queryKey: ["getReqCount"],
    queryFn: () => getReqCount(),
    staleTime: 20 * 1000,
  });

  return {
    reqTrackingData: data?.reqTrackingData,
    colData: data?.colTrackingData,
    isSuccess,
    isLoading,
    reqCount: reqCount?.data,
    refetch,
    refetch1,
    isScCount,
    isLdCount,
    status,
    setStatus,
  };
}

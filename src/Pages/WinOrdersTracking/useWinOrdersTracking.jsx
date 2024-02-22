import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  colAuctionWin,
  colCompletion,
  colDlvWait,
  colWinCancel,
  formatDateTime,
  processStatus,
} from "../../Utils/constant.js";
import { useSearchParams } from "react-router-dom";
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
    console.log("item", item);
    const winTrackingData = item?.winOrderList?.map((data) => {
      return {
        product_id: data?._id,
        product_name: data?.product_name,
        rank: data?.rank,
        status: data?.status,
        status_word:data?.status === 9 ? 'Trả hàng' : 'Hủy',
        createdAt: formatDateTime(new Date(data?.createdAt)),
        reserve_price: data?.reserve_price,
        final_price: data?.final_price,
        victory_time: formatDateTime(new Date(data?.victory_time)),
        total_price: data?.final_price + data?.shipping_fee,
        completed_time: formatDateTime(
          new Date(data?.completed_time),
        ),
      };
    });

    const colTrackingData =
      item.status === 4
        ? colAuctionWin
        : item.status === 567
          ? colDlvWait
          : item.status === 8
            ? colCompletion
            : item.status === 9
              ? colWinCancel
              : colWinCancel;

    return { winTrackingData, colTrackingData };
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

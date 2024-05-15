import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuctionHistory } from "../../Services/productService.jsx";
import {formatDateTime1, formatMoney} from "../../Utils/constant.js";

export default function useAuctionHistory() {
  const parseData = useCallback((item) => {
    const aucHis = item?.map((data) => {
      return {
        id: data?._id,
        seller_name: data?.seller_id?.name,
        product_name: data?.product_id?.product_name,
        rank: data?.product_id?.rank,
        reserve_price:formatMoney( data?.reserve_price),
        final_price:formatMoney( data?.final_price),
        completed_time: data?.delivery?.completed_time,
        main_image:data?.product_id?.main_image,
        is_review:data?.is_review,
        review_before:formatDateTime1(data?.review_before),
      };
    });

    return { aucHis };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAuctionHistory"],
    queryFn: () => getAuctionHistory({ status: "8" }),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
  });

  return {
    aucHistoryData: data?.aucHis,
    isSuccess,
    isLoading,
  };
}

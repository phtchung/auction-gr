import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime, formatNumber } from "../../Utils/constant.js";
import { getBiddingList } from "../../Services/biddingService.jsx";

export default function useProductBidding() {
  const parseData = useCallback((item) => {
    const biddingList = item?.map((data) => {
      return {
        product_id: data?._id,
        product_name: data?.product_name,
        rank: data?.rank,
        bidder: data?.bidder,
        bid_price: formatNumber(data?.bid_price),
        start_time: formatDateTime(new Date(data?.start_time)),
        reserve_price: formatNumber(data?.reserve_price),
        finish_time: formatDateTime(new Date(data?.finish_time)),
        seller_name: data?.seller_id?.name,
        avr_rating: data?.seller_id?.average_rating,
        main_image:data?.main_image,
      };
    });

    return { biddingList };
  }, []);

  const {
    data,
    isSuccess,
    isLoading,
    refetch: refetch1,
  } = useQuery({
    queryKey: ["getBiddingList"],
    queryFn: () => getBiddingList(),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
  });

  return {
    biddingList: data?.biddingList,
    isSuccess,
    isLoading,
    refetch1,
  };
}

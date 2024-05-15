import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../Utils/constant.js";
import { getReqHistoryDetail } from "../../Services/requestService.jsx";

export default function useReqHistoryDetail() {
  const { id } = useParams();

  const parseData = useCallback((data) => {
    const detail = {
      request_id: data?._id,
      product_name: data?.product_id?.product_name,
      description: data?.product_id?.description,
      step_price: data?.step_price,
      shipping_fee: data?.shipping_fee,
      sale_price: data?.sale_price,
      reserve_price: data?.reserve_price,
      brand:data?.product_id?.brand,
      is_used:data?.product_id?.is_used === 1 ? 'Đã sử dụng' : 'Chưa sử dụng',
      can_return:data?.product_id?.can_return === 0 ? 'Không' : 'Có thể',
      createdAt: formatDateTime(new Date(data?.createdAt)),
      approved_time: formatDateTime(new Date(data?.updatedAt)),
      reject_time: formatDateTime(new Date(data?.reject_time)),
      request_time: formatDateTime(new Date(data?.createdAt)),
      start_time: formatDateTime(new Date(data?.start_time)),
      finish_time: formatDateTime(new Date(data?.finish_time)),
      image_list:data?.product_id?.image_list,
      main_image:data?.product_id?.main_image,
      delivery_from:data?.product_id?.delivery_from,
      category_name:data?.category_id?.name,
      rank: data?.product_id?.rank,
      status: data?.status,
      type_of_auction: data?.type_of_auction,
      auction_live : data?.auction_live === 0 ? 'Đấu giá thông thường' : 'Đấu giá trực tuyến'
    };
    return { detail };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getReqHistoryDetail", id],
    queryFn: () => getReqHistoryDetail(id),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!id,
  });

  return {
    reqData: data?.detail,
    isSuccess,
    isLoading,
  };
}

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getReqDetail } from "../../Services/productService.jsx";
import { formatDateTime } from "../../Utils/constant.js";

export default function useReqOrderDetail() {
  const { id } = useParams();

  const [searchParam, setSearchParam] = useSearchParams();
  const status = searchParam.get("status");

  const parseData = useCallback((data) => {
    const detail = {
      request_id: data?._id,
      product_name: data?.product_id?.product_name,
      description: data?.product_id?.description,
      step_price: data?.step_price,
      shipping_fee: data?.shipping_fee,
      sale_price: data?.sale_price,
      reserve_price: data?.reserve_price,
      final_price: data?.final_price,
      deliData: data?.delivery,
      category_name: data?.category_id?.name,
      victory_time: formatDateTime(new Date(data?.victory_time)),
      createdAt: formatDateTime(new Date(data?.createdAt)),
      approved_time: formatDateTime(new Date(data?.createdAt)),
      start_time: formatDateTime(new Date(data?.start_time)),
      finish_time: formatDateTime(new Date(data?.finish_time)),
      request_time: formatDateTime(new Date(data?.request_time)),
      return_time: formatDateTime(new Date(data?.delivery?.return_time)),
      completed_time: formatDateTime(new Date(data?.delivery?.completed_time)),
      seller_name:data?.seller_id?.name,
      seller_phonne : data?.seller_id?.phone,
      winner : data?.winner_id,
      image_list:data?.product_id?.image_list,
      main_image:data?.product_id?.main_image,
      is_used:data?.product_id?.is_used === 0 ? 'Chưa sử dụng' : 'Đã sử dụng',
      brand:data?.product_id?.brand,
      can_return:data?.product_id?.can_return === 0 ? 'Không' : 'Có thể',
      delivery_from:data?.product_id?.delivery_from,
      return_reason: data?.delivery?.return_reason,
      return_image:data?.delivery?.return_image_list,
      rank: data?.product_id?.rank,
      status: data?.status,
      reason:data?.reason,
      reject_time: formatDateTime(new Date(data?.reject_time)),
      type_of_auction: data?.type_of_auction,
    };
    return { detail };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getReqDetail", id, status],
    queryFn: () => getReqDetail(id, status),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!id && !!status,
  });

  return {
    reqData: data?.detail,
    isSuccess,
    isLoading,
  };
}

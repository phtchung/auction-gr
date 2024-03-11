import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../Utils/constant.js";
import { getWinOrderDetail } from "../../Services/productService.jsx";

export default function useWinOrderDetail() {
  const { id } = useParams();

  const parseData = useCallback((data) => {
    const detail = {
      product_id: data?._id,
      product_name: data?.product_name,
      name: data?.seller_id.name,
      phone: data?.seller_id.phone,
      description: data?.description,
      step_price: data?.step_price,
      shipping_fee: data?.shipping_fee,
      sale_price: data?.sale_price,
      reserve_price: data?.reserve_price,
      createdAt: formatDateTime(new Date(data?.createdAt)),
      start_time: formatDateTime(new Date(data?.start_time)),
      finish_time: formatDateTime(new Date(data?.finish_time)),
      victory_time: formatDateTime(new Date(data?.victory_time)),
      return_time: formatDateTime(new Date(data?.product_delivery?.return_time)),
      final_price: data?.final_price,
      procedure_complete_time: formatDateTime(
        new Date(data?.procedure_complete_time),
      ),
      image_list:data?.image_list,
      main_image:data?.main_image,
      total_price: data?.final_price + data?.shipping_fee,
      rank: data?.rank,
      return_reason:data?.product_delivery?.return_reason,
      receiver: data?.product_delivery?.name,
      phone_receiver: data?.product_delivery?.phone,
      address: data?.product_delivery?.address,
      note: data?.product_delivery?.note,
      status: data?.status,
      is_used:data?.is_used === 0 ? 'Chưa sử dụng' : 'Đã sử dụng',
      brand:data?.brand,
      can_return:data?.can_return === 0 ? 'Không' : 'Có thể',
      delivery_from:data?.delivery_from,
      completed_time: formatDateTime(new Date(data?.product_delivery?.completed_time)),
      confirm_time: formatDateTime(new Date(data?.product_delivery?.confirm_time)),
      delivery_start_time: formatDateTime(new Date(data?.product_delivery?.delivery_start_time)),
      type_of_auction: data?.type_of_auction,
      category_name: data?.category_id?.name,
    };
    return { detail };
  }, []);

  const { data, isSuccess, isLoading,isError } = useQuery({
    queryKey: ["getWinOrderDetail", id],
    queryFn: () => getWinOrderDetail(id),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!id,
  });

  return {
    winDetailData: data?.detail,
    isSuccess,
    isLoading,
    isError
  };
}

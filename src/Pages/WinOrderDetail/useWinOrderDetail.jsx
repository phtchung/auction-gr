import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {converReason, formatDateTime} from "../../Utils/constant.js";
import { getWinOrderDetail } from "../../Services/productService.jsx";

export default function useWinOrderDetail() {
  const { id } = useParams();

  const parseData = useCallback((data) => {
    const detail = {
      product_id: data?._id,
      product_name: data?.product_id?.product_name,
      name: data?.seller_id.name,
      username : data?.seller_id?.username,
      description: data?.product_id?.description,
      step_price: data?.step_price,
      shipping_fee: data?.shipping_fee,
      sale_price: data?.sale_price,
      reserve_price: data?.reserve_price,
      createdAt: formatDateTime(data?.createdAt),
      start_time: formatDateTime(data?.start_time),
      finish_time: formatDateTime(data?.finish_time),
      victory_time: formatDateTime(data?.victory_time),
      return_time: formatDateTime(data?.delivery?.return_time),
      approve_return_time : formatDateTime(data?.delivery?.approve_return_time),
      deny_return_time : formatDateTime(data?.delivery?.deny_return_time),
      final_price: data?.final_price,
      procedure_complete_time: formatDateTime(
        data?.delivery?.procedure_complete_time),
      image_list:data?.product_id?.image_list,
      main_image:data?.product_id?.main_image,
      total_price:data?.auction_live !== 2 ? data?.final_price + data?.shipping_fee : data?.final_price - data.deposit_price + data?.shipping_fee ,
      rank: data?.product_id?.rank,
      return_reason:data?.delivery?.return_reason,
      return_reasonQuick:converReason(data?.delivery?.return_reasonQuick),
      return_image:data?.delivery?.return_image_list,
      receiver: data?.delivery?.name,
      phone_receiver: data?.delivery?.phone,
      address: data?.delivery?.address,
      note: data?.delivery?.note,
      status: data?.status,
      is_used:data?.product_id?.is_used === 0 ? 'Chưa sử dụng' : 'Đã sử dụng',
      brand:data?.product_id?.brand ? data.product_id.brand : 'Không',
      can_return:data?.product_id?.can_return === 0 ? 'Không' : 'Có thể',
      delivery_from:data?.product_id?.delivery_from,
      completed_time: formatDateTime(data?.delivery?.completed_time),
      confirm_time: formatDateTime(data?.delivery?.confirm_time),
      delivery_start_time: formatDateTime(data?.delivery?.delivery_start_time),
      type_of_auction: data?.type_of_auction,
      category_name: data?.category_id?.name,
      auction_live : data?.auction_live,
      deposit_price : data?.deposit_price,
      cancel_time : formatDateTime(data?.cancel_time),
      payment : data?.delivery?.payment_method,
      is_review :  data?.is_review,
      updatedAt : data?.updatedAt,
      review_time : data?.status === 8 && data?.is_review === 1 ? '' : data?.updatedAt
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

import {useCallback} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams} from "react-router-dom";
import {formatDateTime} from "../../Utils/constant.js";
import {getWinOrderDetail} from "../../Services/productService.jsx";

export default function useWinOrderDetail(){

    const {id} = useParams()


    const parseData = useCallback((data) => {

        const detail = {
            product_id: data?._id,
            product_name: data?.product_name,
            description: data?.description,
            step_price: data?.step_price,
            shipping_fee:data?.shipping_fee,
            sale_price:data?.sale_price,
            reserve_price: data?.reserve_price,
            createdAt: formatDateTime(new Date(data?.createdAt)),
            start_time: formatDateTime(new Date(data?.start_time)),
            finish_time: formatDateTime(new Date(data?.finish_time)),
            victory_time: formatDateTime(new Date(data?.victory_time)),
            final_price: data?.final_price,
            procedure_complete_time:formatDateTime(new Date(data?.procedure_complete_time)),
            total_price : data?.final_price + data?.shipping_fee,
            rank: data?.rank,
            status: data?.status,
            type_of_auction:data?.type_of_auction,
        }
        return { detail };
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['getWinOrderDetail', id],
        queryFn: () => getWinOrderDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id ,
    });

    return {
        winDetailData: data?.detail,
        isSuccess,
        isLoading,

    };
}

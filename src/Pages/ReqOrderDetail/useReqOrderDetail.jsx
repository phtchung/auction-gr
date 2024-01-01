import {useCallback} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams} from "react-router-dom";
import {getReqDetail} from "../../Services/requestService.jsx";
import {formatDateTime} from "../../Utils/constant.js";

export default function useReqOrderDetail(){

    const {id} = useParams()


    const parseData = useCallback((data) => {

        const detail = {
            id: data?._id,
            product_name: data?.product_name,
            description: data?.description,
            step_price: data?.step_price,
            shipping_fee:data?.shipping_fee,
            sale_price:data?.sale_price,
            reserve_price: data?.reserve_price,
            createdAt: formatDateTime(new Date(data?.createdAt)),
            start_time: formatDateTime(new Date(data?.start_time)),
            finish_time: formatDateTime(new Date(data?.finish_time)),
            rank: data?.rank,
            status: data?.status,
            type_of_auction:data?.type_of_auction,
        }
        return { detail };
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['getReqDetail', id],
        queryFn: () => getReqDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id ,
    });

    return {
        reqData: data?.detail,
        isSuccess,
        isLoading,

    };
}

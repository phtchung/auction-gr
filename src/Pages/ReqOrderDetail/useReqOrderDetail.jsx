import {useCallback} from 'react';
import { useQuery } from '@tanstack/react-query';
import {useParams, useSearchParams} from "react-router-dom";
import {getReqDetail} from "../../Services/productService.jsx";
import {formatDateTime} from "../../Utils/constant.js";

export default function useReqOrderDetail(){

    const {id} = useParams()

    const [searchParam,setSearchParam] = useSearchParams();
    const status = searchParam.get('status')

    const parseData = useCallback((data) => {

        const detail = {
            request_id: data?._id,
            product_name: data?.product_name,
            description: data?.description,
            step_price: data?.step_price,
            shipping_fee:data?.shipping_fee,
            sale_price:data?.sale_price,
            reserve_price: data?.reserve_price,
            final_price:data?.final_price,
            deliData:data?.product_delivery,
            category_name: data?.category_id?.name,
            victory_time : formatDateTime(new Date(data?.victory_time)),
            createdAt: formatDateTime(new Date(data?.createdAt)),
            start_time: formatDateTime(new Date(data?.start_time)),
            finish_time: formatDateTime(new Date(data?.finish_time)),
            request_time:formatDateTime(new Date(data?.request_id?.createdAt)),
            rank: data?.rank,
            status: data?.status,
            type_of_auction:data?.type_of_auction,
        }
        return { detail };
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['getReqDetail', id,status],
        queryFn: () => getReqDetail(id,status),
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

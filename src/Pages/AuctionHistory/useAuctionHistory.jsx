import {useCallback} from 'react';
import { useQuery } from '@tanstack/react-query';

import {getAuctionHistory} from "../../Services/productService.jsx";

export default function useAuctionHistory(){

    const parseData = useCallback((item) => {
        const aucHis = item?.map((data) => {
            return {
                id: data._id,
                seller_name: data.seller_name,
                product_name:data.product_name,
                rank:data.rank,
                reserve_price:data.reserve_price,
                final_price:data.final_price,
                completed_at:data.completed_at,
            };
        })

        return { aucHis };
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['getAuctionHistory'],
        queryFn: () => getAuctionHistory({status:'8'}),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data)
    });



    return {
        aucHistoryData: data?.aucHis,
        isSuccess,
        isLoading,
    };
}

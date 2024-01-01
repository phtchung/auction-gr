import {useCallback, useState} from 'react';
import { useQuery } from '@tanstack/react-query';

import {getRequestHistory} from "../../Services/requestService.jsx";
import {formatDateTime} from "../../Utils/constant.js";

export default function useRequestHistory(){

    const currentDateTime = new Date();
    const [finish_time,setFinishTime ] = useState(new Date(currentDateTime.setHours(0, 0, 0, 0)).toISOString());
    const [start_time, setStartTime] = useState(() => {
        const sevenDaysAgo = new Date(currentDateTime);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        return sevenDaysAgo.toISOString();
    });

    const [queryString, setQueryString] = useState({
        start_time: start_time,
        finish_time: finish_time,
    });

    const parseData = useCallback((item) => {
        console.log('item',item)
        const reqHis = item?.requests.map((data) => {
            return {
                id: data._id,
                product_name:data.product_name,
                rank:data.rank,
                status:data.status ,
                createdAt :formatDateTime(new Date(data.createdAt))
            };
        })

        const total = item?.total
        return { reqHis , total };
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['getRequestHistory',queryString],
        queryFn: () => getRequestHistory(queryString),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!start_time && !!finish_time
    });


    return {
        reqHistoryData: data?.reqHis,
        total:data?.total,
        isSuccess,
        isLoading,
        queryString,
        setQueryString
    };
}

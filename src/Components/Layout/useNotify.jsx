import {useCallback, useMemo, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime1} from "../../Utils/constant.js";
import {getCountNotify, getNotify} from "../../Services/notifyService.jsx";

export default function useNotify() {
    const userId  = useMemo(() => localStorage.getItem("id"), []);
    const [status , setStatus] = useState(0)
    const parseData = useCallback((item) => {
        const notification = item?.list?.map((data) => {
            return {
                notification_id: data?._id,
                title: data?.title,
                content: data?.content,
                url: data?.url,
                createdAt: formatDateTime1(new Date(data?.createdAt)),
            };
        });
        const total  = item.total

        return {notification, total};
    }, []);


    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getNotify", userId],
        queryFn: () => getNotify({userId : userId}),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!userId  ,
    });

    const { data : total, isSuccess : Sc, isLoading : Ld } = useQuery({
        queryKey: ["getCountNotify",userId , status],
        queryFn: () => getCountNotify({userId : userId,status : status}),
        staleTime: 20 * 1000,
        enabled: !!userId  ,
    });

    return {
        notifications: data?.notification,
        total: total?.data?.total,
        isSc: isSuccess ,
        isLd : isLoading,
        Sc,Ld,
        setStatus

    };
}

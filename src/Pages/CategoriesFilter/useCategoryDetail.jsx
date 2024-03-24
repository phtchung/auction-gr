import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import { getCategoryDetail} from "../../Services/biddingService.jsx";

export default function useCategoryDetail() {
    const {id} = useParams()

    const parseData = useCallback((data) => {
        const category = {
            cate_id: data._id,
            name: data?.name,
            child: data?.children,
        };
        return { category };
    }, []);

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getCategoryDetail", id],
        queryFn: () => getCategoryDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id,
    });

    return {
        category: data?.category,
        isSuccess,
        isLoading,
    };
}

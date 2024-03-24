import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories} from "../../Services/biddingService.jsx";
export default function useCategories() {

    const parseData = useCallback((item) => {
        const categories = item?.map((data) => {
            return {
                category_id:data?._id,
                name: data?.name,
                children : data?.children
            };
        });
        return { categories };
    }, []);

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getCategories"],
        queryFn: () => getCategories(),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
    });
    return {
        categories: data?.categories,
        isSuccess,
        isLoading,

    };
}

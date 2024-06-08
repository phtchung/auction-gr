import {useInfiniteQuery} from "@tanstack/react-query";
import {getBiddingList} from "../../Services/biddingService.jsx";
import useQueryString from "../../Hooks/useQueryString.js";

export default function useProductBidding() {
    const {queryString , setQueryString} = useQueryString()

    const {
        data,
        isError,
        isSuccess,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["getBiddingList",queryString],
        queryFn: ({ pageParam }) => getBiddingList(pageParam,queryString.keyword),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.nextPage
        } ,
    });

    return {
        data,
        isSuccess,
        isLoading,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        queryString,
        setQueryString
    };
}

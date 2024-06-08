import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import { getAuctionHistory } from "../../Services/productService.jsx";
import useQueryString from "../../Hooks/useQueryString.js";

export default function useAuctionHistory() {

  const {queryString , setQueryString} = useQueryString()

  const {
    data,
    isError,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["getAuctionHistory",queryString],
    queryFn: ({ pageParam }) => getAuctionHistory(pageParam,queryString.keyword),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextPage
    }
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

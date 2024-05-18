import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getBlogDetail} from "../../Services/biddingService.jsx";
import {formatDateTime1} from "../../Utils/constant.js";

export default function useBlogDetail() {
    const {id} = useParams()

    const parseData = useCallback((data) => {
        const blog = {
            blog_id: data._id,
            title: data?.title,
            subtitle1: data?.subtitle1,
            subtitle2: data?.subtitle1,
            subtitle3: data?.subtitle3,
            release_time:formatDateTime1(data?.createdAt),
            content: data?.content,
            image: data?.image,
        };
        return { blog };
    }, []);

    const { data, isSuccess, isLoading,isError } = useQuery({
        queryKey: ["getBlogDetail", id],
        queryFn: () => getBlogDetail(id),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
        enabled: !!id,
    });

    return {
        blogData: data?.blog,
        isSuccess,
        isLoading,
        isError
    };
}

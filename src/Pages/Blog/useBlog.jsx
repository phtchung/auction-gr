import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {formatDateTime1,
} from "../../Utils/constant.js";
import {getBlogs} from "../../Services/biddingService.jsx";
export default function useBlog() {

    const parseData = useCallback((item) => {
        const blogs = item?.map((data) => {
            return {
                sub_image:data?.sub_image,
                blog_id: data?._id,
                title: data?.title,
                release_time: formatDateTime1(new Date(data?.createdAt)),
            };
        });
        return { blogs };
    }, []);

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["getBlogs"],
        queryFn: () => getBlogs(),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),
    });
    return {
        blogs: data?.blogs,
        isSuccess,
        isLoading,

    };
}

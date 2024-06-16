import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import USER from "../../Services/userService.jsx";

export default function useDepositRegistration() {

    const parseData = useCallback((data) => {
        const user = {
            _id: data._id,
            auction_deposit: data?.auction_deposit,
            checkBidding : data?.checkBidding,
        };
        return { user };
    }, []);

    const { data, isSuccess, isLoading,isError } = useQuery({
        queryKey: ["getDepositRegistration"],
        queryFn: () => USER.me(),
        staleTime: 20 * 1000,
        select: (data) => parseData(data.data),

    });

    return {
        data: data?.user,
        isSuccess,
        isLoading,
        isError
    };
}

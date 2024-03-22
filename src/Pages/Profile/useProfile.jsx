import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import USER from "../../services/userService";

export default function useProfile() {
  const token = useMemo(() => localStorage.getItem("accessToken"), []);
  const user_id = useMemo(() => localStorage.getItem("id"), []);

  const parseData = useCallback((data) => {
    const user = {
      id: data._id,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      point: data?.point,
      username: data?.username,
      birthday: data?.date_of_birth,
      gender: data?.gender,
      avatar:data?.avatar
    };
    return { user };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getUser", user_id],
    queryFn: () => USER.getUser({ userId: user_id }),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!user_id,
  });

  return {
    userData: data?.user,
    isSuccess,
    isLoading,
  };
}

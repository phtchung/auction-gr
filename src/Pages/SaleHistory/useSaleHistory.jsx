import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { formatDateTime } from "../../Utils/constant.js";
import { getSaleHistory } from "../../Services/saleService.jsx";
import dayjs from "dayjs";

export default function useSaleHistory() {
  const currentDateTime = new Date();
  const [finish_time, setFinishTime] = useState(
    new Date(currentDateTime.setHours(0, 0, 0, 0)).toISOString(),
  );
  const [start_time, setStartTime] = useState(
    dayjs().subtract(7, "day").startOf("day"),
  );

  // const [start_time, setStartTime] = useState(() => {
  //     const sevenDaysAgo = new Date(currentDateTime);
  //     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  //     sevenDaysAgo.setHours(0, 0, 0, 0);
  //     return sevenDaysAgo.toISOString();
  // });

  const [queryString, setQueryString] = useState({
    start_time: start_time,
    finish_time: finish_time,
  });

  const parseData = useCallback((item) => {
    console.log("item", item);
    const saleHis = item?.products.map((data) => {
      return {
        id: data?._id,
        product_name: data?.product_name,
        final_price: data?.final_price,
        request_id: data?.request_id,
        shipping_fee: data?.shipping_fee,
        status: data?.status,
        completed_at: formatDateTime(
          new Date(data?.product_delivery?.completed_at),
        ),

      };
    });

    const total = item?.total;
    return { saleHis, total };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getSaleHistory", queryString],
    queryFn: () => getSaleHistory(queryString),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!start_time && !!finish_time,
  });

  return {
    saleHistoryData: data?.saleHis,
    total: data?.total,
    isSuccess,
    isLoading,
    queryString,
    setQueryString,
  };
}

import {formatMoney} from "../../Utils/constant.js";

const PendingInfo = ({data}) => {
    return (
        <>
            <div className="items-center font-medium text-sm gap-6  my-5 px-1 lg:space-y-5  min-[225px]:space-y-3">

                <div className="grid grid-cols-6 text-left">
                    <div className="lg:col-span-3  min-[225px]:col-span-6 grid grid-cols-3">
                        <div className="min-[225px]:col-span-3 sm:col-span-1">Hình thức</div>
                        <div className="font-normal  sm:col-span-2 min-[225px]:col-span-3 ">
                            {data?.auction_live}
                        </div>
                    </div>

                    <div className="lg:col-span-3  min-[225px]:col-span-6 grid grid-cols-3">
                        <div className="min-[225px]:col-span-3  sm:col-span-1"> Phương thức</div>
                        <div className="font-normal  sm:col-span-2 min-[225px]:col-span-3 ">
                            {data?.type_of_auction === 1 ? "Đấu giá tăng" : "Đấu giá giảm "}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-6 text-left">
                    <div className="lg:col-span-3  min-[225px]:col-span-6 grid grid-cols-3">
                        <div className="min-[225px]:col-span-3  sm:col-span-1"> Giá khởi điểm</div>
                        <div className="font-normal  sm:col-span-2 min-[225px]:col-span-3 ">
                            {formatMoney(data?.reserve_price)} VND
                        </div>
                    </div>
                    {
                        data?.auction_live === 0 &&
                        <>
                            <div className="lg:col-span-3  min-[225px]:col-span-6 grid grid-cols-3">
                                <div className="min-[225px]:col-span-3 sm:col-span-1"> Giá bán trực tiếp</div>
                                <div className="font-normal  sm:col-span-2 min-[225px]:col-span-3 ">
                                    {formatMoney(data?.sale_price)} VND
                                </div>
                            </div>
                        </>
                    }
                </div>

                <div className="grid grid-cols-6 text-left">
                    <div className="lg:col-span-3  min-[225px]:col-span-6 grid grid-cols-3">
                        <div className="min-[225px]:col-span-3 sm:col-span-1">Bước giá</div>
                        <div className="font-normal  sm:col-span-2 min-[225px]:col-span-3 ">
                            {formatMoney(data?.step_price)} VND
                        </div>
                    </div>

                    <div className="lg:col-span-3  min-[225px]:col-span-6 grid grid-cols-3">
                        <div className="min-[225px]:col-span-3  sm:col-span-1">  Phí vận chuyển</div>
                        <div className="font-normal  sm:col-span-2 min-[225px]:col-span-3 ">
                            {formatMoney(data?.shipping_fee)} VND
                        </div>
                    </div>
                </div>

            </div>
        </>);
};

export default PendingInfo;

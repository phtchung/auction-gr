import StarIcon from "@mui/icons-material/Star";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {useNavigate} from "react-router-dom";
import {formatDateTime, formatMoney} from "../../Utils/constant.js";

const ProductBiddingCpn = ({data}) => {

    const navigate = useNavigate()
    const handleNavigate = () => {
       navigate(`/auction/item/${data.product_id}`)
      window.scroll(0,0)
    }
    return (
        <>
            <div className=" px-6  shadow-inner bg-white  text-sm ">
                <div className="flex pb-2 pt-2 items-center  border-b border-b-gray-150">
                    <div className="font-semibold pr-10">{data?.seller_id?.name}</div>
                    <div className="">{data?.seller_id?.average_rating}</div>
                    <StarIcon
                        fontSize="small"
                        sx={{color: "rgb(245 158 11)", width: 14, height: 14}}
                    ></StarIcon>

                    <div className="flex items-center gap-6 ml-auto">
                        <div className="leading-10 ">{formatDateTime(data?.start_time)}</div>
                        <NotificationsActiveIcon></NotificationsActiveIcon>
                        <div className="leading-10 pr-4 border-r border-gray-200">
                            {formatDateTime(data?.finish_time)}
                        </div>
                        <button
                            onClick={handleNavigate}
                            className="p-2 px-6 py-2  right-0  bg-blue-800 rounded cursor-pointer   text-white border-gray-400 border-none text-sm  font-medium focus:outline-0">
                            Tới trang đấu giá
                        </button>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 gap-3 pb-3 pt-4 items-center justify-between border-b border-b-gray-150">
                    <div className="flex col-span-3 items-start">
                        <div className="">
                            <img style={{
                                width: '6rem',
                                height: '6rem',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}
                                 src={data?.main_image}
                                 alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="px-4 max-w-3xl text-base text-left">
                                {data?.product_name}
                            </div>
                            <div
                                style={{color: "rgba(0,0,0,.54)"}}
                                className="px-4 mt-2 max-w-3xl text-left"
                            >
                                Rank : {data?.rank}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-left gap-2">
                        <div className=" text-sm opacity-70 ml-auto px-5">
                            <span className="font-medium"> ₫{formatMoney(data?.reserve_price)} </span>
                        </div>
                        <div className="flex ml-auto items-center opacity-90 gap-2 px-6">
                            <div className="text-sm">Hiện tại :</div>
                            <div className="text-orange-600 font-semibold text-lg">₫{formatMoney(data?.bid_price)}</div>
                        </div>
                    </div>
                </div>
                {/*<div*/}
                {/*    className="py-4 flex items-center "*/}
                {/*    style={{backgroundColor: "#fffefb"}}*/}
                {/*>*/}
                {/*    <div*/}
                {/*        className="flex items-center "*/}
                {/*        style={{color: "rgba(0,0,0,.54)"}}*/}
                {/*    >*/}
                {/*        <div>Người trả giá cao nhất : {data?.bidder}</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default ProductBiddingCpn;

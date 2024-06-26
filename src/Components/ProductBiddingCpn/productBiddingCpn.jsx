import StarIcon from "@mui/icons-material/Star";
import {useNavigate} from "react-router-dom";
import {formatDateTime, formatMoney} from "../../Utils/constant.js";
import {Tooltip} from "antd";
import Icon, { InfoCircleFilled } from '@ant-design/icons';

const ProductBiddingCpn = ({data}) => {
    console.log(data)
    const navigate = useNavigate()
    const handleNavigate = () => {
        if(data?.auction_live === 0){
            navigate(`/auction/item/${data._id}`)
            window.scroll(0,0)
        }else if(data?.auction_live === 1){
            navigate(`/auction/online/item/${data._id}`)
            window.scroll(0,0)
        }else if(data?.auction_live === 2){
            navigate(`/streamGeneral`)
            window.scroll(0,0)
        }
    }
    return (
        <>
            <div className=" px-6  shadow-inner bg-white  text-sm ">
                <div className="flex pb-2 pt-2 items-center  border-b border-b-gray-150">
                    <div className="font-semibold pr-10">{data?.seller_id?.name}</div>
                    {
                        data?.seller_id?.average_rating &&
                        <>
                            <div className="">{data?.seller_id?.average_rating?.toFixed(2)}</div>
                            <StarIcon
                                fontSize="small"
                                sx={{color: "rgb(245 158 11)", width: 14, height: 14}}
                            ></StarIcon>
                        </>
                    }

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="leading-10 ">{formatDateTime(data?.start_time)} </div>
                        <div> -- </div>
                        <div className="leading-10 ">
                            {formatDateTime(data?.finish_time)}
                        </div>
                        <div className="border-r-2 border-gray-200 pr-4">
                            <Tooltip placement="top" arrow={true}
                                     title={<span>{data?.auction_live === 0 ? 'Đấu giá thông thường' : data?.auction_live === 1 ? 'Đấu giá Real-time' : 'Đấu giá giảm'}
                                        </span>}>
                                <InfoCircleFilled style={{fontSize : 20, color:"orange"}}/>
                            </Tooltip>
                        </div>

                        <button
                            onClick={handleNavigate}
                            className="p-2 px-6 py-2  right-0  bg-orange-500 rounded cursor-pointer   text-white border-gray-400 border-none text-sm  font-medium focus:outline-0">
                            Tới trang đấu giá
                        </button>
                    </div>
                </div>
                <div
                    className="grid md:grid-cols-4 gap-3 pb-3 pt-4 items-center justify-between border-b border-b-gray-150">
                    <div className="flex col-span-3 items-start">
                        <div className="">
                            <img style={{
                                width: '6rem',
                                height: '6rem',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}
                                 src={data?.product_id?.main_image}
                                 alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="px-4 max-w-3xl text-base text-left">
                                {data?.product_id?.product_name}
                            </div>
                            <div
                                style={{color: "rgba(0,0,0,.54)"}}
                                className="px-4 mt-2 max-w-3xl text-left"
                            >
                                Rank : {data?.product_id?.rank}
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
            </div>
        </>
    );
};

export default ProductBiddingCpn;

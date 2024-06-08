import StarIcon from "@mui/icons-material/Star";
import {useNavigate} from "react-router-dom";
import {formatDateTime, formatMoney} from "../../Utils/constant.js";
import {Tooltip} from "antd";

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
                    <div className="">{data?.seller_id?.average_rating?.toFixed(2)}</div>
                    <StarIcon
                        fontSize="small"
                        sx={{color: "rgb(245 158 11)", width: 14, height: 14}}
                    ></StarIcon>

                    <div className="flex items-center gap-6 ml-auto">
                        <div className="leading-10 ">{formatDateTime(data?.start_time)}</div>
                        <Tooltip placement="top" arrow={true}
                                 title={<span>{data?.auction_live === 0 ? 'Đấu giá thông thường' : data?.auction_live === 1 ? 'Đấu giá Real-time' : 'Đấu giá livestream'}
                                        </span>}>
                            <svg xmlns="http://ww w.w3.org/2000/svg"
                                 className={`w-5 h-5 ${data?.auction_live === 0 ? 'fill-orange-500' : data?.auction_live === 1 ? 'fill-yellow-500' : 'fill-red-600'}`}
                                 viewBox="0 0 448 512">
                                <path
                                    d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5
                                 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4
                                  29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3
                                   493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
                            </svg>
                        </Tooltip>

                        <div className="leading-10 pr-4 border-r border-gray-200">
                            {formatDateTime(data?.finish_time)}
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

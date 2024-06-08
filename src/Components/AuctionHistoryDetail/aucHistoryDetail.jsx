import SideBar from "../SideBar/index.jsx";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getAuctionHistoryDetail} from "../../Services/productService.jsx";
import {formatDateTime, formatMoney} from "../../Utils/constant.js";
import MainLayOut from "../Layout/mainLayout.jsx";
import CustomSpinner from "../CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../PageNotFound/404NotFound.jsx";
import CheckOKSvg from "../../assets/check.jsx";

const AucHistoryDetail = () => {
    const navigate = useNavigate();
    const aucHistoryParams = useParams();
    const {isLoading, isSuccess, data,isError} = useQuery({
        queryKey: ["getAucHistoryDetail"],
        queryFn: () => getAuctionHistoryDetail(aucHistoryParams.id),
        select: (data) => data.data,
        enabled: !!aucHistoryParams,
    });

    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <SideBar/>
                    <div className="home-right bg-white">
                        {
                            isLoading ?
                                <CustomSpinner h={12} w={12} font={'sm'}/>
                                :
                                isError ?
                                    <FZFNotFound margin={'-mt-20'} btnText={'Trở về'} error={'Rất tiếc,không tìm thấy thông tin của sản phẩm đấu giá này.'} urlReturn={'/auctionHistory'} />
                                    :
                                    isSuccess &&
                                    <>
                                        <div className="flex font-medium justify-between items-center m-1.5">
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => navigate(-1)}
                                            >
                                                <ArrowBackIosOutlinedIcon
                                                    sx={{fontSize: 20}}
                                                    color="rgb(212,212,212)"
                                                ></ArrowBackIosOutlinedIcon>
                                                <div className="text-sm"> TRỞ LẠI</div>
                                            </div>

                                            <div className="text-right px-5 pt-3 pb-3 text-sm  text-orange-500  bg-white">
                                                ĐƠN HÀNG ĐÃ HOÀN THÀNH
                                            </div>
                                        </div>

                                        <div className="border-b border-neutral-300 "></div>

                                        <div
                                            className="flex items-start mt-16 max-md:flex-col gap-y-6 gap-x-3 max-w-screen-lg mx-auto px-8 font-[sans-serif]">
                                            <div className="w-full">
                                                <div
                                                    className={`w-full h-1 rounded-xl ${data.victory_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                <div className="mt-2 mr-2 flex  w-full">
                                                    <CheckOKSvg/>
                                                    <div className="ml-2 ">
                                                        <h6 className={`text-sm font-bold ${data.victory_time ? 'text-green-500' : 'text-gray-300'} `}>Thắng
                                                            đấu giá</h6>
                                                        <p className={`text-xs ${data.victory_time ? 'text-green-500' : 'text-gray-300'} `}>{formatDateTime(data.victory_time)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div
                                                    className={`w-full h-1 rounded-xl ${data?.delivery?.confirm_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                <div className="mt-2 mr-2 flex w-full">
                                                    {data?.delivery?.confirm_time && <CheckOKSvg/>}
                                                    <div className="ml-2 w-full">
                                                        <h6 className={`text-sm font-bold ${data?.delivery?.confirm_time ? 'text-green-500' : ' text-gray-300'} `}>Xác
                                                            nhận giao
                                                            hàng
                                                        </h6>
                                                        <p className={`text-xs ${data?.delivery?.confirm_time ? 'text-green-500' : 'text-gray-300'} `}>{formatDateTime(data?.delivery?.confirm_time)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <div
                                                    className={`w-full h-1 rounded-xl ${data?.delivery?.delivery_start_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                <div className="mt-2 mr-2 w-full  flex">
                                                    {data?.delivery?.delivery_start_time && <CheckOKSvg/>}
                                                    <div className="ml-2 w-full">
                                                        <h6 className={`text-sm font-bold ${data?.delivery?.delivery_start_time ? 'text-green-500' : ' text-gray-300'} `}>Bắt
                                                            đầu giao hàng
                                                        </h6>
                                                        <p className={`text-xs ${data?.delivery?.delivery_start_time ? 'text-green-500' : 'text-gray-300'} `}>{formatDateTime(data?.delivery?.delivery_start_time)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                                        <div className="w-full">
                                                            <div
                                                                className={`w-full h-1 rounded-xl ${data?.delivery?.completed_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                            <div className="mt-2 mr-2 w-full  flex">
                                                                {data?.delivery?.completed_time &&
                                                                    <CheckOKSvg/>}
                                                                <div className="ml-2 w-full">
                                                                    <h6 className={`text-sm font-bold ${data?.delivery?.completed_time ? 'text-green-500' : ' text-gray-300'} `}>Đã
                                                                        nhận hàng
                                                                    </h6>
                                                                    <p className={`text-xs ${data?.delivery?.completed_time ? 'text-green-500' : 'text-gray-300'} `}>{formatDateTime(data?.delivery?.completed_time)}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-full">
                                                            <div
                                                                className={`w-full h-1 rounded-xl ${data?.delivery?.completed_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                            <div className="mt-2 mr-2 w-full  flex">
                                                                {data?.delivery?.completed_time &&
                                                                    <CheckOKSvg/>}
                                                                <div className="ml-2 w-full">
                                                                    <h6 className={`text-sm font-bold ${data?.delivery?.completed_time ? 'text-green-500' : ' text-gray-300'} `}>Đánh
                                                                        giá
                                                                    </h6>
                                                                    <p className={`text-xs ${data?.delivery?.completed_time ? 'text-green-500' : 'text-gray-300'} `}>{formatDateTime(data?.delivery?.completed_time)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                        </div>
                                        <div className="border-b border-neutral-300 mx-14 pt-10 "></div>

                                        <div className="grid grid-cols-3 bg-white pt-8 gap-4">
                                            <div className="text-sm text-left font-light text-neutral-600 mx-6 ">
                                                <div className="text-base font-semibold text-neutral-600 mx-6">
                                                    Thông tin nhận hàng
                                                </div>

                                                <div className="flex-col mt-4 mx-6 font-medium text-base  ">
                                                    <div className="mb-3">{data.delivery?.name}</div>
                                                    <div className="text-sm text-neutral-500 mb-2">
                                                        {data.delivery?.phone}
                                                    </div>
                                                    <div className="text-sm text-neutral-500">
                                                        {data.delivery?.address}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2 border-l border-gray-300">
                                                <div className="mx-6">
                                                    {/*<div className="text-base font-semibold text-neutral-600  text-left">*/}
                                                    {/*    Thông tin sản phẩm*/}
                                                    {/*</div>*/}
                                                    <div
                                                        className="border-b border-neutral-200 text-left flex flex-row gap-3 items-center pb-3">
                                                        <span
                                                            className="text-base font-semibold text-neutral-600  text-left">{data?.seller_id?.name} </span>
                                                        <a href={`/seller/${data?.seller_id?.username}`}
                                                           className="decoration-0 ">
                                                            <div
                                                                className="border border-gray-200 hover:bg-neutral-100 text-gray-600 flex items-center gap-1 rounded px-2 text-xs py-1 outline-none">
                                                                <svg enableBackground="new 0 0 15 15"
                                                                     viewBox="0 0 15 15" x="0"
                                                                     y="0"
                                                                     className="fill-gray-600 inline-block  h-4 w-4  icon-btn-shop">
                                                                    <path
                                                                        d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path>
                                                                </svg>
                                                                Xem Shop
                                                            </div>
                                                        </a>
                                                    </div>

                                                    <div className="flex items-start mt-4">
                                                        <div className=" w-24">
                                                            <img
                                                                style={{
                                                                    maxWidth: '96px', maxHeight: '96px',
                                                                    overflow: 'hidden', height: 'auto', width: '100%'
                                                                }}
                                                                src={data?.product_id?.main_image}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex flex-col text-sm">
                                                            <div className="px-4 max-w-3xl  text-base text-left">
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
                                                </div>
                                                <div className="grid grid-cols-3 text-sm mt-10">
                                                    <div
                                                        className="col-span-2 border-r border-gray-300 text-right pl-6 ">
                                                        <div className="border-b border-gray-200 "></div>
                                                        <div className="border-b border-gray-200 p-3">
                                                            Giá khởi điểm
                                                        </div>
                                                        <div className="border-b border-gray-200 p-3">
                                                            Giá thắng
                                                        </div>
                                                        <div className="border-b border-gray-200 p-3">
                                                            Phí vận chuyển
                                                        </div>
                                                        <div className=" p-4">
                                                            Tổng tiền
                                                        </div>
                                                    </div>
                                                    <div className="col-1 text-right mr-6">
                                                        <div className="border-b border-gray-200 "></div>
                                                        <div className="border-b border-gray-200  p-3">
                                                            {formatMoney(data?.reserve_price)}đ
                                                        </div>
                                                        <div className="border-b border-gray-200 p-3">
                                                            {formatMoney(data?.final_price)}đ
                                                        </div>
                                                        <div className="border-b border-gray-200 p-3">
                                                            {formatMoney(data?.shipping_fee)}đ
                                                        </div>
                                                        <div
                                                            className=" font-semibold text-base text-orange-600 p-4">
                                                            {formatMoney(data?.final_price + data?.shipping_fee)}đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                        }
                    </div>
                </div>
            </MainLayOut>

        </>
    );
};

export default AucHistoryDetail;

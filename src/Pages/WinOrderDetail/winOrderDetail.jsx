import SideBar from "../../Components/SideBar/index.jsx";
import {useNavigate} from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import {useEffect, useState} from "react";
import {DialogContent, DialogTitle, Dialog, Stack} from "@mui/material";
import {formatMoney, statusToString} from "../../Utils/constant.js";
import useWinOrderDetail from "./useWinOrderDetail.jsx";
import {toast} from "react-toastify";
import {sendDeliveryInfor} from "../../Services/deliveryService.jsx";
import useWinOrdersTracking from "../WinOrdersTracking/useWinOrdersTracking.jsx";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup.jsx";
import {Image, Modal, Radio} from "antd";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import CheckOKSvg from "../../assets/check.jsx";
import CloseSvg from "../../assets/close.jsx";

const WinOrderDetail = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const {isLoading, isSuccess, winDetailData, isError} = useWinOrderDetail();
    const {refetch, refetch1} = useWinOrdersTracking();
    const [dlvInfor, setDlvInfor] = useState(null);
    const navigate = useNavigate();
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)

    const stateStr =
        isSuccess && (statusToString(winDetailData.status));
    useEffect(() => {
        if (isSuccess) {
            setDlvInfor({
                ...dlvInfor,
                product_id: winDetailData?.product_id,
            });
        }
    }, [isSuccess, winDetailData]);
    const handleDlvInfor = (key, value) => {
        setDlvInfor({...dlvInfor, [key]: value});
    };

    const handleSendDlvInfor = async () => {
        try {
            if (!dlvInfor) {
                toast.error("Chưa điền thông tin");
                return;
            }
            const res = await sendDeliveryInfor({...dlvInfor});
            setOpen(false);
            window.location.href = res.data.payUrl;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

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
                                    <FZFNotFound margin={'-mt-20'} btnText={'Trở về'}
                                                 error={'Rất tiếc, không tìm thấy thông tin phù hợp.'}
                                                 urlReturn={'/winOrderTracking'}/>
                                    :
                                    isSuccess &&
                                    <>
                                        <div className="flex m-4 gap-2 items-center px-2 justify-between">
                                            <div
                                                className="flex items-center font-medium text-neutral-600 cursor-pointer"
                                                onClick={() => navigate(-1)}
                                            >
                                                <ArrowBackIosOutlinedIcon
                                                    sx={{fontSize: 20}}
                                                    color="rgb(212,212,212)"
                                                ></ArrowBackIosOutlinedIcon>
                                                <div className="text-base"> Trở lại</div>
                                            </div>

                                            <div className="flex items-center font-medium text-neutral-600 text-base gap-2">
                                                <div className="text-left  ">Danh sách {stateStr} </div>
                                                <ArrowForwardIosOutlinedIcon
                                                    sx={{fontSize: 18}}
                                                    fontSize="small"
                                                    color="gray"
                                                ></ArrowForwardIosOutlinedIcon>
                                                <div className="">Chi tiết</div>
                                            </div>
                                        </div>
                                        <div className="border-b border-gray-400  mx-5"></div>

                                        {/*stepper*/}
                                        {
                                            (isSuccess && winDetailData.status === 11) ?
                                                <>
                                                    <div
                                                        className="flex items-start mt-16 max-md:flex-col gap-y-6 gap-x-3 max-w-screen-lg mx-auto px-8 font-[sans-serif]">
                                                        <div className="w-full">
                                                            <div
                                                                className={`w-full h-1 rounded-xl ${winDetailData.victory_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                            <div className="mt-2 mr-2 flex justify-center  w-full">
                                                                <CheckOKSvg/>
                                                                <div className="ml-2">
                                                                    <h6 className={`text-sm font-bold ${winDetailData.victory_time ? 'text-green-500' : 'text-gray-300'} `}>Thắng
                                                                        đấu giá</h6>
                                                                    <p className={`text-xs ${winDetailData.victory_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.victory_time}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full">
                                                            <div
                                                                className={`w-full h-1 rounded-xl ${winDetailData.cancel_time ? 'bg-red-500' : 'bg-gray-300'} `}></div>
                                                            <div className="mt-2 mr-2 flex justify-center w-full">
                                                                <div className="ml-2">
                                                                    <h6 className={`text-sm font-bold ${winDetailData.cancel_time ? 'text-red-500' : ' text-gray-300'} `}>Hủy
                                                                    </h6>
                                                                    <p className={`text-xs ${winDetailData.cancel_time ? 'text-red-500' : 'text-gray-300'} `}>{winDetailData.cancel_time}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div
                                                        className="flex items-start mt-16 max-md:flex-col gap-y-6 gap-x-3 max-w-screen-lg mx-auto px-8 font-[sans-serif]">
                                                        <div className="w-full">
                                                            <div
                                                                className={`w-full h-1 rounded-xl ${winDetailData.victory_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                            <div className="mt-2 mr-2 flex  w-full">
                                                                <CheckOKSvg/>
                                                                <div className="ml-2 ">
                                                                    <h6 className={`text-sm font-bold ${winDetailData.victory_time ? 'text-green-500' : 'text-gray-300'} `}>Thắng
                                                                        đấu giá</h6>
                                                                    <p className={`text-xs ${winDetailData.victory_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.victory_time}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full">
                                                            <div
                                                                className={`w-full h-1 rounded-xl ${winDetailData.confirm_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                            <div className="mt-2 mr-2 flex w-full">
                                                                {winDetailData.confirm_time && <CheckOKSvg/>}
                                                                <div className="ml-2 w-full">
                                                                    <h6 className={`text-sm font-bold ${winDetailData.confirm_time ? 'text-green-500' : ' text-gray-300'} `}>Xác
                                                                        nhận giao
                                                                        hàng
                                                                    </h6>
                                                                    <p className={`text-xs ${winDetailData.confirm_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.confirm_time}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-full">
                                                            <div
                                                                className={`w-full h-1 rounded-xl ${winDetailData.delivery_start_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                            <div className="mt-2 mr-2 w-full  flex">
                                                                {winDetailData.delivery_start_time && <CheckOKSvg/>}
                                                                <div className="ml-2 w-full">
                                                                    <h6 className={`text-sm font-bold ${winDetailData.delivery_start_time ? 'text-green-500' : ' text-gray-300'} `}>Bắt
                                                                        đầu giao hàng
                                                                    </h6>
                                                                    <p className={`text-xs ${winDetailData.delivery_start_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.delivery_start_time}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            winDetailData.status === 9 || winDetailData.status === 14 || winDetailData.status === 15 ?
                                                                <>
                                                                    <div className="w-full">
                                                                        <div
                                                                            className={`w-full h-1 rounded-xl ${winDetailData.return_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                                        <div className="mt-2 mr-2 w-full  flex">
                                                                            {winDetailData.return_time && <CheckOKSvg/>}
                                                                            <div className="ml-2 w-full">
                                                                                <h6 className={`text-sm font-bold ${winDetailData.return_time ? 'text-green-500' : ' text-gray-300'} `}>
                                                                                    Yêu cầu trả hàng
                                                                                </h6>
                                                                                <p className={`text-xs ${winDetailData.return_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.return_time}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full">
                                                                        <div
                                                                            className={`w-full h-1 rounded-xl ${winDetailData.approve_return_time || winDetailData.deny_return_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                                        <div className="mt-2 mr-2 w-full  flex">
                                                                            {(winDetailData.approve_return_time || winDetailData.deny_return_time) &&
                                                                                <CheckOKSvg/>}
                                                                            <div className="ml-2 w-full">
                                                                                <h6 className={`text-sm font-bold ${winDetailData.approve_return_time || winDetailData.deny_return_time ? 'text-green-500' : ' text-gray-300'} `}>
                                                                                    {winDetailData.status === 9 ? 'Trả hàng' : winDetailData.status === 14 ? 'Trả hàng thành công' : 'Từ chối trả hàng'}
                                                                                </h6>
                                                                                <p className={`text-xs ${winDetailData.approve_return_time || winDetailData.deny_return_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.approve_return_time || winDetailData.deny_return_time}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="w-full">
                                                                        <div
                                                                            className={`w-full h-1 rounded-xl ${winDetailData.completed_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                                        <div className="mt-2 mr-2 w-full  flex">
                                                                            {winDetailData.completed_time &&
                                                                                <CheckOKSvg/>}
                                                                            <div className="ml-2 w-full">
                                                                                <h6 className={`text-sm font-bold ${winDetailData.completed_time ? 'text-green-500' : ' text-gray-300'} `}>Đã
                                                                                    nhận hàng
                                                                                </h6>
                                                                                <p className={`text-xs ${winDetailData.completed_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.completed_time}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full">
                                                                        <div
                                                                            className={`w-full h-1 rounded-xl ${winDetailData.completed_time ? 'bg-green-500' : 'bg-gray-300'} `}></div>
                                                                        <div className="mt-2 mr-2 w-full  flex">
                                                                            {winDetailData.completed_time &&
                                                                                <CheckOKSvg/>}
                                                                            <div className="ml-2 w-full">
                                                                                <h6 className={`text-sm font-bold ${winDetailData.completed_time ? 'text-green-500' : ' text-gray-300'} `}>Đánh
                                                                                    giá
                                                                                </h6>
                                                                                <p className={`text-xs ${winDetailData.completed_time ? 'text-green-500' : 'text-gray-300'} `}>{winDetailData.completed_time}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                        }
                                                    </div>
                                                </>
                                        }
                                        {/*stt = 4 , ddienf tt nhận hàng*/}
                                        <div className="grid grid-cols-8 gap-4 mt-8">
                                            {isSuccess && winDetailData.status !== 11 &&
                                                <>
                                                    <div
                                                        className="lg:col-span-3 lg:mr-0 min-[225px]:col-span-8 ml-8 min-[225px]:mr-8  ">
                                                        {/*điền tt giao hàng*/}
                                                        {winDetailData.status === 4 ?
                                                            <>
                                                                <div className=" m-2.5 px-2 ">
                                                                    <div
                                                                        className="text-center text-sm font-medium text-neutral-600 ">
                                                                        Thông tin giao hàng
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="items-center font-medium text-neutral-600 text-sm gap-6 my-8 px-1 space-y-4  ">
                                                                    <div
                                                                        className="grid grid-cols-6 text-left items-center">
                                                                        <div className="col-span-2"> Tên :</div>
                                                                        <div className="font-normal col-span-4">
                                                                            <input
                                                                                type="text"
                                                                                name="price"
                                                                                id="name"
                                                                                onChange={(e) => handleDlvInfor("name", e.target.value)}
                                                                                className="block focus:outline-none focus:border-none border-0 py-1.5 px-2 w-full text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="grid grid-cols-6 items-center text-left">
                                                                        <div className="col-span-2"> Số điện thoại :
                                                                        </div>
                                                                        <div className="font-normal col-span-4">
                                                                            <input
                                                                                type="text"
                                                                                name="phone"
                                                                                id="phone"
                                                                                placeholder="Số điện thoại"
                                                                                onChange={(e) => handleDlvInfor("phone", e.target.value)}
                                                                                className="block w-full focus:outline-none focus:border-none border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="grid grid-cols-6 items-center text-left">
                                                                        <div className="col-span-2"> Địa chỉ :</div>
                                                                        <div className="font-normal col-span-4">
                                                                            <input
                                                                                type="text"
                                                                                name="address"
                                                                                id="address"
                                                                                placeholder="Địa chỉ"
                                                                                onChange={(e) =>
                                                                                    handleDlvInfor("address", e.target.value)
                                                                                }
                                                                                className="block w-full focus:outline-none focus:border-none border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        className="grid grid-cols-6 text-left items-center">
                                                                        <div className="col-span-2">Thanh toán :
                                                                        </div>
                                                                        <div
                                                                            className="flex flex-col item-center col-span-4 ">
                                                                            <Radio.Group className="flex flex-col "
                                                                                         onChange={(e) =>
                                                                                             handleDlvInfor("payment_method", e.target.value)}>
                                                                                <Radio value={0}>
                                                                                    <div
                                                                                        className="flex-row gap-2 mt-0.5 items-center flex ">
                                                                                        <img
                                                                                            src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg"
                                                                                            style={{maxWidth: "25%"}}
                                                                                            alt=""/>
                                                                                        Tiền mặt
                                                                                    </div>
                                                                                </Radio>
                                                                                <Radio value={1}>
                                                                                    <div
                                                                                        className="flex-row mt-0.5 gap-2 items-center flex ">
                                                                                        <img
                                                                                            src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png"
                                                                                            style={{maxWidth: "25%"}}
                                                                                            alt=""/>
                                                                                        Momo
                                                                                    </div>
                                                                                </Radio>
                                                                                <Radio value={2}>
                                                                                    <div
                                                                                        className="flex-row gap-2 mt-0.5 items-center flex ">
                                                                                        <img
                                                                                            src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png"
                                                                                            style={{maxWidth: "25%"}}
                                                                                            alt=""/>
                                                                                        Zalopay
                                                                                    </div>
                                                                                </Radio>
                                                                            </Radio.Group>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex float-right gap-2 mb-3">
                                                                    <button
                                                                        onClick={handleOpen}
                                                                        className=" px-6  right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-semibold focus:outline-0">
                                                                        Xác nhận
                                                                    </button>
                                                                </div>


                                                                {/*xác nhận thông tin giao hàng*/}
                                                                <Dialog open={open} onClose={handleOpen}
                                                                        maxWidth="md">
                                                                    <DialogTitle>
                                                                        <div
                                                                            className="flex items-center justify-between">
                                                                                <span
                                                                                    className="font-semibold text-base text-neutral-600">
                                                                                  Xác nhận thông tin giao hàng
                                                                                </span>
                                                                            <div onClick={handleOpen}>
                                                                                <CloseSvg/>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="border-b mt-2  border-gray-300"></div>
                                                                    </DialogTitle>
                                                                    <DialogContent>
                                                                        <Stack spacing={2} margin={1}
                                                                               minWidth={450}>
                                                                            <div
                                                                                className="items-center font-medium text-neutral-700 text-sm gap-6 my-8 mx-8 px-1 space-y-4 ">
                                                                                <div
                                                                                    className="grid grid-cols-12 text-left">
                                                                                    <div className="col-span-3"> Tên
                                                                                        :
                                                                                    </div>
                                                                                    <div
                                                                                        className=" col-span-9 font-semibold">
                                                                                        {dlvInfor?.name || null}
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="grid grid-cols-12 text-left">
                                                                                    <div className="col-span-3"> Số
                                                                                        điện
                                                                                        thoại
                                                                                        :
                                                                                    </div>
                                                                                    <div
                                                                                        className=" col-span-9 font-semibold">
                                                                                        {dlvInfor?.phone || null}
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="grid grid-cols-12 text-left">
                                                                                    <div className="col-span-3"> Địa
                                                                                        chỉ
                                                                                        :
                                                                                    </div>
                                                                                    <div
                                                                                        className=" col-span-9 font-semibold">
                                                                                        {dlvInfor?.address || null}
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="grid grid-cols-12 text-left ">
                                                                                    <div
                                                                                        className="col-span-3"> Thanh
                                                                                        toán :
                                                                                    </div>
                                                                                    <div
                                                                                        className=" col-span-9 font-semibold">
                                                                                        {dlvInfor?.payment_method === 0 ? 'Tiền mặt' : dlvInfor?.payment_method === 1 ? 'Momo' : 'Zalopay' || null}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="flex gap-4 justify-end ">

                                                                                <button
                                                                                    onClick={handleOpen}
                                                                                    className=" px-8   right-0 bg-white rounded text-orange-500 border-orange-500 text-sm hover:border-orange-500 hover:bg-amber-50 font-medium ">
                                                                                    Hủy
                                                                                </button>
                                                                                <button
                                                                                    onClick={handleSendDlvInfor}
                                                                                    className=" px-8  right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-medium focus:outline-0">
                                                                                    Gửi
                                                                                </button>

                                                                            </div>
                                                                        </Stack>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </>
                                                            :
                                                            <>
                                                                <div>
                                                                    <div
                                                                        className="flex justify-between m-2.5 items-center px-2">
                                                                        <div className=" px-2 ">
                                                                            <div
                                                                                className="text-center text-sm font-medium text-neutral-700 ">
                                                                                Thông tin giao hàng
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="items-center font-medium text-neutral-500 text-sm gap-6 my-6 px-1 space-y-4 ">
                                                                        <div
                                                                            className="grid grid-cols-6 gap-1 text-left">
                                                                            <div className="col-span-2"> Người nhận
                                                                            </div>
                                                                            <div
                                                                                className="col-span-4 font-semibold text-neutral-900">
                                                                                {winDetailData.receiver}
                                                                            </div>
                                                                        </div>

                                                                        <div
                                                                            className="grid grid-cols-6 gap-1 text-left">
                                                                            <div className="col-span-2"> Số điện
                                                                                thoại
                                                                            </div>
                                                                            <div
                                                                                className="col-span-4 font-semibold text-neutral-900">
                                                                                {winDetailData.phone_receiver}
                                                                            </div>
                                                                        </div>

                                                                        <div
                                                                            className="grid grid-cols-6 gap-1 text-left">
                                                                            <div className="col-span-2"> Địa chỉ
                                                                                thoại
                                                                            </div>
                                                                            <div
                                                                                className="col-span-4 font-semibold text-neutral-900">
                                                                                {winDetailData.address}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*popup update */}
                                                                {winDetailData.status === 7 && (
                                                                    <UpdatePopup state={winDetailData.status}
                                                                                 canReturn={winDetailData?.can_return}/>
                                                                )}
                                                            </>
                                                        }
                                                    </div>
                                                </>
                                            }
                                            <div
                                                className={`${winDetailData.status === 11 ? 'lg:mx-32 min-[225px]:mx-2 lg:col-span-8' : 'lg:col-span-5 min-[225px]:mr-2'} mb-6 min-[225px]:col-span-8 lg:border-l  border-gray-300`}>
                                                <div className="mx-6">
                                                    <div
                                                        className="flex flex-row border-b border-neutral-200 justify-between pb-2  items-center">
                                                        <div
                                                            className=" text-left flex flex-row gap-3 items-center ">
                                                            <a href={`/seller/${winDetailData?.username}`}
                                                               className="decoration-0 ">
                                                                <div
                                                                    className="border border-gray-200 hover:bg-neutral-100 text-gray-600 flex items-center gap-1 rounded px-2 text-xs py-1 outline-none">
                                                                    <svg enableBackground="new 0 0 15 15"
                                                                         viewBox="0 0 15 15" x="0"
                                                                         y="0"
                                                                         className="fill-gray-600 inline-block  h-4 w-4  icon-btn-shop">
                                                                        <path
                                                                            d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3
                                                                             1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3
                                                                              0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0
                                                                               .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7
                                                                                1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path>
                                                                    </svg>
                                                                    {winDetailData?.name}
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div className="flex flex-row gap-4 items-center">
                                                            <button onClick={() => setOpen1(!open1)}
                                                                    className="border border-gray-200 hover:bg-neutral-100 text-gray-600 flex items-center gap-1 rounded px-2 text-xs py-1 outline-none">
                                                                Chi tiết
                                                            </button>
                                                            <button onClick={() => setOpen2(!open2)}
                                                                    className="border border-gray-200 hover:bg-neutral-100 text-gray-600 flex items-center gap-1 rounded px-2 text-xs py-1 outline-none">
                                                                Thông tin đấu giá
                                                            </button>
                                                        </div>
                                                    </div>


                                                    <div className="flex items-start mt-4">
                                                        <div className="w-24">
                                                            <Image.PreviewGroup
                                                                preview={{
                                                                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                                }}
                                                            >
                                                                <div className="font-normal  mb-2">
                                                                    <Image height={100} width={100}
                                                                           src={winDetailData.main_image}/>
                                                                </div>
                                                            </Image.PreviewGroup>
                                                        </div>

                                                        <div className="flex flex-col text-sm">
                                                            <div
                                                                className="px-4 max-w-3xl  text-base text-left">
                                                                {winDetailData?.product_name}
                                                            </div>
                                                            <div
                                                                style={{color: "rgba(0,0,0,.54)"}}
                                                                className="px-4 mt-2 max-w-3xl text-left"
                                                            >
                                                                Rank : {winDetailData?.rank}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 text-sm mt-4">
                                                    <div
                                                        className="col-span-2 font-medium text-neutral-600 border-r border-gray-300 text-right pl-6 ">
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
                                                        {
                                                            winDetailData?.auction_live === 2 &&
                                                            <div className="border-b border-gray-200 p-3">
                                                                Phí đăng ký
                                                            </div>
                                                        }
                                                        <div className=" p-4">
                                                            Tổng tiền
                                                        </div>
                                                        {
                                                            winDetailData?.payment &&
                                                            <div className="border-y border-gray-200 p-3">
                                                                Phương thức thanh toán
                                                            </div>
                                                        }
                                                    </div>
                                                    <div
                                                        className="col-1 font-medium text-neutral-800 text-right mr-6">
                                                        <div className="border-b border-gray-200 "></div>
                                                        <div className="border-b border-gray-200  p-3">
                                                            {formatMoney(winDetailData?.reserve_price)}đ
                                                        </div>
                                                        <div className="border-b border-gray-200 p-3">
                                                            {formatMoney(winDetailData?.final_price)}đ
                                                        </div>
                                                        <div className="border-b border-gray-200 p-3">
                                                            {formatMoney(winDetailData?.shipping_fee)}đ
                                                        </div>
                                                        {
                                                            winDetailData?.auction_live === 2 &&
                                                            <div className="border-b border-gray-200 p-3">
                                                                - {formatMoney(winDetailData?.deposit_price)}đ
                                                            </div>
                                                        }
                                                        <div
                                                            className=" text-orange-500 p-4">
                                                            {formatMoney(winDetailData?.total_price)}đ
                                                        </div>
                                                        {
                                                            winDetailData?.payment &&
                                                            <div className="border-y border-gray-200 p-3">
                                                                <span>{winDetailData?.payment}</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*Yêu cầu trả hàng*/}
                                        {isSuccess && (winDetailData.status === 9 || winDetailData.status === 14 || winDetailData.status === 15) && (
                                            <>
                                                <div className="border-2 m-5 inline-block">
                                                    <div
                                                        className="flex justify-between text-neutral-700 m-2.5 items-center px-2">
                                                        <div className="text-left px-6 text-sm font-semibold ">
                                                            Yêu cầu trả hàng
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="items-center  gap-6 font-medium text-neutral-500  my-6 mx-4 px-1 text-sm space-y-4 ">
                                                        <div className="grid grid-cols-6 text-left">
                                                            <div> Lí do :</div>
                                                            <div className=" text-neutral-800 col-span-2">
                                                                {winDetailData?.return_reasonQuick}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-6 text-left">
                                                            <div> Mô tả chi tiết :</div>
                                                            <div className=" text-neutral-800 col-span-2">
                                                                {winDetailData?.return_reason}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-6 text-left">
                                                            <div className="min-[225px]:col-span-3  sm:col-span-2">
                                                                Ảnh minh chứng
                                                            </div>
                                                        </div>

                                                        {
                                                            winDetailData.return_image &&
                                                            <>
                                                                <div
                                                                    className="grid xl:grid-cols-6 gap-1 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 min-[225px]:col-span-1 text-left mb-4">
                                                                    <Image.PreviewGroup
                                                                        preview={{
                                                                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                                        }}>
                                                                        {winDetailData?.return_image.map((imageUrl, index) => (
                                                                            <>
                                                                                <div
                                                                                    className="font-normal col-span-1 mb-2">
                                                                                    <Image key={index} height={150}
                                                                                           width={150}
                                                                                           src={imageUrl}/>
                                                                                </div>
                                                                            </>
                                                                        ))}
                                                                    </Image.PreviewGroup>
                                                                </div>
                                                            </>
                                                        }

                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/*popup  thông tin chi tiết */}
                                        <Modal
                                            width={530}
                                            header={null}
                                            closable={false}
                                            footer={null} centered open={open1}
                                            onCancel={() => setOpen1(!open1)}>
                                            {
                                                <div
                                                    className=" flex flex-wrap bg-white justify-center items-center w-full h-full overflow-auto">
                                                <div className="w-full max-w-lg rounded-md p-2 relative">
                                                        <div className="flex flex-row items-center justify-between">
                                                            <div
                                                                className="font-semibold text-neutral-600 text-xl"> {winDetailData?.product_name}</div>
                                                            <div onClick={() => setOpen1(!open1)}>
                                                                <CloseSvg></CloseSvg>
                                                            </div>
                                                        </div>

                                                        {isSuccess && (
                                                            <>
                                                                <div
                                                                    className="items-center font-medium px-2 text-sm gap-4 mt-4   space-y-3 ">
                                                                    {
                                                                        winDetailData.image_list &&
                                                                        <>
                                                                            <div
                                                                                className="grid grid-cols-6 text-left mb-4">
                                                                                <Image.PreviewGroup
                                                                                    preview={{
                                                                                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                                                    }}>
                                                                                    {winDetailData?.image_list.map((imageUrl, index) => (
                                                                                        <>
                                                                                            <div
                                                                                                className="font-normal col-span-1 mb-2">
                                                                                                <Image key={index}
                                                                                                       height={150}
                                                                                                       width={150}
                                                                                                       src={imageUrl}/>
                                                                                            </div>
                                                                                        </>
                                                                                    ))}
                                                                                </Image.PreviewGroup>
                                                                            </div>
                                                                        </>
                                                                    }

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2 "> Danh mục :</div>
                                                                        <div className="font-normal col-span-4">
                                                                            {winDetailData?.category_name}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Chất lượng :</div>
                                                                        <div className="font-normal col-span-4">
                                                                            {winDetailData?.rank}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Thương hiệu :</div>
                                                                        <div className="font-normal col-span-4">
                                                                            {winDetailData?.brand}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Tình trạng :</div>
                                                                        <div className="font-normal col-span-4">
                                                                            {winDetailData?.is_used}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Trả hàng :</div>
                                                                        <div className="font-normal col-span-4">
                                                                            {winDetailData?.can_return}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Nơi gửi hàng :
                                                                        </div>
                                                                        <div className="font-normal col-span-4">
                                                                            {winDetailData?.delivery_from}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Phí vận chuyển :
                                                                        </div>
                                                                        <div className="font-normal col-span-4">
                                                                            {formatMoney(winDetailData?.shipping_fee)}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Mô tả sản phẩm :
                                                                        </div>
                                                                        <div className="font-normal col-span-4">
                                                                            {winDetailData?.description}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            }
                                        </Modal>

                                        {/* Popup thông tin đấu giá */}
                                        <Modal
                                            width={530}
                                            header={null}
                                            closable={false}
                                            footer={null} centered open={open2}
                                            onCancel={() => setOpen2(!open2)}>
                                            {
                                                <div
                                                    className=" flex flex-wrap bg-white justify-center items-center w-full h-full overflow-auto">
                                                    <div className="w-full max-w-lg rounded-md p-2 relative">
                                                        <div
                                                            className="flex flex-row items-center justify-between">
                                                            <div
                                                                className="font-semibold text-neutral-600 text-xl"> Thông
                                                                tin đấu giá
                                                            </div>
                                                            <div onClick={() => setOpen2(!open2)}>
                                                                <CloseSvg/>
                                                            </div>

                                                        </div>

                                                        {isSuccess && (
                                                            <>
                                                                <div
                                                                    className="items-center font-medium text-sm gap-6 my-4  px-1 space-y-4 ">
                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Hình thức :</div>
                                                                        <div className="font-normal  col-span-4">
                                                                            {winDetailData?.type_of_auction === 1 ? "Đấu giá tăng" : "Đấu giá giảm "}
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Thời gian bắt đầu :
                                                                        </div>
                                                                        <div className="font-normal  col-span-4">
                                                                            {winDetailData?.start_time}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Thời gian kết thúc
                                                                            :
                                                                        </div>
                                                                        <div className="font-normal  col-span-4">
                                                                            {winDetailData?.start_time}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Thời gian thắng :
                                                                        </div>
                                                                        <div className="font-normal  col-span-4">
                                                                            {winDetailData?.victory_time}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-6 text-left">
                                                                        <div className="col-span-2"> Hoàn thành thủ tục
                                                                            :
                                                                        </div>
                                                                        <div className="font-normal  col-span-4">
                                                                            {winDetailData?.procedure_complete_time}
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            }
                                        </Modal>
                                    </>
                        }
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};
export default WinOrderDetail;

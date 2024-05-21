import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Radio, Tabs} from 'antd';
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {CheckOutDeposit, getCheckOutInfor} from "../../Services/biddingService.jsx";
import {toast} from "react-toastify";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";

const TabPane = Tabs.TabPane
const CheckOut = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [checkoutInfor, setCheckoutInfor] = useState({product_id: id});

    const handleCheckout = (key, value) => {
        setCheckoutInfor({...checkoutInfor, [key]: value});
    };

    const {data, isSuccess, isLoading,isError : error} = useQuery({
        queryKey: ["getCheckOutInfor", id],
        queryFn: () => getCheckOutInfor(id),
        staleTime: 20 * 1000,
        enabled: !!id,
    });

    const {mutate, isError, isPending} = useMutation({
        mutationFn: async (checkoutInfor) => {
            try {
                const res = await CheckOutDeposit(checkoutInfor)
                const data = res.data
                console.log(data);
                return data;
            } catch (error) {
                console.log(error.response.data);
                throw error;
            }
        },
        onSuccess: (data) => {
            window.location.href = data.payUrl;
        },
    });

    const handleSubmit = () => {
        if (checkoutInfor?.payment_method) {
            mutate(checkoutInfor);
        } else {
            toast.error('Chưa chọn phương thức thanh toán')
        }
    };

    return (
        <>
            <MainLayOut style={{zIndex: 10000}}>
                    <div
                        className={`lg:py-6 lg:px-4 md:container md:p-6 sm:p-4 w-full h-full  ${isPending ? 'bg-opacity-40' : ''}`}>
                        { isLoading ?
                            <>
                                <CustomSpinner h={12} w={12} font={'sm'}/>
                            </>
                            :
                            error ?
                                <>
                                    <FZFNotFound error={'Rất tiếc,đã xảy ra lỗi hoặc bạn đã đăng ký thành công phiên đấu giá này.'}
                                                 urlReturn={'/auctionStream'} btnText={'Trở về'}/>
                                </>
                                :
                                isSuccess &&
                                <>
                                    <div className="grid lg:grid-cols-3 md:grid-cols-1 mt-20 sm:grid-cols-1 text-sm">
                                        <div
                                            className="lg:col-span-1 lg:mr-2 sm:mr-0 md:col-span-1 sm:col-span-1  px-1.5 ">
                                            <div className="w-full  h-fit flex flex-col justify-center ">
                                                <div
                                                    className="xs:text-xl md:text-2xl font-bold text-neutral-800 mb-5">Thanh
                                                    toán phí đăng ký đấu giá
                                                </div>
                                                <div
                                                    className=" border leading-10 text-left border-solid truncate border-neutral-300 rounded-lg p-3.5   ">
                                                <span
                                                    className="text-base  w-80   font-semibold">Thông tin sản phẩm : {data?.data?.auction_name}</span>
                                                    <div className="flex items-center justify-between ">
                                                        <p className="text-sm leading-[44px] font-normal text-neutral-700">Tiền
                                                            đặt trước </p>
                                                        <p className="text-xl leading-[44px] font-semibold text-neutral-800">{data?.data?.deposit_price}đ</p>
                                                    </div>
                                                    <div
                                                        className="flex items-center justify-between border-b border-solid border-neutral-300">
                                                        <p className="text-sm leading-[44px] font-normal text-neutral-700">Phí
                                                            đăng ký </p>
                                                        <p className="text-xl leading-[44px] font-semibold text-neutral-800">50.000
                                                            đ</p>
                                                    </div>

                                                    <div
                                                        className="flex items-center leading-[44px] justify-between mt-5">
                                                        <p className="text-sm font-normal text-neutral-700">Phí đăng
                                                            ký </p>
                                                        <p className="text-2xl font-semibold text-neutral-800">{parseInt(data.data.deposit_price) + 50000} đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="lg:col-span-2 md:col-span-1 sm:col-span-1 px-1.5 mt-4 md:ml-0 md:mt-6 sm:ml-0  lg:mt-0 sm:mt-6">
                                            <div className="w-full h-full rounded-lg bg-zinc-200">
                                                <div className="h-full  py-2 px-2">
                                                    <Tabs size={"large"} defaultActiveKey="1" centered
                                                          tabBarGutter={200}
                                                          indicator={{size: 300}}>
                                                        <TabPane tab="Tài khoản ngân hàng" key="1">
                                                            <div className="flex flex-col gap-4">
                                                                <div
                                                                    className="grid mt-3 h-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                                                                    <div
                                                                        className="xl:col-span-1 relative lg:col-span-1 md:col-span-1 sm:col-span-1">
                                                                        <div
                                                                            className="flex flex-col gap-4 items-center justify-center">
                                                                            <p className="text-neutral-500">Quét mã để
                                                                                thanh toán </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="xl:col-span-2 lg:col-span-1 md:col-span-1 sm:col-span-1">
                                                                        <div
                                                                            className="flex flex-col flex-1 items-start gap-2 ">
                                                                            <div
                                                                                className=" flex flex-col items-start mb-2">
                                                                                <p className="text-neutral-500 text-sm">Ngân
                                                                                    hàng :</p>
                                                                                <p className="text-lg text-left font-semibold text-neutral-600">Ngân
                                                                                    hàng Nông Nghiệp và Phát triển nông
                                                                                    thôn Việt Nam - Chi nhánh Mỹ
                                                                                    Đình</p>
                                                                            </div>
                                                                            <div
                                                                                className=" flex flex-col items-start mb-2">
                                                                                <p className="text-neutral-500 text-sm">Số
                                                                                    tài khoản :</p>
                                                                                <p className="text-lg text-left font-semibold text-neutral-600">180601888999</p>
                                                                            </div>
                                                                            <div
                                                                                className=" flex flex-col items-start mb-2">
                                                                                <p className="text-neutral-500 text-sm">Nội
                                                                                    dung chuyển khoản :</p>
                                                                                <p className="text-lg text-left font-semibold text-neutral-600">{data?.data?.content}</p>
                                                                            </div>
                                                                            <div
                                                                                className=" flex flex-col items-start mb-2">
                                                                                <p className="text-neutral-500 text-sm">Số
                                                                                    tiền :</p>
                                                                                <p className="text-lg text-left font-semibold text-neutral-600">{data.data.deposit_price} đ</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-neutral-700 text-left mx-3 mb-6 italic">
                                                                        Lưu ý: Khách hàng phải nhập đúng số tài khoản,
                                                                        nội dung
                                                                        và số tiền trên khi thực hiện chuyển khoản.</p>
                                                                </div>
                                                                <div className="text-left m-4">
                                                                    <button onClick={() => navigate(-1)}
                                                                            className='bg-orange-500 flex flex-row hover:border-orange-600 rounded-md items-center
                                                        py-2 gap-2 px-4 text-center text-base font-medium text-white  hover:bg-[#F27C08] active:bg-orange-400 '>
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             viewBox="0 0 448 512" fill="white"
                                                                             width="14px"
                                                                             height="14px" className="mt-0.5">
                                                                            <path
                                                                                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8
                                                                         0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5
                                                                          12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                                                                        </svg>
                                                                        <p> Quay lại</p>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tab="Thanh toán online" key="2">
                                                            <div className=" flex flex-col items-start mb-2 m-4 px-2">
                                                                <p className="text-neutral-500 text-sm">Chọn phương thức
                                                                    thanh toán</p>
                                                                <div className=" text-left mt-6 items-center">
                                                                    <div className="flex flex-col item-center ">
                                                                        <Radio.Group className="flex flex-row gap-y-1"
                                                                                     onChange={(e) =>
                                                                                         handleCheckout("payment_method", e.target.value)}
                                                                        >
                                                                            <Radio value={1}>
                                                                                <div
                                                                                    className="flex-row mt-0.5 text-base gap-2 items-center flex ">
                                                                                    <img
                                                                                        src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png"
                                                                                        style={{maxWidth: "35%"}}
                                                                                        alt=""/>
                                                                                    Momo
                                                                                </div>
                                                                            </Radio>
                                                                            <Radio value={2}>
                                                                                <div
                                                                                    className="flex-row gap-2 text-base mt-0.5 items-center flex ">
                                                                                    <img
                                                                                        src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png"
                                                                                        style={{maxWidth: "35%"}}
                                                                                        alt=""/>
                                                                                    Zalopay
                                                                                </div>
                                                                            </Radio>
                                                                        </Radio.Group>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="flex flex-row  gap-6 items-center justify-between">
                                                                    <div className="text-left  mt-8">
                                                                        <button onClick={() => navigate(-1)}
                                                                                disabled={isPending}

                                                                                className={`${!isPending ? 'bg-orange-500 hover:bg-[#F27C08]' : 'bg-gray-400 cursor-no-drop'}  flex flex-row hover:border-orange-600 rounded-md items-center
                                                                                py-2 gap-2 px-3 text-center text-base font-medium text-white  `}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                 viewBox="0 0 448 512" fill="white"
                                                                                 width="14px"
                                                                                 height="14px" className="mt-0.5">
                                                                                <path
                                                                                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8
                                                                             0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5
                                                                              12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                                                                            </svg>
                                                                            <p> Quay lại</p>

                                                                        </button>
                                                                    </div>
                                                                    <div className="text-left mt-8">
                                                                        {
                                                                            isPending ?
                                                                                <>
                                                                                    <button type="button"
                                                                                            onClick={handleSubmit}
                                                                                            className="flex cursor-no-drop items-center rounded-md bg-orange-500 hover:border-orange-500 px-4 py-2 text-white"
                                                                                            disabled>
                                                                                        <svg
                                                                                            className="mr-3 h-5 w-5 animate-spin text-white"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            fill="none"
                                                                                            viewBox="0 0 24 24">
                                                                                            <circle
                                                                                                className="opacity-25"
                                                                                                cx="12" cy="12" r="10"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="4"></circle>
                                                                                            <path className="opacity-75"
                                                                                                  fill="currentColor"
                                                                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                        </svg>
                                                                                        <span
                                                                                            className="font-medium"> Đang xác nhận... </span>
                                                                                    </button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <button onClick={handleSubmit}
                                                                                            className='bg-orange-500 flex flex-row hover:border-orange-600 rounded-md items-center
                                                                                    py-2 gap-2 px-6 text-center text-base font-medium text-white  hover:bg-[#F27C08] active:bg-orange-400 '>
                                                                                        <p> Xác nhận</p>
                                                                                    </button>
                                                                                </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TabPane>
                                                    </Tabs>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
            </MainLayOut>
        </>
    )
}
export default CheckOut

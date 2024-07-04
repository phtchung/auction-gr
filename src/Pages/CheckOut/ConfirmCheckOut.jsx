import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {useQuery} from "@tanstack/react-query";
import {getConfirmDeposit} from "../../Services/biddingService.jsx";
import {useParams} from "react-router-dom";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import {formatMoney} from "../../Utils/constant.js";

const ConfirmCheckOut = () => {
    const {id} = useParams()

    const {data, isSuccess, isLoading, isError} = useQuery({
        queryKey: ["getConfirmDeposit", id],
        queryFn: () => getConfirmDeposit(id),
        staleTime: 20 * 1000,
        select: (data) => data.data,
        enabled: !!id,
    });
    return (
        <MainLayOut>
            <div className="md:container">
                {
                    isLoading ?
                        <>
                            <CustomSpinner h={12} w={12} font={'sm'}/>
                        </>
                        :
                        isError ?
                            <>
                                <FZFNotFound error={'Rất tiếc,đã xảy ra lỗi hoặc bạn đã đăng ký thành công phiên đấu giá này.'}
                                urlReturn={'/auctionStream'} btnText={'Trở về'}/>
                            </>
                            :
                            isSuccess &&
                            <>
                            <main className="bg-white mx-10 px-4 pb-12 pt-8 sm:px-6 sm:pt-16 lg:px-8 lg:pt-28">
                                    <div className=" ">
                                        <div className=" text-center">
                                            <h1 className=" font-medium text-neutral-600 text-lg"></h1>
                                            <p className="mt-2 text-4xl font-bold tracking-tight">Bạn đã đăng kí đấu giá
                                                thành công!</p>
                                            <p className="mt-2 text-base text-gray-500">Vui lòng kiểm tra email cá nhân
                                                để nhận thông tin cần thiết về phiên đấu giá sau vài phút. </p>
                                            <dl className="mt-8 text-sm font-medium">
                                                <dt className="text-gray-900"> Mã đăng kí :</dt>
                                                <dd className="mt-2 text-gray-700">#{data?.registration?._id}</dd>
                                            </dl>
                                        </div>

                                        <section aria-labelledby="order-heading"
                                                 className="mt-10 mx-8 border-t  border-gray-200">

                                            <div className=" grid lg:grid-cols-4 sm:grid-cols-1  border-b border-gray-200 py-6">
                                                <div className="lg:col-span-3 sm:col-span-1 min-[200px]:col-span-1 flex flex-row">
                                                    <img
                                                        src={data?.product_id?.main_image}
                                                        alt="Image"
                                                        className=" flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-32 sm:w-32"
                                                    />
                                                    <div className="flex flex-auto text-left ml-6 flex-col">
                                                        <div>
                                                            <h4 className=" text-lg truncate font-medium text-neutral-600">
                                                                {data?.product_id?.product_name}
                                                            </h4>
                                                        </div>

                                                        <dl className="flex flex-col gap-2 mt-2  ">
                                                            <div className="flex text-sm font-medium gap-5 mt-3">
                                                                <dt className=" text-gray-500">Chất lượng</dt>
                                                                <dd className=" text-gray-900">{data?.product_id?.rank}</dd>
                                                            </div>
                                                            <div className="flex text-sm font-medium gap-5">
                                                                <dt className=" text-gray-500">Trạng thái</dt>
                                                                <dd className="text-gray-900">{data?.product_id?.is_used === 1 ? 'Đã sử dụng' : 'Chưa sử dung'}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>


                                                <dl className=" mx-8 lg:col-span-1 min-[200px]:col-span-1 lg:flex-row gap-4 flex sm:flex-col sm:mt-5  sm:col-span-1 text-sm">
                                                    <span
                                                        className=" lg:border-r sm:border-t  border-gray-200 divide-x "></span>
                                                    <div>
                                                        <dt className="font-medium text-gray-900">Phương thức thanh toán</dt>
                                                        <dd className="mt-2 text-base font-medium text-gray-900">
                                                            {data?.registration?.payment_method === 1 ?
                                                                <div
                                                                    className="flex-row mt-0.5 text-base gap-2 items-center flex ">
                                                                    <img
                                                                        src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png"
                                                                        style={{maxWidth: "30%"}} alt=""/>
                                                                    Ví Momo
                                                                </div> :
                                                                data?.registration?.payment_method === 2 ?
                                                                    <div
                                                                        className="flex-row gap-2 text-base mt-0.5 items-center flex ">
                                                                        <img
                                                                            src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png"
                                                                            style={{maxWidth: "30%"}} alt=""/>
                                                                        Zalopay
                                                                    </div>
                                                                    :
                                                                    <p>Chuyển khoản </p>
                                                            }
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>

                                            <div className="sm:ml-40 sm:pl-6">
                                                <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                                                    <div className="flex justify-between">
                                                        <dt className="font-medium text-gray-900">Thành tiền</dt>
                                                        <dd className="text-gray-700">{formatMoney(data?.deposit_price)} VND</dd>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <dt className="font-medium text-gray-900">Phí đăng kí</dt>
                                                        <dd className="text-gray-700">10,000 VND</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="font-medium text-gray-900">Tổng tiền</dt>
                                                        <dd className="text-gray-900">{formatMoney(parseInt(data?.deposit_price) + 10000)} VND</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </section>
                                        <button
                                            className='bg-orange-500 mt-12 ml-auto mr-6 flex flex-row hover:border-orange-600 rounded-md items-center
                                                        py-2 gap-2 px-3 text-center text-base font-medium text-white  hover:bg-[#F27C08] active:bg-orange-400 '>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 448 512" fill="white" width="14px"
                                                 height="14px" className="mt-0.5">
                                                <path
                                                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                                            </svg>
                                            <a href="/auctionStream" className="text-white hover:text-white"> Về trang chủ</a>
                                        </button>
                                    </div>
                                </main>
                            </>
                }
            </div>
        </MainLayOut>
    )
}

export default ConfirmCheckOut

import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import ReturnSvg from "../../assets/return.jsx";
import {formatMoney, getLevel} from "../../Utils/constant.js";
import useDepositRegistration from "./useDepositRegistration.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";

const ConfirmRegistration = () => {
    const {data, isSuccess , isLoading, isError} = useDepositRegistration()
    console.log(data?.auction_deposit)
    return (
        <MainLayOut>
            <div className="md:container">
                {
                    isLoading ?
                        <CustomSpinner h={12} w={12} font={'sm'}/>
                        :
                         !data.auction_deposit ?
                            <>
                                <FZFNotFound error={'Rất tiếc, đã xảy ra lỗi hoặc bạn đã đăng ký cọc đấu giá.'}
                                             urlReturn={'/auctionStream'} btnText={'Trở về'}/>
                            </>
                            :
                            isSuccess &&
                            <>
                                <main className="bg-white mx-10 px-4 pb-12 pt-8 sm:px-6 sm:pt-16 lg:px-8 lg:pt-28">
                                    <div className=" ">
                                        <div className="mt-6 text-center">
                                            <h1 className=" font-medium text-neutral-600 text-lg"></h1>
                                            <p className="mt-2 text-4xl font-bold tracking-tight">Bạn đã đăng kí cọc đấu giá thành công!</p>
                                            <p className="text-base mt-6 text-gray-500">Với mức đăng ký này bạn sẽ được tham gia đấu giá các sản phẩm {getLevel(data.auction_deposit).price}. </p>

                                        </div>

                                        <section aria-labelledby="order-heading"
                                                 className="mt-10 mx-8 border-t  border-gray-200">
                                            <div className="sm:ml-40 sm:pl-6">
                                                <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                                                    <div className="flex justify-between">
                                                        <dt className="font-medium text-gray-900">Mức cọc đăng ký</dt>
                                                        <dd className="text-gray-700">Mức {getLevel(data.auction_deposit).level} </dd>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <dt className="font-medium text-gray-900">Phí đăng kí</dt>
                                                        <dd className="text-gray-700">{formatMoney(data.auction_deposit*1000)} đ</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </section>
                                        <button
                                            className='bg-orange-500 mt-12 ml-auto mr-6 flex flex-row hover:border-orange-600 rounded-md items-center
                                                        py-2 gap-2 px-3 text-center text-base font-medium text-white  hover:bg-[#F27C08] active:bg-orange-400 '>
                                            <ReturnSvg/>
                                            <a href="/depositRegistration" className="text-white hover:text-white"> Về trang chủ</a>
                                        </button>
                                    </div>
                                </main>
                            </>
                }
            </div>
        </MainLayOut>
    )
}

export default ConfirmRegistration

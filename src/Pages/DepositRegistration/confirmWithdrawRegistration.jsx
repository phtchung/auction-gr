import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import ReturnSvg from "../../assets/return.jsx";
import useDepositRegistration from "./useDepositRegistration.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";

const ConfirmWithdrawRegistration = () => {
    const {data, isSuccess , isLoading, isError} = useDepositRegistration()
    return (
        <MainLayOut>
            <div className="md:container">
                {
                    isLoading ?
                        <CustomSpinner h={12} w={12} font={'sm'}/>
                        :
                        data.auction_deposit ?
                            <>
                                <FZFNotFound error={'Rất tiếc, đã có lỗi xảy ra.'}
                                             urlReturn={'/auctionStream'} btnText={'Trở về'}/>
                            </>
                            :
                            isSuccess &&
                            <>
                                <main className="bg-white mx-10 px-4 pb-12 pt-8 sm:px-6 sm:pt-16 lg:px-8 lg:pt-28">
                                    <div className=" ">
                                        <div className="mt-6 text-center">
                                            <h1 className=" font-medium text-neutral-600 text-lg"></h1>
                                            <p className="mt-2 text-4xl font-bold tracking-tight">Yêu cầu hoàn phí đăng ký đấu giá thành công!</p>
                                            <p className="text-base mt-6 text-gray-500">Phí đăng ký sẽ hoàn vào tài khoản của bạn sau 24h. </p>

                                        </div>
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

export default ConfirmWithdrawRegistration

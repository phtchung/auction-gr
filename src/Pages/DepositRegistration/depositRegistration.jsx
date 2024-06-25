import SideBar from "../../Components/SideBar/index.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Radio, Tabs} from "antd";
const TabPane = Tabs.TabPane
import {CheckOutlined, LeftOutlined} from '@ant-design/icons';
import CardDeposit from "../../Components/Card/depositRegistration.jsx";
import {cardDepositRegis, getLevel} from "../../Utils/constant.js";
import {useEffect, useState} from "react";
import LoadingSvg from "../../assets/loading.jsx";
import {useMutation} from "@tanstack/react-query";
import {CheckOutRegistrationDeposit, WithdrawRegistrationDeposit} from "../../Services/biddingService.jsx";
import {toast} from "react-toastify";
import useDepositRegistration from "./useDepositRegistration.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import useProductBidding from "../ProductBidding/useProductBidding.jsx";

const DepositRegistration = () => {
    const {data, isSuccess , isLoading, isError : err} = useDepositRegistration()
    const [isPaymentScreen, setIsPaymentScreen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState({payment_method : 1});
    const [dataWithdraw , setDataWithDraw] = useState({})
    const {isSuccess : sc , data : dataBidding,} = useProductBidding();

    const handleSelect = (data) => {
        setSelectedPackage({...selectedPackage,data})
        setIsPaymentScreen(true);
    };

    const handleReturn = () => {
        setIsPaymentScreen(false);
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isPaymentScreen]);

    const {mutate, isError, isPending} = useMutation({
        mutationFn: async (checkoutInfor) => {
            try {
                const res = await CheckOutRegistrationDeposit(checkoutInfor)
                const data = res.data
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
        if (selectedPackage) {
            mutate(selectedPackage);
        } else {
            toast.error('Chưa chọn mức đăng ký cọc')
        }
    };

    const {mutate : mutate1, isError : isError1, isPending : isPending1 ,error} = useMutation({
        mutationFn: async (checkoutInfor) => {
            try {
                const res = await WithdrawRegistrationDeposit(checkoutInfor)
                const data = res.data
                return data;
            } catch (error) {
                console.log(error.response.data);
                throw error.response.data;
            }
        },
        onSuccess: (data) => {
            window.location.href = data.returnUrl;
        },
    });

    const handleRequest = (e) => {
        e.preventDefault();
        if (dataWithdraw) {
            mutate1(dataWithdraw);
        } else {
            toast.error('Chưa điền đủ thông tin cần thiết.')
        }
    };

    return (
        <>
            <MainLayOut>
                <div className="wrapper ">
                    <SideBar/>
                    <div className="home-right">
                        <div className="">
                            <div className="text-left px-5 pt-3 pb-3 text-xl  font-bold text-neutral-600  bg-white">
                                Đăng ký cọc đấu giá
                            </div>

                            <div className="border-b-2 border-gray-300">
                                <div
                                    className="lg:col-span-2 md:col-span-1 sm:col-span-1 px-1.5 mt-4 md:ml-0 md:mt-6 sm:ml-0  lg:mt-0 sm:mt-6">
                                    <div className="w-full h-full rounded-lg ">
                                        <div className="h-full  py-2 px-2">
                                            <Tabs size={"large"} defaultActiveKey="1" centered
                                                  tabBarGutter={200}
                                                  indicator={{size: 300}}>
                                                <TabPane tab="Đăng ký cọc" key="1">
                                                    {
                                                        isLoading ?
                                                            <CustomSpinner h={10} w={10} font={'sm'}/>
                                                            :
                                                            <>
                                                            {
                                                                isSuccess &&
                                                                (
                                                                    data.auction_deposit === 0 ?
                                                                        <>{
                                                                        !isPaymentScreen ?
                                                                            <>
                                                                                        <div className="flex flex-col gap-4">
                                                                                            <div
                                                                                                className="p-4 grid mt-3 h-full xl:grid-cols-3 gap-5 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                                                                                                {cardDepositRegis.map((card, index) => (
                                                                                                    <CardDeposit
                                                                                                        select = {handleSelect}
                                                                                                        key={index}
                                                                                                        price={card.price}
                                                                                                        deposit={card.deposit}
                                                                                                        level={card.level}
                                                                                                    />
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                            :
                                                                            <>
                                                                                <div className="p-8 ">
                                                                                            <div className="mx-auto max-w-md font-medium">
                                                                                                <div
                                                                                                    className="flex text-xl font-bold  text-neutral-600 mb-4 gap-2 items-center flex-row">
                                                                                                    <LeftOutlined
                                                                                                        onClick={handleReturn}
                                                                                                        style={{
                                                                                                            fontSize: '16px',
                                                                                                            cursor: 'pointer',
                                                                                                            color: '#f15502'
                                                                                                        }}/>
                                                                                                    <h3>Mức {selectedPackage.data.level}</h3>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="flex text-neutral-600  flex-row gap-1 ">
                                                                                                    <CheckOutlined style={{
                                                                                                        fontSize: '14px',
                                                                                                        color: '#f15502'
                                                                                                    }}/>
                                                                                                    <div> Tham gia phiên đấu giá {selectedPackage.data.price} <span
                                                                                                        className="text-orange-500"></span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="flex text-neutral-600 flex-row gap-2 ">
                                                                                                    <CheckOutlined style={{
                                                                                                        fontSize: '14px',
                                                                                                        color: '#f15502'
                                                                                                    }}/>
                                                                                                    <div> Hoàn cọc bất kỳ lúc nào bạn muốn</div>
                                                                                                </div>

                                                                                                <div
                                                                                                    className="mt-6 border-t border-orange-500">
                                                                                                    <div
                                                                                                        className="flex mt-2 flex-row justify-between text-lg items-center font-semibold text-neutral-600">
                                                                                                        <div>Tổng tiền</div>
                                                                                                        <div>{selectedPackage.data.deposit},000 VNĐ</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className=" text-left mt-6 items-center">
                                                                                                    <div className="flex flex-col item-center ">
                                                                                                        <Radio.Group
                                                                                                            className="flex flex-row gap-y-1"
                                                                                                            defaultValue={1}
                                                                                                            onChange={(e) => setSelectedPackage({...selectedPackage,payment_method: e.target.value})}
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
                                                                                                    <div className="text-left mt-6">
                                                                                                        {
                                                                                                            isPending ?
                                                                                                                <>
                                                                                                                    <button type="button"
                                                                                                                        // onClick={handleSubmit}
                                                                                                                            className="flex cursor-no-drop items-center rounded-md bg-orange-500 hover:border-orange-500 px-4 py-2 text-white"
                                                                                                                            disabled>
                                                                                                                        <LoadingSvg/>
                                                                                                                        <span
                                                                                                                            className="font-medium"> Đang thanh toán... </span>
                                                                                                                    </button>
                                                                                                                </>
                                                                                                                :
                                                                                                                <>
                                                                                                                    <button
                                                                                                                        onClick={handleSubmit}
                                                                                                                        className='bg-orange-500 flex flex-row hover:border-orange-600 rounded-md items-center
                                                                                                                           py-2 gap-2 px-6 text-center text-base font-medium text-white  hover:bg-[#F27C08] active:bg-orange-400 '>
                                                                                                                        <p> Thanh toán</p>
                                                                                                                    </button>
                                                                                                                </>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                            </>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <div
                                                                                className="my-6 font-medium text-center flex flex-col gap-3  text-base text-neutral-600">Bạn
                                                                                đã đăng ký cọc đấu giá mức {getLevel(data?.auction_deposit).level}.
                                                                                <div
                                                                                    className="flex text-neutral-600 justify-center  flex-row gap-1 ">
                                                                                    <CheckOutlined style={{
                                                                                        fontSize: '14px',
                                                                                    }}/>
                                                                                    <div className=" font-bold text-neutral-800 text-lg"> Tham gia phiên đấu
                                                                                        giá {getLevel(data?.auction_deposit).price}
                                                                                    </div>
                                                                                </div>
                                                                                Để đăng ký mức cọc mới, trước tiên hãy hủy mức cọc
                                                                                hiện tại.
                                                                            </div>
                                                                        </>
                                                                )
                                                            }

                                                            </>
                                                    }

                                                </TabPane>
                                                <TabPane tab="Yêu cầu hoàn cọc" key="2">
                                                    <div className=" flex flex-col items-start mb-2 m-4 px-2">
                                                        {
                                                            isLoading ?
                                                                <>
                                                                    <CustomSpinner h={10} w={10} font={'sm'}/>
                                                                </>
                                                                :
                                                                <>
                                                                {
                                                                    isSuccess && sc && (
                                                                        !data.auction_deposit ?
                                                                            <>
                                                                                <p className="text-neutral-500 flex mx-auto text-center mt-4 text-base">Bạn chưa đăng ký mức cọc đấu giá nào.</p>
                                                                            </>
                                                                            :
                                                                            <>{
                                                                                data.checkBidding || dataBidding.pages.length !== 0  ?
                                                                                    <>
                                                                                        <p className="text-neutral-700 gap-4 flex flex-col justify-center text-center text-base mx-auto">
                                                                                            Sản phẩm của bạn đang được bán đấu giá hoặc
                                                                                            Bạn đang đang trong quá trình đấu giá sản phẩm.
                                                                                            <p>
                                                                                                Vui lòng yêu cầu lại sau khi hoàn tất nhận hàng.
                                                                                            </p>
                                                                                        </p>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <form className="bg-white w-full mx-auto lg:w-1/2 flex flex-col" onSubmit={handleRequest}>
                                                                                            <div className="max-w-lg font-medium text-neutral-600 w-full m-auto px-6 py-6 sm:py-10">
                                                                                                <div className="mb-5">
                                                                                                    <label  className="block text-sm font-medium mb-2 dark:text-white">Card number</label>
                                                                                                    <input
                                                                                                        onChange={(e) => setDataWithDraw({...dataWithdraw, cardNumber : e.target.value})} required type="text" id="input-number"
                                                                                                        className="py-3 px-4 block w-full border-orange-200 border focus:outline-orange-300  rounded-lg text-sm  placeholder-gray-400  shadow-sm" placeholder="0000 0000 0000 0000"/>
                                                                                                </div>
                                                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                                                                                    <div className="mb-5">
                                                                                                        <label  className="block text-sm font-medium mb-2 dark:text-white">Expiration</label>
                                                                                                        <input
                                                                                                            onChange={(e) => setDataWithDraw({...dataWithdraw,expiration : e.target.value})} required type="text" id="input-number"
                                                                                                            className="py-3 px-4 block w-full border-orange-200 border focus:outline-orange-300 rounded-lg text-sm   placeholder-gray-400  shadow-sm" placeholder="MM/YY"/>
                                                                                                    </div>
                                                                                                    <div className="mb-5">
                                                                                                        <label  className="block text-sm font-medium mb-2 dark:text-white">CVC</label>
                                                                                                        <input
                                                                                                            onChange={(e) => setDataWithDraw({...dataWithdraw,cvc : e.target.value})} required type="text" id="input-number"
                                                                                                            className="py-3 px-4 block w-full border-orange-200 border focus:outline-orange-300 rounded-lg text-sm  placeholder-gray-400 shadow-sm" placeholder="CVC"/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="mb-5">
                                                                                                    <label  className="block text-sm font-medium mb-2 dark:text-white">Cardholder name</label>
                                                                                                    <input
                                                                                                        onChange={(e) => setDataWithDraw({...dataWithdraw,cardName : e.target.value})} required type="text" id="input-number"
                                                                                                        className="py-3 px-4 block w-full border-orange-200 border focus:outline-orange-300  rounded-lg text-sm  placeholder-gray-400 shadow-sm" placeholder="Nguyen Van A"/>
                                                                                                </div>

                                                                                                {isPending1 ?
                                                                                                    <>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className=" cursor-no-drop flex items-center rounded-md bg-orange-500 hover:border-orange-500 px-4 py-2 text-white"
                                                                                                            disabled>
                                                                                                            <LoadingSvg/>
                                                                                                            <span
                                                                                                                className="font-medium"> Đang xác nhận... </span>
                                                                                                        </button>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        <button
                                                                                                            className='bg-orange-500  hover:border-orange-600 rounded-md items-center
                                                                                                                py-2 gap-2 px-6 text-center text-base font-medium text-white  hover:bg-[#F27C08] active:bg-orange-400 '>
                                                                                                            <p> Xác nhận</p>
                                                                                                        </button>
                                                                                                    </>
                                                                                                }

                                                                                                {
                                                                                                    isError1 &&
                                                                                                    <div
                                                                                                        className="mt-4 text-sm text-red-500">
                                                                                                        {error.message}
                                                                                                    </div>
                                                                                                }
                                                                                            </div>
                                                                                        </form>

                                                                                    </>
                                                                            }
                                                                            </>
                                                                    )
                                                                }</>
                                                        }

                                                        <div className="flex flex-row  gap-6 items-center justify-between">
                                                            <div className="text-left mt-8">

                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayOut>
        </>
    )
}
export default DepositRegistration

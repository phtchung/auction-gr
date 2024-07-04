import {Breadcrumb} from "antd";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {formatDateTimeMiliSecond, formatMoney, readMoney} from "../../Utils/constant.js";
import {useEffect, useState} from "react";
import {Modal} from 'antd';
import {toast} from "react-toastify";
import {BuyAuctionPriceDown, sendStreamBid } from "../../Services/biddingService.jsx";
import { NavLink, useLocation, useParams} from "react-router-dom";
import {ArrowLeftOutlined, CheckCircleOutlined, CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import {useAuthContext} from "../Context/AuthContext.jsx";
import useAuctionOnlineTracking from "../../zustand/useAuctionOnlineTracking.jsx";
import useListenBidding from "../../Hooks/useListenBidding.js";
import CountDownOnline from "../../Components/Clock/countDownOnline.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import useAuctionStreamPriceDown from "./useAuctionStreamPriceDown.jsx";
import YouTubeEmbed from "../../Components/YouTubeEmbed/index.jsx";

const AuctionStreamPriceDown = () => {
    const {id} = useParams();
    const {selectedAuction, setSelectedAuction, setBidList, setHighestPrice} = useAuctionOnlineTracking()
    const query = new URLSearchParams(useLocation().search);
    const accessCode = query.get('accessCode') || null;
    const [auctionData,setAuctionData] = useState({productId:id, accessCode : accessCode})

    const [state, setState] = useState(null)
    const {currentUser} = useAuthContext();
    const [open, setOpen] = useState(false)
    useListenBidding()
    useEffect(() => {
        setSelectedAuction(id)
    }, [id]);

    const {
        isLoading,
        isSuccess,
        fullBidListData,
        isSc,
        isLd,
        productData,
        highestPrice,
        bidList,
        isError
    } = useAuctionStreamPriceDown(state)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnlineBidding =  async (new_price) => {
        try{
            const res = await sendStreamBid({...auctionData,final_price:new_price});
            setAuctionData({productId:id , accessCode : accessCode})
            const data = res.data.new_bid
        }catch (error) {
            toast.error(error?.response?.data?.message,{
                position: "top-right",
            });
        }
    }

    const handleBuyProduct = async () => {
        try {
            const res = await BuyAuctionPriceDown({...auctionData, final_price: highestPrice});
            setAuctionData({productId: id})
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setState(null)
        setIsModalOpen(false);
    };
    const getFullBidList = () => {
        setState(1)
        showModal()
    }

    const modalStyles = {
        body: {maxHeight: '450px', overflowY: 'auto', marginRight: '-10px'},
        header: {
            backgroundColor: '#fdb45b',
            textAlign: 'center',
            fontWeight: 700,
        },
        content: {
            backgroundColor: '#fdb45b',
            borderRadius: 0,
            color: '#363534',
        },
    };

    return (
        <>
            <MainLayOut>
                <div className="md:container">
                    {isLoading ?
                        <>
                            <CustomSpinner h={12} w={12} font={'sm'}/>
                        </> :
                        isError ?
                            <FZFNotFound btnText={'Trở về'} error={'Rất tiếc, hệ thống không tìm thấy phiên đấu giá.'}
                                         urlReturn={'/streamGeneral'}/>
                            :
                            isSuccess &&
                            <>
                                {
                                    productData.type_of_auction === -1 ?
                                        <>
                                            <div className="mt-24">
                                                <div className=" mt-2">
                                                    <Breadcrumb
                                                        items={[
                                                            {
                                                                title: <div  className="  p-1 px-4">
                                                                    <NavLink className="hover:bg-orange-500"  to={'/streamGeneral'}>
                                                                        <ArrowLeftOutlined  style={{fontSize : 24 , width : 28}} />
                                                                    </NavLink>
                                                                </div>,
                                                            },
                                                        ]}
                                                    />
                                                </div>

                                                <div className="grid md:grid-cols-4 bg-orange-400  items-center gap-6 p-5 m-2 mt-4 "
                                                     // style={{backgroundColor: '#ef9731'}}
                                                >
                                                    <div className="lg:col-span-2 md:col-span-4  sm:col-span-2" style={{height:'100%'}}>
                                                        {
                                                            productData?.url_stream ?
                                                                <YouTubeEmbed videoUrl={productData.url_stream}/>
                                                                :
                                                                <>
                                                                    <div className="my-14 mx-4">
                                                                        <div
                                                                            className="flex border border-neutral-200 w-full h-full items-center justify-center text-lg text-white font-medium">
                                                                            Sự kiện trực tiếp chưa bắt đầu !
                                                                        </div>
                                                                    </div>
                                                                </>
                                                        }
                                                    </div>

                                                    <div className="lg:col-span-2 md:col-span-4 sm:col-span-2">
                                                        <div
                                                            className="flex flex-row mx-8 items-center justify-between">
                                                            <div>
                                                                <div
                                                                    className="text-xl mx-2 font-semibold text-orange-900"> {productData?.room_id}</div>
                                                                <div
                                                                    onClick={() => setOpen(!open)}
                                                                    className="pt-2 text-center hover:underline text-orange-100 cursor-pointer text-base font-semibold hover:text-orange-800">
                                                                    Chi tiết
                                                                </div>
                                                            </div>


                                                            <CountDownOnline id={productData?._id}
                                                                             targetDate={productData?.finish_time}/>
                                                        </div>


                                                        {/*thông tinn đấu giá*/}
                                                        <div
                                                            className="flex flex-col ring-2 ring-orange-600 text-white lg:min-h-[12.625rem] md:min-h-[13rem] sm:min-h-[13.3rem]
                                                      min-[400px]:min-h-[14.8rem] bg-orange-300 shadow-lg shadow-orange-500/50 font-sans text-left mt-6 mx-10 mb-6"
                                                            style={{
                                                                // backgroundColor: '#f1a851',
                                                                minHeight: '12.625rem'
                                                            }}>
                                                            <div style={{
                                                                fontWeight: 600,
                                                                textShadow: '0px 0px 10px #ccc3b8'
                                                            }}
                                                                 className="flex flex-row justify-between items-center border-b border-orange-500 shadow-blue-100 px-5   p-2 pr-6 relative">
                                                            <span className="text-base md:block  flex  gap-3  ">
                                                               Diễn biến cuộc đấu giá
                                                            </span>
                                                                <span onClick={getFullBidList}
                                                                      className="text-sm hover:text-orange-700 cursor-pointer  hover:underline ">
                                                            Xem tất cả
                                                             </span>
                                                            </div>

                                                            {
                                                                bidList && bidList.length !== 0 ?
                                                                    bidList.slice(0, 3).map((bid, index) => (
                                                                        <>
                                                                            <div key={index}
                                                                                 className="grid grid-cols-2 justify-between items-center ">
                                                                                <div style={{fontWeight: 600}}
                                                                                     className=" sm:px-6 min-[200px]:px-3 p-1.5 flex flex-col  relative">
                                                                                    <span className="flex gap-3">
                                                                                        <h1 className={`text-base shadow-black ${index === 0 ? 'text-orange-900 font-bold' : ''}`}
                                                                                            style={{textShadow: '#f1a851 1px 0 10px'}}>
                                                                                        {formatMoney(bid.bid_price)} VND
                                                                                        </h1>
                                                                                        {
                                                                                            bid.username === currentUser.username &&
                                                                                            <CheckCircleOutlined
                                                                                                style={{color: "green"}}/>
                                                                                        }
                                                                                    </span>
                                                                                    <span
                                                                                        className="text-xs text-gray-200">
                                                                                        {formatDateTimeMiliSecond(bid.bid_time)}
                                                                                    </span>
                                                                                </div>
                                                                                <div
                                                                                    className="px-6 justify-self-end font-semibold text-orange-800 text-base">
                                                                                    {bid.username}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                    :
                                                                    <>
                                                                        <h5 className="text-sm font-medium text-center mt-10">
                                                                            Không có dữ liệu</h5>
                                                                    </>
                                                            }
                                                        </div>

                                                        <div
                                                            className="flex flex-col ring-2 ring-orange-600 bg-orange-200 text-white  shadow-lg shadow-orange-500/50 font-sans text-left  mx-10 "
                                                        >
                                                            <div style={{
                                                                fontWeight: 600,
                                                                textShadow: '0px 0px 10px #ccc3b8'
                                                            }}
                                                                 className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5 p-2 pr-6 relative">
                                                                    <span className="text-base flex gap-3  ">
                                                                          <img
                                                                              src="https://storage.googleapis.com/auction_gr/label.png"
                                                                              alt=""
                                                                              style={{width: '17%'}}/>
                                                                       Giá hiện tại
                                                                    </span>
                                                                <span className="text-base font-semibold text-orange-900   ">
                                                                         {formatMoney(highestPrice)} VND
                                                                    </span>
                                                            </div>

                                                            <div className="justify-between items-center ">
                                                                <div className="flex flex-row justify-between m-2">
                                                                    {
                                                                        highestPrice - productData.step_price >= productData.min_price &&
                                                                        <>
                                                                            <div
                                                                                onClick={() => handleOnlineBidding(highestPrice - productData.step_price)}
                                                                                className="p-3 w-2/3 text-center cursor-pointer  md:text-lg min-[200px]:text-base bg-orange-600 hover:bg-orange-800 mx-2 mt-3 mb-3 font-semibold">
                                                                                    <span
                                                                                        className="font-semibold text-cyan-50">Trả giá
                                                                                        <span
                                                                                            className='font-bold '> {formatMoney(highestPrice - productData.step_price)} VND
                                                                                        </span>
                                                                                    </span>
                                                                            </div>
                                                                        </>
                                                                    }

                                                                    <div
                                                                        onClick={handleBuyProduct}
                                                                        className={`p-3 ${highestPrice - productData.step_price >= productData.min_price ? 'w-1/3' : 'w-full pr-2'} md:text-lg min-[200px]:text-base  text-center cursor-pointer 
                                                                       bg-orange-800 hover:bg-orange-600 mx-2 mt-3 mb-3 font-semibold text-lg`}
                                                                    >
                                                                        <span>
                                                                            Mua {highestPrice - productData.step_price >= productData.min_price ? '' : formatMoney(highestPrice) + 'đ'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    highestPrice - productData.step_price >= productData.min_price &&
                                                                    <>
                                                                        <div
                                                                            className="text-xs capitalize text-center m-2">{readMoney(highestPrice - productData.step_price)} Đồng
                                                                        </div>
                                                                    </>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Modal
                                                header={null}
                                                closable={false}
                                                footer={null} centered open={open}
                                                onCancel={() => setOpen(!open)}>
                                                {
                                                    <div
                                                        className=" flex flex-wrap  bg-white justify-center items-center w-full h-full overflow-auto">
                                                        <div
                                                            className="w-full max-w-lg  shadow-lg rounded-md p-3 relative">
                                                            <svg onClick={() => setOpen(!open)}
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-orange-500 float-right"
                                                                 viewBox="0 0 320.591 320.591">
                                                                <path
                                                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822
                                                 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                                                    data-original="#000000"></path>
                                                                <path
                                                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736
                                                 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                                                    data-original="#000000"></path>
                                                            </svg>
                                                            <div
                                                                className="grid text-left grid-cols-1 gap-3 text-sm  p-2 text-neutral-800">
                                                                <div
                                                                    className="text-xl font-medium ">{productData?.product_id?.product_name}
                                                                </div>
                                                                <div className="flex flex-col ">
                                                                    <div
                                                                        className=" font-medium text-neutral-500">Thương
                                                                        hiệu
                                                                    </div>
                                                                    <div
                                                                        className="text-black font-semibold text-lg">{productData?.product_id?.brand}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col ">
                                                                    <div
                                                                        className=" font-medium text-neutral-500 mb-2">Chất
                                                                        lượng : {productData?.product_id?.rank}
                                                                    </div>

                                                                </div>

                                                                <div className="flex flex-col ">
                                                                    <div
                                                                        className=" font-medium text-neutral-500 mb-2">Trạng
                                                                        thái
                                                                        : {productData?.product_id?.is_used === 1 ? 'Đã sử dụng' : 'Chưa sử dụng'}
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-row items-center">
                                                                    <span className="font-medium text-neutral-600 mr-2">Trả hàng</span>
                                                                    {
                                                                        productData?.product_id?.can_return === 1 ?
                                                                            <CheckCircleTwoTone
                                                                                className="pt-0.5 text-base"
                                                                                twoToneColor="#52c41a"/>
                                                                            :
                                                                            <CloseCircleTwoTone
                                                                                className="pt-0.5 text-base"
                                                                                twoToneColor="#e0080e"/>
                                                                    }
                                                                </div>

                                                                <div className="flex flex-row items-center gap-4 ">
                                                                    <div className=" font-medium text-neutral-500">Phí
                                                                        giao hàng
                                                                    </div>
                                                                    <div
                                                                        className=" ">{formatMoney(productData?.shipping_fee)} VND
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-row items-center gap-4 ">
                                                                    <div className=" font-medium text-neutral-500">Giá tối thiểu
                                                                    </div>
                                                                    <div
                                                                        className=" ">{formatMoney(productData?.min_price)} VND
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-col ">
                                                                    <div className=" font-medium text-neutral-500">Mô tả
                                                                        sản phẩm
                                                                    </div>
                                                                    <div
                                                                        className="font-medium text-neutral-600 text-sm">
                                                                        {productData?.product_id?.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </Modal>

                                            <Modal styles={modalStyles} title="Diễn biến các lệnh trả giá"
                                                   className="overflow-auto text-white"
                                                   footer={null} centered open={isModalOpen}
                                                   onCancel={handleCancel}>
                                                {
                                                    isSc ?
                                                        fullBidListData.length !== 0 ?
                                                            fullBidListData.map((bid, index) => (
                                                                <>
                                                                    <div key={index}
                                                                         className="flex justify-between my-2.5 items-center ">
                                                                        <div style={{fontWeight: 600}}
                                                                             className="flex flex-col  relative">
                                                                            <h1 className='text-base font-semibold shadow-black'>
                                                                                {formatMoney(bid.bid_price)} đ
                                                                            </h1>
                                                                            <span className="text-xs"
                                                                                  style={{color: '#676464'}}
                                                                            >
                                                                    {formatDateTimeMiliSecond(bid.bid_time)}
                                                                </span>
                                                                        </div>
                                                                        <div
                                                                            className="px-6 font-medium opacity-90 text-base">
                                                                            {bid.username}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))
                                                            :
                                                            <>
                                                                <div className="text-center font-medium my-14">Không có
                                                                    dữ
                                                                    liệu
                                                                </div>
                                                            </>
                                                        :
                                                        <>
                                                            <CustomSpinner h={8} w={8} font={'xs'}/>
                                                        </>
                                                }
                                            </Modal>
                                        </>
                                        :
                                        <FZFNotFound btnText={'Trở về'}
                                                     error={'Rất tiếc, hệ thống không tìm thấy phiên đấu giá.'}
                                                     urlReturn={'/auctionRealtime'}/>
                                }
                            </>
                    }
                </div>
            </MainLayOut>
        </>
    )
}
export default AuctionStreamPriceDown

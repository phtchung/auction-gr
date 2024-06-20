import {Breadcrumb} from "antd";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {formatDateTimeMiliSecond, formatMoney, readMoney} from "../../Utils/constant.js";
import {useEffect, useState} from "react";
import {Modal} from 'antd';
import {  Radio } from 'antd';
import {toast} from "react-toastify";
import { sendStreamBid} from "../../Services/biddingService.jsx";
import {useLocation, useParams} from "react-router-dom";
import {CheckCircleOutlined, CheckCircleTwoTone,CloseCircleTwoTone} from '@ant-design/icons';
import {useAuthContext} from "../Context/AuthContext.jsx";
import useAuctionOnlineTracking from "../../zustand/useAuctionOnlineTracking.jsx";
import useListenBidding from "../../Hooks/useListenBidding.js";
import CountDownOnline from "../../Components/Clock/countDownOnline.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import useAuctionStream from "./useAuctionStream.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import YouTubeEmbed from "../../Components/YouTubeEmbed/index.jsx";

const AuctionStream = () => {
    const { id } = useParams();
    const query = new URLSearchParams(useLocation().search);
    const accessCode = query.get('accessCode') || null;
    const {selectedAuction,setSelectedAuction  , setBidList ,  setHighestPrice } = useAuctionOnlineTracking()
    const [auctionData,setAuctionData] = useState({productId:id, accessCode : accessCode})
    const [state, setState] = useState(null)
    const { currentUser } = useAuthContext();
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
    } = useAuctionStream(state)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnlineBidding =  async (new_price) => {
        try{
            const res = await sendStreamBid({...auctionData,final_price:new_price});
            setAuctionData({productId:id})
            const data = res.data.new_bid
        }catch (error) {
            toast.error(error?.response?.data?.message,{
                position: "top-right",
            });
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
        body:{ maxHeight: '450px', overflowY: 'auto',marginRight:'-10px'},
        header:{
            backgroundColor:'#fdb45b',
            textAlign:'center',
            fontWeight:700,
        },
        content: {
            backgroundColor:'#fdb45b',
            borderRadius:0,
            color:'#363534',
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
                            <>
                                <FZFNotFound error={'Rất tiếc,bạn không đủ điều kiện tham gia phiên đấu giá hoặc phiên đấu giá đã hết thời hạn.'} urlReturn={'/streamGeneral'} btnText={'Về phòng đấu giá'}/>
                            </>
                            :
                            isSuccess &&
                        <>
                            <div className="mt-24">
                                <div className="px-3 mx-2 mt-2">
                                    <Breadcrumb
                                        items={[
                                            {
                                                title: <a href="/streamGeneral">Trở lại</a>,
                                            },
                                        ]}
                                    />
                                </div>

                                {
                                    isSuccess && <>
                                        <div className="grid md:grid-cols-4  items-center gap-6 p-5 m-2 mt-4 "
                                             style={{backgroundColor: '#ef9731'}}>

                                            <div className="lg:col-span-2 md:col-span-4  sm:col-span-2">
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
                                                                <div className="text-xl font-medium ">{productData?.product_id?.product_name}
                                                                </div>
                                                                <div className="flex flex-col ">
                                                                    <div
                                                                        className=" font-medium text-neutral-500">Thương hiệu
                                                                    </div>
                                                                    <div
                                                                        className="text-black font-semibold text-lg">{productData?.product_id?.brand}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col ">
                                                                    <div
                                                                        className=" font-medium text-neutral-500 mb-2">Chất lượng
                                                                    </div>
                                                                    <Radio.Group buttonStyle="solid" disabled   defaultChecked={true} defaultValue={productData?.product_id?.rank}
                                                                                 className="font-semibold">
                                                                        <Radio.Button value="S">S</Radio.Button>
                                                                        <Radio.Button value="A">A</Radio.Button>
                                                                        <Radio.Button value="B">B</Radio.Button>
                                                                        <Radio.Button value="C">C</Radio.Button>
                                                                        <Radio.Button value="D">D</Radio.Button>
                                                                    </Radio.Group>
                                                                </div>

                                                                <div className="flex flex-col ">
                                                                    <div
                                                                        className=" font-medium text-neutral-500 mb-2">Trạng
                                                                        thái
                                                                    </div>
                                                                    <Radio.Group buttonStyle="solid" defaultValue={productData?.product_id?.is_used}
                                                                                 className="font-semibold">
                                                                        <Radio.Button  value="0">Chưa sử
                                                                            dụng</Radio.Button>
                                                                        <Radio.Button value="1">Đã sử
                                                                            dụng</Radio.Button>
                                                                    </Radio.Group>
                                                                </div>

                                                                <div className="flex flex-row items-center">
                                                                    <span className="font-medium text-neutral-600 mr-2">Trả hàng</span>
                                                                    {
                                                                        productData?.product_id?.can_return === 1 ?
                                                                            <CheckCircleTwoTone className="pt-0.5 text-base"
                                                                                                twoToneColor="#52c41a"/>
                                                                            :
                                                                            <CloseCircleTwoTone className="pt-0.5 text-base"
                                                                                                twoToneColor="#e0080e"/>
                                                                    }

                                                                </div>

                                                                <div className="flex flex-col ">
                                                                    <div className=" font-medium text-neutral-500">Phí giao hàng
                                                                    </div>
                                                                    <div className="text-black font-semibold text-lg">{formatMoney(productData?.shipping_fee)} VNĐ
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-col ">
                                                                    <div className=" font-medium text-neutral-500">Mô tả sản phẩm
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

                                            <div className="lg:col-span-2 md:col-span-4 sm:col-span-2">
                                                <CountDownOnline id={productData?._id}
                                                                 targetDate={productData?.finish_time}/>
                                                {/*thông tinn đấu giá*/}
                                                <div
                                                    style={{color: '#395577'}}
                                                    onClick={() => setOpen(!open)}
                                                    className="pt-2 text-center hover:underline  cursor-pointer text-base font-semibold hover:text-blue-900">
                                                    Chi tiết
                                                </div>

                                                <div
                                                    className="flex flex-col ring-2 ring-orange-500 text-white lg:min-h-[12.625rem] md:min-h-[13rem] sm:min-h-[13.3rem]  min-[400px]:min-h-[14.8rem] shadow-lg shadow-orange-500/50 font-sans text-left mt-6 mx-6 mb-6"
                                                    style={{backgroundColor: '#f1a851', minHeight: '12.625rem'}}>

                                                    <div style={{fontWeight: 600, textShadow: '0px 0px 10px #ccc3b8'}}
                                                         className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5 p-2 pr-6 relative">
                                                        <span className="text-base  flex  gap-3  ">
                                                            <img className="min-[420px]:hidden md:inline-block sm:hidden" src="../../src/assets/bid.png" alt=""
                                                                 style={{width: '12%'}}/>
                                                           Diễn biến cuộc đấu giá
                                                        </span>
                                                        <span onClick={getFullBidList}
                                                              className="text-sm hover:text-blue-600 cursor-pointer  hover:underline ">
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
                                                                             className=" px-5 p-1.5 flex flex-col  relative">
                                                                                <span className="flex gap-3">
                                                                                    <h1 className={`text-base shadow-black ${index === 0 ? 'text-red-800 font-bold' : ''}`}
                                                                                        style={{textShadow: '#f1a851 1px 0 10px'}}>
                                                                                    {formatMoney(bid.bid_price)} Đ
                                                                                    </h1>
                                                                                    {
                                                                                        bid.username === currentUser.username &&
                                                                                        <CheckCircleOutlined
                                                                                            style={{color: "green"}}/>
                                                                                    }
                                                                                </span>


                                                                                    <span className="text-xs text-gray-200">
                                                                                    {formatDateTimeMiliSecond(bid.bid_time)}
                                                                                </span>
                                                                        </div>
                                                                        <div className="px-6 justify-self-end font-semibold text-base" >
                                                                            {bid.username}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))
                                                            :
                                                            <>
                                                                <h5 className="text-sm font-medium text-center mt-10">Không
                                                                    có dữ liệu</h5>
                                                            </>
                                                    }
                                                </div>

                                                <div
                                                    className="flex flex-col ring-2 ring-orange-500 text-white  shadow-lg shadow-orange-500/50 font-sans text-left  mx-6 "
                                                    style={{backgroundColor: '#f1a851'}}>
                                                    <div style={{fontWeight: 600, textShadow: '0px 0px 10px #ccc3b8'}}
                                                         className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5   p-2 pr-6 relative">
                                                        <span className="text-base flex gap-3  ">
                                                              <img src="../../src/assets/label.png" alt=""
                                                                   style={{width: '17%'}}/>
                                                           Giá hiện tại
                                                        </span>
                                                        <span className="text-base font-semibold    ">
                                                            {formatMoney(highestPrice)} Đ
                                                        </span>
                                                    </div>
                                                    <div className=" justify-between items-center ">
                                                        <div
                                                            onClick={() => handleOnlineBidding(highestPrice + productData.step_price)}
                                                            className="p-3 text-center cursor-pointer bg-gradient-to-r from-orange-500 to-yellow-700 hover:from-red-700 hover:to-orange-500  mx-8 mt-3 mb-3 font-semibold text-lg">
                                                        <span>Trả giá <span
                                                            className='font-bold'> {formatMoney(highestPrice + productData.step_price)} đ</span> </span>
                                                        </div>
                                                        <div
                                                            className="text-xs capitalize text-center m-3">{readMoney(highestPrice + productData.step_price)} Đồng
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>


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
                                                         className="grid grid-cols-2 justify-between items-center ">
                                                        <div style={{fontWeight: 600}}
                                                             className=" px-5 p-1.5 flex flex-col  relative">
                                                            <h1 className='text-base font-semibold shadow-black'>
                                                                {formatMoney(bid.bid_price)} đ
                                                            </h1>
                                                            <span className="text-xs" style={{color: '#676464'}}
                                                            >
                                                                    {formatDateTimeMiliSecond(bid.bid_time)}
                                                                </span>
                                                        </div>
                                                        <div className="px-6 font-medium opacity-90 text-base">
                                                            {bid.username}
                                                        </div>
                                                    </div>
                                                    </>
                                                    ))
                                                    :
                                                <>
                                                    <div className="text-center font-medium my-14">Không có dữ liệu</div>
                                                </>
                                            :
                                            <>
                                                <CustomSpinner h={8} w={8} font={'xs'}/>
                                            </>
                                    }
                                </Modal>

                        </>
                    }
                </div>
            </MainLayOut>
        </>
    )
}
export default AuctionStream

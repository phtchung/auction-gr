import {Breadcrumb, Spin} from "antd";

import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import CountDownTitleBig from "../../Components/Clock/countDownTitleBig.jsx";
import useAuctionOnline from "./useAuctionOnline.jsx";
import PageNotFound from "../../Components/PageNotFound/pageNotFound.jsx";
import { formatMoney, readMoney} from "../../Utils/constant.js";
import {useState} from "react";
import {Modal} from 'antd';

const AuctionOnline = () => {
    const [state, setState] = useState(null)
    const {
        isLoading,
        isSuccess,
        fullBidListData,
        isSc,
        isLd,
        productData,
        highestPriceData,
        topBidListData,
        isError
    } = useAuctionOnline(state)
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    if (isError) {
        return <>
            <MainLayOut>
                <PageNotFound/>
            </MainLayOut>
        </>
    }
    const modalStyles = {
        header:{
            backgroundColor:'#f1a851',
            textAlign:'center',
            fontWeight:700,
            color: 'white !important'

        },
        content: {
            boxShadow: 'inset 0 0 5px #999',
            backgroundColor:'#f1a851',
            borderRadius:0,
            color:'white',
        },
    };

    return (
        <>
            <MainLayOut>
                <div className="md:container">

                    {
                        <div className="px-3 mx-2 mt-2">
                            <Breadcrumb
                                items={[
                                    {
                                        title: <a href="/">Trở lại</a>,
                                    },
                                ]}
                            />
                        </div>
                    }

                    {isLoading ?
                        <>
                            <Spin className="text-center mt-60" tip="Loading" size="large">
                            </Spin>
                        </> :
                        <>
                            <div className="flex flex-row items-start gap-6 p-5 m-2 mt-4 "
                                 style={{backgroundColor: '#ef9731'}}
                            >
                                <div className=" md:basis-1/2 sm:basis-1/2 ">
                                    <div id="slider" className="flexslider">
                                        <ul className="slides">
                                            <li>
                                                <img style={{
                                                    width: '100%',
                                                    height: '27.5rem',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}
                                                     src={productData?.main_image}
                                                     alt={`Image`}/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {
                                    isSuccess && <>
                                        <div className="md:basis-1/2 sm:basis-2/5">
                                            <CountDownTitleBig hours={9} minutes={13} seconds={0}/>
                                            {/*thông tinn đấu giá*/}
                                            <div
                                                className="flex flex-col ring-2 ring-orange-500 text-white  shadow-lg shadow-orange-500/50 font-sans text-left mt-6 mx-10 mb-6"
                                                style={{backgroundColor: '#f1a851', minHeight: '12.625rem'}}>
                                                <div style={{fontWeight: 600, textShadow: '0px 0px 10px #ccc3b8'}}
                                                     className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5   p-2 pr-6 relative">
                                            <span className="text-base  flex  gap-3  ">
                                                <img src="../../src/assets/bid.png" alt="" style={{width: '12%'}}/>
                                               Diễn biến cuộc đấu giá
                                            </span>
                                                    <span onClick={getFullBidList}
                                                          className="text-sm hover:text-blue-600 cursor-pointer  hover:underline ">
                                                        Xem tất cả
                                                    </span>
                                                </div>

                                                {
                                                    topBidListData && topBidListData.length !== 0 ?
                                                        topBidListData.map((bid, index) => (
                                                            <>
                                                                <div key={index}
                                                                     className="flex justify-between items-center ">
                                                                    <div style={{fontWeight: 600}}
                                                                         className=" px-6 p-1.5 flex flex-col  relative">
                                                                        <h1 className={`text-base shadow-black ${index === 0 ? 'text-red-800 font-bold' : ''}`}
                                                                            style={{textShadow: '#f1a851 1px 0 10px'}}>
                                                                            {bid.bid_price} Đ
                                                                        </h1>
                                                                        <span className="text-xs text-gray-200">
                                                                   {bid.bid_time}
                                                                </span>
                                                                    </div>
                                                                    <div className="px-6 font-semibold text-base">
                                                                        {bid.username}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ))
                                                        :
                                                        <>
                                                            <h5 className="text-sm font-medium text-center mt-10">Không có
                                                                dữ liệu</h5>
                                                        </>
                                                }

                                            </div>

                                            <div
                                                className="flex flex-col ring-2 ring-orange-500 text-white  shadow-lg shadow-orange-500/50 font-sans text-left  mx-10 "
                                                style={{backgroundColor: '#f1a851'}}>
                                                <div style={{fontWeight: 600, textShadow: '0px 0px 10px #ccc3b8'}}
                                                     className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5   p-2 pr-6 relative">
                                            <span className="text-base flex gap-3  ">
                                                  <img src="../../src/assets/label.png" alt="" style={{width: '17%'}}/>
                                               Giá hiện tại
                                            </span>
                                                    <span className="text-base font-semibold    ">
                                              {formatMoney(highestPriceData)} Đ
                                            </span>
                                                </div>
                                                <div className=" justify-between items-center ">

                                                    <div
                                                        className="p-3 text-center cursor-pointer bg-gradient-to-r from-orange-500 to-yellow-700 hover:from-red-700 hover:to-orange-500  mx-8 mt-3 mb-3 font-semibold text-lg">
                                                        <span>Trả giá <span
                                                            className='font-bold'> {formatMoney(highestPriceData + productData.step_price)} đ</span> </span>
                                                    </div>
                                                    <div
                                                        className="text-xs capitalize text-center m-3">{readMoney(highestPriceData + productData.step_price)} Đồng
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }

                                <Modal styles={modalStyles} title="Diễn biến các lệnh trả giá" className="overflow-auto text-white"
                                       style={{maxHeight: '500px'}}
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
                                                                <h1 className='text-base shadow-black'>
                                                                    {bid.bid_price} đ
                                                                </h1>
                                                                <span className="text-xs text-gray-200 "
                                                                     >
                                                                      {bid.bid_time}
                                                                </span>
                                                            </div>
                                                            <div className="px-6 text-base">
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
                                                <Spin className="text-center " tip="Loading" size="default">
                                                </Spin>
                                            </>
                                    }
                                </Modal>
                            </div>
                        </>
                    }
                </div>
            </MainLayOut>
        </>
    )
}
export default AuctionOnline

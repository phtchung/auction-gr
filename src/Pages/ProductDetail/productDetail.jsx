import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import Carousel from "react-multi-carousel";
import {Avatar, Breadcrumb, Form, Input, Spin, Tag, Popover} from "antd";
import {formatDateTimeMiliSecond, formatMoney} from "../../Utils/constant.js";
import CountDownFullDate from "../../Components/Clock/countDownFullDate.jsx";
import { StarFilled} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {Button} from "@material-tailwind/react";
import {Modal} from 'antd';
import useAuctionProductDetail from "./useAuctionProductDetail.jsx";
import PageNotFound from "../../Components/PageNotFound/pageNotFound.jsx";
import {toast} from "react-toastify";
import {sendAuctionData, sendBuyData} from "../../Services/biddingService.jsx";
import {
    FacebookIcon, TwitterShareButton, FacebookMessengerShareButton, FacebookMessengerIcon, TelegramIcon, FacebookShareButton, XIcon, TelegramShareButton,
} from "react-share";
import CardNormal from "../../Components/Card/cardNormal.jsx";
import useAuctionOnline from "../AuctionOnline/useAuctionOnline.jsx";
import useConversation from "../../zustand/useConversation.js";
const ProductDetail = () => {
    const [state , setState] = useState(null)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const {setOpenChat,selectedConversation,messages,setMessages,setSelectedConversation } = useConversation()
    const handleOpen = () => {
        if (localStorage.getItem("accessToken")) {
            setOpen(!open);
        } else {
            window.location.href = '/login';
        }
    };
    const handleNavigateAuction = (id) => {
        navigate(`/auction/item/${id}`)
        window.scrollTo(0, 0);
    }
    const {isError, isLoading, isSuccess, auctionProductData,refetch,bidCount,isSc,isLd,rf,ralatedPro} = useAuctionProductDetail()
    const {fullBidListData, isSc :isScFullBid , isLd : isLdFullBid} = useAuctionOnline(state)
    const [open1, setOpen1] = useState(false);
    const {id} = useParams()
    const [auctionData,setAuctionData] = useState({productId:id})
    const handleOpen1 = () => {
        if (localStorage.getItem("accessToken")) {
            setOpen1(!open1);
        } else {
            window.location.href = '/login';
        }
    };

    const handleNavigate = (url) => {
        navigate(`/categories/${url}`)
        window.scrollTo(0,0)
    }
    const handleAuctionData = (key, value) => {
        setAuctionData({...auctionData, [key]: value});
    };

    const handleStartChat = (seller) => {
        console.log(seller)
        setSelectedConversation(seller)
        setOpenChat(true)

    }

    const handleBuyProduct = async () => {
      try{
          const res = await sendBuyData({...auctionData,final_price:auctionProductData?.sale_price});

          toast.success("Trả giá  thành công", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 500,
          });
          setOpen1()
          navigate("/resultSuccess", { state: 100});
          setAuctionData({productId:id})
      }catch (error) {
          toast.error(error?.response?.data?.message);
          setOpen1()
      }
    }
    const handleAuction = async () => {
        try{
            if(auctionData.final_price < auctionProductData?.min_auction_price || !auctionProductData){
                toast.error('Giá đưa ra thấp hơn giá tối thiểu')
                setOpen()
                return;
            }
            const res = await sendAuctionData({...auctionData});

            toast.success("Trả giá  thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 500,
            });
            refetch()
            rf()
            setOpen()
            setAuctionData({productId:id})
        }catch (error) {
            toast.error(error?.response?.data?.message,{
                position: "top-right",
            });
            refetch()
            rf()
            setOpen()
        }
    }


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
    const modalStyles = {

        header:{
            textAlign:'center',
            fontWeight:700,
        },
        content: {
            boxShadow: 'inset 0 0 5px #999',
            borderRadius:0,
        },
    };

    if (isError) {
        return <>
            <MainLayOut>
                <PageNotFound/>
            </MainLayOut>
        </>
    }
    return (
        <>
            <MainLayOut>
                <div className="md:container">

                    {isSuccess && <>
                        <div className="px-3 mx-2 mt-2">
                            <Breadcrumb
                                items={[
                                    {
                                        title: <a href="/">Trang chủ</a>,
                                    },
                                    {
                                        title: <span className="cursor-pointer" onClick={() => handleNavigate(auctionProductData.parent._id)}>{auctionProductData?.parent?.name}</span>
                                    },
                                    {
                                        title: <a href="">{auctionProductData?.category_name}</a>
                                    },
                                ]}
                            />
                        </div>
                    </>}

                    {isLoading &&
                        <>
                            <Spin className="text-center mt-60" tip="Loading" size="large">
                            </Spin>
                        </>
                    }

                    {
                        isSuccess && isSc && <>
                            <div className="flex flex-row items-start gap-6 p-3 m-2 mt-4 ">
                                <div className=" md:basis-3/5 sm:basis-2/3 ">
                                    <div id="slider" className="flexslider">
                                        <ul className="slides">
                                            <li>
                                                <img style={{
                                                    width: '100%',
                                                    height: '27.5rem',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}
                                                    src={auctionProductData?.main_image}
                                                     alt={`Image`}/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="carousel" className="flexslider mt-4 mb-4 flex flex-row gap-3">
                                        {
                                            auctionProductData?.image_list.map((image, index) => (
                                                <div key={index} style={{width:'14%'}}>
                                                    <img style={{
                                                        width: '100%',
                                                        height: '4.7rem',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}
                                                          src={image} alt={`Image ${index}`}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="mt-5 bg-white  text-left mb-5 text-neutral-700 p-3">
                                        <div className="border-b pb-3 text-lg font-semibold">Mô tả sản phẩm</div>
                                        <div className="pt-2 min-h-fit">
                                            {auctionProductData?.description}
                                        </div>
                                    </div>
                                    {/*các sp tương tự*/}
                                    <div className="flex flex-col bg-white pt-3 p-3 mb-4">
                                        <div className="flex flex-grow items-center justify-between p-2">
                                            <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                                <div className="text-left text-lg font-semibold text-gray-900 ">Các sản phẩm
                                                    tương tự
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            ralatedPro &&
                                            <>
                                                <Carousel
                                                    additionalTransfrom={0}
                                                    arrows
                                                    autoPlaySpeed={3000}
                                                    className=""
                                                    containerClass="carousel-container-categories"
                                                    dotListClass=""
                                                    draggable
                                                    focusOnSelect={false}
                                                    keyBoardControl
                                                    minimumTouchDrag={30}
                                                    pauseOnHover
                                                    renderArrowsWhenDisabled={false}
                                                    renderButtonGroupOutside={false}
                                                    renderDotsOutside={false}
                                                    responsive={{
                                                        desktop: {
                                                            breakpoint: {
                                                                max: 3000,
                                                                min: 1024
                                                            },
                                                            items: 2.61,
                                                        },
                                                        mobile: {
                                                            breakpoint: {
                                                                max: 464,
                                                                min: 0
                                                            },
                                                            items: 2,
                                                        },
                                                        tablet: {
                                                            breakpoint: {
                                                                max: 1024,
                                                                min: 464
                                                            },
                                                            items: 2,
                                                        }
                                                    }}
                                                    rewind
                                                    centerMode={true}
                                                    rewindWithAnimation={false}
                                                    rtl={false}
                                                    shouldResetAutoplay
                                                    showDots={false}
                                                    sliderClass=""
                                                    slidesToSlide={3}
                                                    swipeable
                                                >
                                                    {
                                                        ralatedPro.map((product,index) => (
                                                            <div
                                                                onClick={() => handleNavigateAuction(product.product_id)}
                                                                key={index} className="md:basis-1/5 p-2 ">
                                                                <CardNormal data={product}/>
                                                            </div>
                                                        ))
                                                    }
                                                </Carousel>
                                            </>
                                        }
                                    </div>
                                </div>

                                <div className="md:basis-2/5 sm:basis-1/3">
                                    {/*thông tinn đấu giá*/}
                                    <div
                                        className="flex flex-col bg-white  text-neutral-700 font-sans text-left pt-3 p-3 mb-4">
                                        <div style={{fontWeight: 600}} className="flex pr-6 relative" >
                                            <span className="text-2xl    ">
                                                {auctionProductData?.product_name}
                                            </span>

                                            <Popover content={
                                                <div className="flex items-center gap-3 py-2 px-3">
                                                    <span>Chia sẻ :</span>
                                                    <FacebookShareButton
                                                        url={'https://page.auctions.yahoo.co.jp/jp/auction/t1113591534'}
                                                        quote={'Dummy text!'}
                                                    >
                                                        <FacebookIcon size={28} round />
                                                    </FacebookShareButton>
                                                    <TwitterShareButton
                                                        url={'https://page.auctions.yahoo.co.jp/jp/auction/t1113591534'}
                                                        quote={'Dummy text!'}
                                                    >
                                                        <XIcon size={28} round={true} />
                                                    </TwitterShareButton>
                                                    <TelegramShareButton
                                                        url={'https://page.auctions.yahoo.co.jp/jp/auction/t1113591534'}
                                                        quote={'Dummy text!'}
                                                    >
                                                        <TelegramIcon size={28} round />
                                                    </TelegramShareButton>
                                                    <FacebookMessengerShareButton
                                                        url={'https://janbox.com/vi/yahoo-auction/item/n1127985920'}
                                                        appId={'https://www.facebook.com/hoangthuydung.11'}
                                                    >
                                                        <FacebookMessengerIcon size={28} round />
                                                    </FacebookMessengerShareButton>
                                                </div>

                                            } placement="bottomRight" trigger="click">
                                                <div className="mt-2 absolute right-0">
                                                    <img
                                                        src="../../src/assets/share.png"
                                                        style={{width: "24px", cursor: 'pointer'}}
                                                        alt=""
                                                    />
                                                </div>
                                            </Popover>
                                        </div>
                                        <div className="flex flex-grow gap-3 items-end mt-4">
                                            <div className="text-sm mb-0.5 text-neutral-500">Hiện tại</div>
                                            <div
                                                className="text-2xl font-semibold text-red-600">{formatMoney(auctionProductData?.final_price)} VNĐ
                                            </div>
                                        </div>
                                        <div className="flex flex-grow gap-3 items-end ">
                                            <div className="text-sm mb-0.5 text-neutral-500">Giá trực tiếp</div>
                                            <div
                                                className="text-2xl font-semibold text-neutral-900">{formatMoney(auctionProductData?.sale_price)} VNĐ
                                            </div>
                                        </div>
                                        <div className="flex flex-grow gap-3 items-end ">
                                            <div className="text-sm mb-0.5 text-neutral-500">Bước giá</div>
                                            <div
                                                className="mt-1 text-neutral-600 text-base">{formatMoney(auctionProductData?.step_price)} VNĐ
                                            </div>
                                        </div>
                                        <div className="flex flex-grow gap-3 items-end mt-1 mb-4">
                                            <div className="text-sm mb-0.5 text-neutral-500">Phí giao hàng</div>
                                            <div
                                                className="text-base ">{formatMoney(auctionProductData?.shipping_fee)} VNĐ
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-5 pb-0.5 pt-1">
                                            <div className="flex flex-row items-center gap-1 ">
                                                <div><img
                                                    style={{width: 24, height: 24}}
                                                    src="https://s.yimg.jp/images/auc/pc/search/image/2.0.1/icon_hammer.svg"
                                                    alt=""/></div>
                                                <span onClick={getFullBidList} className="text-sm cursor-pointer text-blue-800">{bidCount} lượt đấu giá</span>
                                            </div>

                                            <div
                                                className="flex flex-row items-center text-xs px-1 bg-amber-100 gap-1 ">

                                                <span className="">Kết thúc : {auctionProductData?.finish_time}</span>
                                            </div>

                                        </div>
                                        <div>
                                            <Tag className="mx-2 mt-3"
                                                 color="red">{auctionProductData?.type_of_auction}</Tag>
                                            <Tag className="" color="volcano">{auctionProductData?.rank}</Tag>
                                            {
                                                auctionProductData?.is_used_interger === 0 && <>
                                                    <Tag className="mr-2"
                                                         color="red">{auctionProductData?.is_used}</Tag>
                                                </>
                                            }
                                        </div>

                                        <div className="mt-5 mb-6 flex gap-1 flex-row items-center">
                                            <button type="button"
                                                    onClick={handleOpen}
                                                    className="text-xl hover:border-amber-600 hover:bg-amber-100 focus:outline-none  p-2.5 font-semibold  text-white rounded border-amber-500 cursor-pointer"
                                                    style={{backgroundColor: '#e8680e', width: '100%'}}
                                            >
                                                Đấu Giá
                                            </button>
                                            <button
                                                onClick={handleOpen1}
                                                className="text-xl overflow_css_w_158 p-2.5 hover:border-amber-700  font-semibold text-white rounded border-amber-500 cursor-pointer"
                                                style={{backgroundColor: '#c74200', width: '100%'}}>
                                                Mua Trực Tiếp
                                            </button>
                                        </div>
                                        <div className="text-center mb-2">
                                            <CountDownFullDate id={auctionProductData?.product_id}
                                                targetDate={auctionProductData?.countdownTime}></CountDownFullDate>
                                        </div>
                                    </div>

                                    {/*Dialog xem full ds đấu giá */}
                                    <Modal styles={modalStyles} title="Diễn biến các lệnh trả giá" className=" text-black "
                                           footer={null} centered open={isModalOpen}
                                           bodyStyle={{ maxHeight: '450px', overflowY: 'auto',marginRight:'-10px' }}
                                           onCancel={handleCancel}>
                                        {
                                            isScFullBid ?
                                                fullBidListData.length !== 0 ?
                                                    fullBidListData.map((bid, index) => (
                                                        <>
                                                            <div key={index}
                                                                 className="flex justify-between my-2.5 items-center ">
                                                                <div style={{fontWeight: 600}}
                                                                     className="flex flex-col  relative">
                                                                    <h1 className='text-base shadow-black'>
                                                                        {formatMoney(bid.bid_price)} đ
                                                                    </h1>
                                                                    <span className="text-xs " style={{color:'rgb(156 157 160)'}}
                                                                    >
                                                                      {formatDateTimeMiliSecond(bid.bid_time)}
                                                                </span>
                                                                </div>
                                                                <div className="px-6 text-base font-medium " style={{color:'rgb(81 81 81)'}}>
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

                                    {/*Dialog đấu giá */}
                                    <Dialog open={open} onClose={handleOpen} maxWidth="sm">
                                        <DialogTitle>
                                            <div className="flex items-center font_fml justify-center">
                                    <span className="font-medium text-base">
                                         Đấu giá
                                    </span>
                                            </div>
                                            <div className="border-b mt-2  border-gray-300"></div>
                                        </DialogTitle>
                                        <DialogContent>
                                            <Stack spacing={2} margin={1}>
                                                <div
                                                    className="items-center font-medium text-base gap-6 my-7 mx-8 px-1 space-y-6 ">
                                                    <div className="flex gap-8 text-sm items-center">
                                                        <div className="">Giá đấu thầu tối thiểu</div>
                                                        <span
                                                            className="text-red-400">{formatMoney(auctionProductData?.min_auction_price)} VNĐ</span>
                                                    </div>

                                                    <div className="flex flex-row items-center ">
                                                        <Form scrollToFirstError>
                                                        <Form.Item

                                                            name='final_price'
                                                            label='Giá đấu thầu mới'

                                                            rules={[
                                                                {

                                                                    type: 'Number',
                                                                    message: 'The input is not valid Number!',
                                                                },
                                                                {
                                                                    required: true,
                                                                    message: 'Hãy điền giá bạn muốn trả!',
                                                                }
                                                            ]}
                                                        >
                                                            <Input  onChange={(e) => handleAuctionData('final_price',e.target.value)} rootClassName='hover:border-orange-500' suffix="VNĐ"/>
                                                        </Form.Item>
                                                        </Form>

                                                    </div>
                                                </div>
                                                <div className="flex m-6 gap-5  mr-10">
                                                    <Button
                                                        onClick={handleOpen}
                                                        className="p-2 px-6 py-2 w-full right-0 bg-white rounded text-orange-500 border-orange-500 hover:bg-zinc-50  text-base hover:border-orange-500  font-medium focus:outline-0">
                                                        Hủy
                                                    </Button>

                                                    <Button
                                                        onClick={handleAuction}
                                                        className="p-2 px-6 py-2 w-full right-0 bg-orange-500 rounded text-white  border-none text-base hover:border-orange-700 hover:bg-orange-600  font-semibold focus:outline-0">
                                                        Trả giá
                                                    </Button>
                                                </div>
                                            </Stack>
                                        </DialogContent>
                                    </Dialog>

                                    {/*dialog mua trực tiếp */}
                                    <Dialog open={open1} onClose={handleOpen1} maxWidth="sm">
                                        <DialogTitle>
                                            <div className="flex items-center justify-center">
                                    <span className="font-medium font_fml text-base">
                                        Mua trực tiếp sản phẩm
                                    </span>
                                            </div>
                                            <div className="border-b mt-2  border-gray-300"></div>
                                        </DialogTitle>
                                        <DialogContent>
                                            <Stack spacing={2} margin={1} minWidth={350}>
                                                <div
                                                    className="items-center  font-medium text-base gap-6 my-4 mx-8 px-1 space-y-6 ">
                                                    <div className="flex gap-8 items-center">
                                                        <div className="">Giá bán trực tiếp</div>
                                                        <span className="text-red-400">{formatMoney(auctionProductData?.sale_price)} VNĐ</span>
                                                    </div>

                                                </div>
                                                <div className="flex m-6 gap-5  mr-10">
                                                    <Button
                                                        onClick={handleOpen1}
                                                        className="p-2 px-5 py-2 w-full right-0 bg-white rounded text-orange-700 border-orange-700 hover:bg-zinc-50  text-base hover:border-orange-700   font-medium focus:outline-0">
                                                        Hủy
                                                    </Button>

                                                    <Button
                                                        onClick={handleBuyProduct}
                                                        className="p-2 px-2 py-2 w-full right-0 bg-orange-700 rounded text-white  border-none text-base hover:border-orange-700 hover:bg-orange-700  font-medium focus:outline-0">
                                                        Mua trực tiếp
                                                    </Button>
                                                </div>
                                            </Stack>
                                        </DialogContent>
                                    </Dialog>

                                    {/*người dùng */}
                                    <div style={{backgroundColor: "white"}}
                                         className="pt-1 pb-1   mb-5 text-neutral-700 font-sans text-left">
                                        <div className="flex flex-row p-3 pb-1 justify-between items-center">
                                            <div className="flex flex-row  items-center gap-2">
                                                <Avatar size="large"
                                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                                                <div
                                                    className=" text-neutral-700 text-base font-sans"> {auctionProductData?.seller_name}
                                                </div>
                                            </div>

                                            <div onClick={() => handleStartChat(auctionProductData?.seller)}
                                                className=" px-4 py-1.5 cursor-pointer border outline-0 border-orange-500 rounded shadow-md"
                                                style={{backgroundColor: 'rgba(255,87,34,.1)'}}>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <svg className="w-5 h-5 text-white fill-orange-500"
                                                         style={{color: '#ee4d2d'}}
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 20 20">
                                                        <path
                                                            d="M18 6.07a1 1 0 01.993.883L19 7.07v10.365a1 1 0 01-1.64.768l-1.6-1.333H6.42a1 1
                                         0 01-.98-.8l-.016-.117-.149-1.783h9.292a1.8 1.8 0 001.776-1.508l.018-.154.494-6.438H18zm-2.78-4.5a1
                                         1 0 011 1l-.003.077-.746 9.7a1 1 0 01-.997.923H4.24l-1.6 1.333a1 1 0 01-.5.222l-.14.01a1 1 0 01-.993-.883L1
                                         13.835V2.57a1 1 0 011-1h13.22zm-4.638 5.082c-.223.222-.53.397-.903.526A4.61 4.61 0 018.2 7.42a4.61 4.61 0
                                         01-1.48-.242c-.372-.129-.68-.304-.902-.526a.45.45 0 00-.636.636c.329.33.753.571 1.246.74A5.448 5.448 0 008.2
                                         8.32c.51 0 1.126-.068 1.772-.291.493-.17.917-.412 1.246-.74a.45.45 0 00-.636-.637z"></path>
                                                    </svg>
                                                    <p className="text-orange-500 font-medium text-base">Chat</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div
                                            className="flex flex-row justify-center 0 gap-4 px-4 p-3 pb-2 items-center">
                                            <div className="flex-col gap-1">
                                                <span
                                                    className="font-medium">{auctionProductData?.average_rating} </span>
                                                <StarFilled className="text-yellow-500"/>
                                            </div>
                                            <div
                                                className="flex-col pl-4 border-x border-neutral-200 flex items-center gap-1 pr-5 ">
                                                <span className="font-medium">{auctionProductData?.rate_count}  </span>
                                                <span> đánh giá </span>
                                            </div>

                                            <div
                                                className="flex-col border-r border-neutral-200  flex items-center gap-1 pr-5 ">
                                              <span
                                                  className="font-medium">{auctionProductData?.product_done_count}  </span>
                                                <span> đơn hàng </span>
                                            </div>
                                            <div className="flex-col  flex items-center gap-1 pr-5 ">
                                                <span className="font-medium"> đang fix </span>
                                                <span> theo dõi </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row  0 gap-1 px-4 p-3 pb-2 items-center">
                                            <img
                                                src="https://s.yimg.jp/images/auc/pc/item/image/1.0.2/icon_delivery.svg"
                                                alt=""/>
                                            Nơi gửi hàng : {auctionProductData?.delivery_from}
                                        </div>
                                        <div
                                            className="flex flex-row border-t border-neutral-300 mx-4 text-blue-800  gap-1 py-2  pb-2 items-center">
                                            <div className="cursor-pointer font-medium"
                                                 onClick={() => navigate(`/seller/${auctionProductData?.seller_user_name}`)}>
                                                Các sản phẩm đang bán
                                            </div>
                                        </div>
                                    </div>
                                    {/*Thông tin sản phẩm*/}
                                    <div style={{backgroundColor: "white"}}
                                         className="pt-1 pb-1  mb-5 text-neutral-700 font-sans text-left">
                                        <div
                                            className="flex border-b border-neutral-300 flex-row py-3 pb-3 mx-4 items-center gap-2">
                                            <div
                                                className=" text-neutral-600 text-lg font-semibold"> Thông tin sản phẩm
                                            </div>
                                        </div>
                                        <div className="0 gap-4 px-4 p-3 pb-2 font-sans text-neutral-600">
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Danh mục</div>
                                                <div className="basis-3/5">{auctionProductData?.parent?.name} - {auctionProductData?.category_name}</div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Thương hiệu</div>
                                                <div className="basis-3/5">{auctionProductData?.brand}</div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Trạng thái</div>
                                                <div className="basis-3/5">{auctionProductData?.is_used}</div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Chất lượng</div>
                                                <div className="basis-3/5">{auctionProductData?.rank}</div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Trả lại</div>
                                                <div className="basis-3/5">{auctionProductData?.can_return}</div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Giá khởi điểm</div>
                                                <div
                                                    className="basis-3/5">{formatMoney(auctionProductData?.reserve_price)} VNĐ
                                                </div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Giá bán trực tiếp</div>
                                                <div
                                                    className="basis-3/5">{formatMoney(auctionProductData?.sale_price)} VNĐ
                                                </div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Thời gian bắt đầu</div>
                                                <div className="basis-3/5">{auctionProductData?.start_time}</div>
                                            </div>
                                            <div className="flex-row flex gap-3 mb-3">
                                                <div className="basis-2/5 font-medium">Thời gian bắt đầu</div>
                                                <div className="basis-3/5">{auctionProductData?.finish_time}</div>
                                            </div>
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

export default ProductDetail

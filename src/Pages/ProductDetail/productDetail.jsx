import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import Carousel from "react-multi-carousel";
import {Avatar, Breadcrumb, Form, Card, Input, Spin, Tag} from "antd";
import {formatMoney} from "../../Utils/constant.js";
import CountDownFullDate from "../../Components/Clock/countDownFullDate.jsx";
import {ClockCircleOutlined, StarFilled} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import CountDownDesSmall from "../../Components/Clock/countDownDesSmall.jsx";
import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useState} from "react";
import {Button} from "@material-tailwind/react";
import useAuctionProductDetail from "./useAuctionProductDetail.jsx";
import PageNotFound from "../../Components/PageNotFound/pageNotFound.jsx";
import {toast} from "react-toastify";
import {sendAuctionData, sendBuyData} from "../../Services/biddingService.jsx";

const ProductDetail = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (localStorage.getItem("accessToken")) {
            setOpen(!open);
        } else {
            window.location.href = '/login';
        }
    };
    const {isError, isLoading, isSuccess, auctionProductData,refetch,bidCount,isSc,isLd,rf} = useAuctionProductDetail()
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
    const handleAuctionData = (key, value) => {
        setAuctionData({...auctionData, [key]: value});
    };

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

                    <div className="px-3 mx-2 mt-2">
                        <Breadcrumb
                            items={[
                                {
                                    title: 'Home',
                                },
                                {
                                    title: <a href="">Application Center</a>,
                                },
                                {
                                    title: 'Tên danh mục sản phẩm cối cùngg',
                                },
                            ]}
                        />
                    </div>
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
                                                <img src={auctionProductData?.main_image}/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="carousel" className="flexslider mt-4 mb-4 flex flex-row gap-3">
                                        {
                                            auctionProductData?.image_list.map((image, index) => (
                                                <div className="basis-1/6">
                                                    <img style={{
                                                        width: '100%',
                                                        height: '6.7rem',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}
                                                         key={index} src={image} alt={`Image ${index}`}/>
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
                                            <div className="md:basis-1/5  p-2">
                                                <Card
                                                    size="small"
                                                    hoverable
                                                    bordered={false}
                                                    style={{width: '100%', borderRadius: 0, minHeight: 236}}
                                                    cover={<img alt="example" style={{
                                                        width: '100%',
                                                        height: '163.84px',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}
                                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                                                >
                                                    <div style={{backgroundColor: 'rgb(255, 165, 0)'}}
                                                         className="flex justify-center  gap-1 item-center">
                                                        <ClockCircleOutlined className="text-white "/>

                                                        <CountDownDesSmall hours={4} minutes={10}
                                                                           seconds={0}></CountDownDesSmall>

                                                    </div>
                                                    <div className="flex flex-col text-left py-1 px-1">
                                                        <div
                                                            className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                            hoa xxxxxxxxxxxxxxx
                                                        </div>
                                                        <div className="flex flex-row items-center gap-1 overflow_css">
                                                            <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                            <div
                                                                className="text-red-700 text-sm font-semibold "> {formatMoney(273000)} đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                            <div className="md:basis-1/5  p-2">
                                                <Card
                                                    size="small"
                                                    hoverable
                                                    bordered={false}
                                                    style={{width: '100%', borderRadius: 0, minHeight: 236}}
                                                    cover={<img alt="example" style={{
                                                        width: '100%',
                                                        height: '163.84px',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}
                                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                                                >
                                                    <div style={{backgroundColor: 'rgb(255, 165, 0)'}}
                                                         className="flex justify-center  gap-1 item-center">
                                                        <ClockCircleOutlined className="text-white "/>

                                                        <CountDownDesSmall hours={2} minutes={50}
                                                                           seconds={0}></CountDownDesSmall>

                                                    </div>
                                                    <div className="flex flex-col text-left py-1 px-1">
                                                        <div
                                                            className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                            hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                        </div>
                                                        <div className="flex flex-row items-center gap-1 overflow_css">
                                                            <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                            <div
                                                                className="text-red-700 text-sm font-semibold "> {formatMoney(273000)} đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                            <div className="md:basis-1/5  p-2">
                                                <Card
                                                    size="small"
                                                    hoverable
                                                    bordered={false}
                                                    style={{width: '100%', borderRadius: 0, minHeight: 236}}
                                                    cover={<img alt="example" style={{
                                                        width: '100%',
                                                        height: '163.84px',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}
                                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                                                >
                                                    <div style={{backgroundColor: 'rgb(255, 165, 0)'}}
                                                         className="flex justify-center  gap-1 item-center">
                                                        <ClockCircleOutlined className="text-white "/>

                                                        <CountDownDesSmall hours={2} minutes={50}
                                                                           seconds={0}></CountDownDesSmall>

                                                    </div>
                                                    <div className="flex flex-col text-left py-1 px-1">
                                                        <div
                                                            className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                            hoa xxxxxxxxxxxdsssssxxxxx d
                                                        </div>
                                                        <div className="flex flex-row items-center gap-1 overflow_css">
                                                            <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                            <div
                                                                className="text-red-700 text-sm font-semibold "> {formatMoney(273000)} đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                            <div className="md:basis-1/5  p-2">
                                                <Card
                                                    size="small"
                                                    hoverable
                                                    bordered={false}
                                                    style={{width: '100%', borderRadius: 0, minHeight: 236}}
                                                    cover={<img alt="example" style={{
                                                        width: '100%',
                                                        height: '163.84px',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}
                                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                                                >
                                                    <div style={{backgroundColor: 'rgb(255, 165, 0)'}}
                                                         className="flex justify-center  gap-1 item-center">
                                                        <ClockCircleOutlined className="text-white "/>

                                                        <CountDownDesSmall hours={2} minutes={50}
                                                                           seconds={0}></CountDownDesSmall>

                                                    </div>
                                                    <div className="flex flex-col text-left py-1 px-1">
                                                        <div
                                                            className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                            hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                        </div>
                                                        <div className="flex flex-row items-center gap-1 overflow_css">
                                                            <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                            <div
                                                                className="text-red-700 text-sm font-semibold "> {formatMoney(273000)} đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                            <div className="md:basis-1/5  p-2">
                                                <Card
                                                    size="small"
                                                    hoverable
                                                    bordered={false}
                                                    style={{width: '100%', borderRadius: 0, minHeight: 236}}
                                                    cover={<img alt="example" style={{
                                                        width: '100%',
                                                        height: '163.84px',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}
                                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                                                >
                                                    <div style={{backgroundColor: 'rgb(255, 165, 0)'}}
                                                         className="flex justify-center  gap-1 item-center">
                                                        <ClockCircleOutlined className="text-white "/>

                                                        <CountDownDesSmall hours={4} minutes={10}
                                                                           seconds={0}></CountDownDesSmall>

                                                    </div>
                                                    <div className="flex flex-col text-left py-1 px-1">
                                                        <div
                                                            className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                            hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                        </div>
                                                        <div className="flex flex-row items-center gap-1 overflow_css">
                                                            <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                            <div
                                                                className="text-red-700 text-sm font-semibold "> {formatMoney(273000)} đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>

                                        </Carousel>
                                    </div>
                                </div>

                                <div className="md:basis-2/5 sm:basis-1/3">
                                    {/*thông tinn đấu giá*/}
                                    <div
                                        className="flex flex-col bg-white  text-neutral-700 font-sans text-left pt-3 p-3 mb-4">
                                        <div style={{fontWeight: 600}} className="flex items-center" >
                                            <span className="text-lg    ">
                                                {auctionProductData?.product_name}
                                            </span>
                                            {
                                                auctionProductData?.is_used_interger === 0 && <>
                                                    <Tag className="ml-2" color="red">{auctionProductData?.is_used}</Tag>
                                                </>
                                            }
                                            <Tag className="ml-2" color="volcano">{auctionProductData?.rank}</Tag>

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
                                                <span className="text-sm text-blue-800">{bidCount} lượt đấu giá</span>
                                            </div>

                                            <div
                                                className="flex flex-row items-center text-xs px-1 bg-amber-100 gap-1 ">

                                                <span className="">Kết thúc : {auctionProductData?.finish_time}</span>
                                            </div>

                                        </div>
                                        <div>
                                            <Tag className="mx-2 mt-3"
                                                 color="red">{auctionProductData?.type_of_auction}</Tag>
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
                                            <CountDownFullDate
                                                targetDate={auctionProductData?.countdownTime}></CountDownFullDate>
                                        </div>

                                    </div>
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
                                                        className="p-2 px-6 py-2 w-full right-0 bg-white rounded text-orange-700 border-orange-700 hover:bg-zinc-50  text-base hover:border-orange-700 font_fml  font-medium focus:outline-0">
                                                        Hủy
                                                    </Button>

                                                    <Button
                                                        onClick={handleBuyProduct}
                                                        className="p-2 px-6 py-2 w-full right-0 bg-orange-700 rounded text-white  border-none text-base hover:border-orange-700 hover:bg-orange-700 font_fml font-medium focus:outline-0">
                                                        Mua trực tiếp
                                                    </Button>
                                                </div>
                                            </Stack>
                                        </DialogContent>
                                    </Dialog>
                                    {/*người dùng */}
                                    <div style={{backgroundColor: "white"}}
                                         className="pt-1 pb-1  mb-5 text-neutral-700 font-sans text-left">
                                        <div className="flex flex-row p-3 pb-1 items-center gap-2">
                                            <Avatar size="large"
                                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                                            <div
                                                className=" text-neutral-700 text-base font-sans"> {auctionProductData?.seller_name}
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-center 0 gap-4 px-4 p-3 pb-2 items-center">
                                            <div className="flex-col gap-1">
                                                <span className="font-medium">{auctionProductData?.average_rating} </span>
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
                                                <span className="font-medium">{auctionProductData?.point}  </span>
                                                <span> điểm </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row  0 gap-1 px-4 p-3 pb-2 items-center">
                                            <img src="https://s.yimg.jp/images/auc/pc/item/image/1.0.2/icon_delivery.svg"
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
                                                <div className="basis-3/5">Đồ chơi</div>
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

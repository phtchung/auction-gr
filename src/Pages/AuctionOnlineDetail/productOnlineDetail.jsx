import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import Carousel from "react-multi-carousel";
import {Avatar, Breadcrumb, Tag, Popover} from "antd";
import {formatMoney, getColorForLetter, getFirstLetter} from "../../Utils/constant.js";
import CountDownFullDate from "../../Components/Clock/countDownFullDate.jsx";
import { StarFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {
    FacebookIcon, TwitterShareButton, FacebookMessengerShareButton, FacebookMessengerIcon, TelegramIcon, FacebookShareButton, XIcon, TelegramShareButton,
} from "react-share";
import CardNormal from "../../Components/Card/cardNormal.jsx";
import useAuctionRealTimeDetail from "./useAuctionRealTimeDetail.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
const ProductOnlineDetail = () => {
    const navigate = useNavigate()

    const handleNavigateAuction = (id) => {
        navigate(`/auction/item/${id}`)
        window.scrollTo(0, 0);
    }
    const{isError, isLoading, isSuccess, auctionProductData,sc,ralatedPro,ld,isErr} = useAuctionRealTimeDetail()
    console.log(auctionProductData)

    const handleNavigateToOnlineAuction = (url) => {
        if (localStorage.getItem("accessToken")) {
            window.location.href = `/bidding/${url}`;
        } else {
            window.location.href = '/login';
        }
    };

    const handleNavigate = (url) => {
        navigate(`/categories/${url}`)
        window.scrollTo(0,0)
    }

    return (
        <>
            <MainLayOut>
                <div className="md:container ">
                    {
                        isLoading ?
                            <>
                                <CustomSpinner h={12} w={12} font={'sm'}/>
                            </>
                            :
                            isError ?
                                <>
                                    <FZFNotFound btnText={'Trở về'} error={'Rất tiếc,không tìm thấy phiên đấu giá nào'} urlReturn={'/auctionRealtime'} />
                                </>
                                :
                                isSuccess &&
                                <>
                                    <div className="mt-24">
                                        <div className="px-3 mx-2 mt-2">
                                            <Breadcrumb
                                                items={[
                                                    {
                                                        title: <a href="/">Trang chủ</a>,
                                                    },
                                                    {
                                                        title: <span className="cursor-pointer"
                                                                     onClick={() => handleNavigate(auctionProductData?.parent._id)}>{auctionProductData?.parent?.name}</span>
                                                    },
                                                    {
                                                        title: <a href="">{auctionProductData?.category_name}</a>
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="flex flex-row items-start gap-6 p-3 m-2 mt-4 ">
                                            {/*cột ảnh + miêu tả */}
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
                                                            <div key={index} style={{width: '14%'}}>
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
                                                    <div className="border-b pb-3 text-lg font-semibold">Mô tả sản
                                                        phẩm
                                                    </div>
                                                    <div className="pt-2 min-h-fit">
                                                        {auctionProductData?.description}
                                                    </div>
                                                </div>

                                                {/*các sp tương tự*/}
                                                {
                                                    ld ?
                                                        <>
                                                            <CustomSpinner h={8} w={8} font={'sm'}/>
                                                        </>
                                                        :
                                                        sc &&  ralatedPro.length !== 0 &&
                                                            <>
                                                                <div className="flex flex-col bg-white pt-3 p-3 mb-4">
                                                                    <div
                                                                        className="flex flex-grow items-center justify-between p-2">
                                                                        <div className="flex gap-2 items-center mb-2 ">
                                                                            <span className="relative flex h-3 w-3">
                                                                                <span
                                                                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                                                                <span
                                                                                    className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                                            </span>
                                                                            <div
                                                                                className="text-left text-lg font-semibold text-gray-900 ">Các
                                                                                sản phẩm tương tự
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
                                                                                    ralatedPro.map((product, index) => (
                                                                                        <div
                                                                                            onClick={() => handleNavigateAuction(product.product_id)}
                                                                                            key={index}
                                                                                            className="md:basis-1/5 p-2 ">
                                                                                            <CardNormal data={product}/>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </Carousel>
                                                                        </>
                                                                    }
                                                                </div>
                                                            </>
                                                }
                                            </div>

                                            <div className="md:basis-2/5 sm:basis-1/3">
                                                {/*thông tinn đấu giá*/}
                                                <div
                                                    className="flex flex-col bg-white  text-neutral-700 font-sans text-left pt-3 p-3 mb-4">
                                                    <div style={{fontWeight: 600}} className="flex pr-8 relative">
                                                        <span className="text-2xl">
                                                            {auctionProductData?.product_name}
                                                        </span>

                                                        <Popover content={
                                                            <div className="flex items-center gap-3 py-2 px-3">
                                                                <span>Chia sẻ :</span>
                                                                <FacebookShareButton
                                                                    url={'https://page.auctions.yahoo.co.jp/jp/auction/t1113591534'}
                                                                    quote={'Dummy text!'}
                                                                >
                                                                    <FacebookIcon size={28} round/>
                                                                </FacebookShareButton>
                                                                <TwitterShareButton
                                                                    url={'https://page.auctions.yahoo.co.jp/jp/auction/t1113591534'}
                                                                    quote={'Dummy text!'}
                                                                >
                                                                    <XIcon size={28} round={true}/>
                                                                </TwitterShareButton>
                                                                <TelegramShareButton
                                                                    url={'https://page.auctions.yahoo.co.jp/jp/auction/t1113591534'}
                                                                    quote={'Dummy text!'}
                                                                >
                                                                    <TelegramIcon size={28} round/>
                                                                </TelegramShareButton>
                                                                <FacebookMessengerShareButton
                                                                    url={'https://janbox.com/vi/yahoo-auction/item/n1127985920'}
                                                                    appId={'https://www.facebook.com/hoangthuydung.11'}
                                                                >
                                                                    <FacebookMessengerIcon size={28} round/>
                                                                </FacebookMessengerShareButton>
                                                            </div>
                                                        } placement="bottomRight" trigger="click">
                                                            <div className="mt-2 absolute right-0">
                                                                <svg style={{width: 28, height: 28, cursor: 'pointer'}}
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     fill="rgb(99 95 95)"
                                                                     viewBox="0 0 448 512">
                                                                    <path
                                                                        d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53
                                                             0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43
                                                              96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/>
                                                                </svg>
                                                            </div>
                                                        </Popover>
                                                    </div>

                                                    <div>
                                                        <Tag className="mr-2 mt-3"
                                                             color="red">{auctionProductData?.type_of_auction}</Tag>
                                                        <Tag className=""
                                                             color="volcano">{auctionProductData?.rank}</Tag>
                                                        {
                                                            auctionProductData?.is_used_interger === 0 &&
                                                            <>
                                                                <Tag className="mr-2"
                                                                     color="red">{auctionProductData?.is_used}
                                                                </Tag>
                                                            </>
                                                        }
                                                    </div>

                                                    <div className="mt-5 mb-6 flex gap-1 flex-row items-center">
                                                        <button
                                                            onClick={() => handleNavigateToOnlineAuction(auctionProductData?.product_id)}
                                                            className="text-xl overflow_css_w_158 p-2.5 hover:border-amber-700  font-semibold text-white rounded border-amber-500 cursor-pointer"
                                                            style={{backgroundColor: '#ee002a', width: '100%'}}>
                                                            Đấu giá trực tuyến
                                                        </button>
                                                    </div>
                                                    <div className="text-center mb-2">
                                                        <CountDownFullDate id={auctionProductData?.product_id}
                                                                           targetDate={auctionProductData?.countdownTime}></CountDownFullDate>
                                                    </div>
                                                </div>

                                                {/*người dùng */}
                                                <div style={{backgroundColor: "white"}}
                                                     className="pt-1 pb-1  mb-5 text-neutral-700 font-sans text-left">
                                                    <div className="flex flex-row p-3 pb-1 items-center gap-2">
                                                        <Avatar
                                                            style={{
                                                                backgroundColor: getColorForLetter(getFirstLetter(auctionProductData.seller_name)),
                                                                verticalAlign: 'middle',
                                                            }}
                                                            size='large'
                                                        >
                                                            <span className="font-medium text-lg">{getFirstLetter(auctionProductData.seller_name)}</span>
                                                        </Avatar>
                                                        <div
                                                            className=" text-neutral-700 text-base font-sans"> {auctionProductData?.seller_name}
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
                                                            <span
                                                                className="font-medium">{auctionProductData?.rate_count}  </span>
                                                            <span> đánh giá </span>
                                                        </div>

                                                        <div
                                                            className="flex-col border-r border-neutral-200  flex items-center gap-1 pr-5 ">
                                                            <span className="font-medium">{auctionProductData?.product_done_count}  </span>
                                                            <span> đơn hàng </span>
                                                        </div>
                                                        <div className="flex-col  flex items-center gap-1 pr-5 ">
                                                            <span className="font-medium"> đang fix  </span>
                                                            <span>người theo dõi </span>
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
                                                            <div
                                                                className="basis-3/5">{auctionProductData?.parent?.name} - {auctionProductData?.category_name}</div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Thương hiệu</div>
                                                            <div className="basis-3/5">{auctionProductData?.brand}</div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Trạng thái</div>
                                                            <div
                                                                className="basis-3/5">{auctionProductData?.is_used}</div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Chất lượng</div>
                                                            <div className="basis-3/5">{auctionProductData?.rank}</div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Trả lại</div>
                                                            <div
                                                                className="basis-3/5">{auctionProductData?.can_return}</div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Giá khởi điểm</div>
                                                            <div
                                                                className="basis-3/5">{formatMoney(auctionProductData?.reserve_price)} VNĐ
                                                            </div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Phí giao hàng</div>
                                                            <div
                                                                className="basis-3/5">{formatMoney(auctionProductData?.shipping_fee)} VNĐ
                                                            </div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Thời gian bắt đầu</div>
                                                            <div
                                                                className="basis-3/5">{auctionProductData?.start_time}</div>
                                                        </div>
                                                        <div className="flex-row flex gap-3 mb-3">
                                                            <div className="basis-2/5 font-medium">Thời gian bắt đầu
                                                            </div>
                                                            <div
                                                                className="basis-3/5">{auctionProductData?.finish_time}</div>
                                                        </div>
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
export default ProductOnlineDetail

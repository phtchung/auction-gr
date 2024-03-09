import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Menu, Card, Avatar} from 'antd'
import {ClockCircleOutlined,StarFilled  } from '@ant-design/icons';
import {categoriesItems, formatMoney} from "../../Utils/constant.js";
import CountDownTitleBig from "../../Components/Clock/countDownTitleBig.jsx";
import Carousel from "react-multi-carousel";
import CountDownDesSmall from "../../Components/Clock/countDownDesSmall.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
const Home = () => {
    const navigate = useNavigate()
    const onClick = (e) => {
        console.log('click ', e);
    };

    const handleNavigateSellerHome = () => {
        navigate('/seller/ptchung')
        window.scrollTo(0, 0);
    }

    return (
        <>
            <MainLayOut style={{zIndex:10000}}>
                <div className="md:container">
                    <div>
                        {/*//chia 2 cột , 1 cột danhm muc , 1 sột sản phẩm */}
                        <div className="flex flex-row items-start gap-6 p-3 m-2 mt-4 ">
                            <div className=" md:basis-1/5 sm:basis-1/4 pt-5 "
                                 style={{backgroundColor: "white"}}>
                                <div className="mb-1 text-base">Danh mục</div>
                                <Menu
                                    onClick={onClick}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        backgroundColor: 'white'
                                    }}
                                    mode="inline"
                                    items={categoriesItems}
                                />
                            </div>
                            {/*cột hiển thị các sản phẩm*/}
                            <div className=" md:basis-4/5 sm:basis-3/4  flex-col gap-y-4">
                                {/*trực tiếp live*/}
                                <div className="flex flex-col bg-white pt-3 p-2 mb-4">
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">ĐANG ĐẤU GIÁ
                                                TRỰC TUYẾN
                                            </div>
                                        </div>
                                        <div>
                                            <CountDownTitleBig hours={12} minutes={30} seconds={0} backgroundColor={'bg-red-400'}></CountDownTitleBig>
                                        </div>
                                    </div>

                                    <Carousel
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        className=""
                                        containerClass="carousel-container"
                                        dotListClass=""
                                        draggable
                                        focusOnSelect={false}

                                        keyBoardControl
                                        minimumTouchDrag={50}

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
                                                items: 4,

                                            },
                                            mobile: {
                                                breakpoint: {
                                                    max: 464,
                                                    min: 0
                                                },
                                                items: 1,

                                            },
                                            tablet: {
                                                breakpoint: {
                                                    max: 1024,
                                                    min: 464
                                                },
                                                items: 3,
                                            }
                                        }}
                                        rewind
                                        centerMode={true}
                                        rewindWithAnimation={false}
                                        rtl={false}
                                        shouldResetAutoplay
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={4}
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-sans  hover:text-orange-300" style={{lineHeight:'1.3rem'}}>Chung Phạm Nguyễn
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 overflow_css">
                                                        <div
                                                            className="text-neutral-500 hover:text-neutral-700 text-xs">Hiện
                                                            tại :
                                                        </div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold hover:text-red-500 "> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 hover:text-orange-300 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 overflow_css">
                                                        <div
                                                            className="text-neutral-500 hover:text-neutral-700 text-xs">Hiện
                                                            tại :
                                                        </div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold hover:text-red-500 "> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 hover:text-orange-300 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 overflow_css">
                                                        <div
                                                            className="text-neutral-500 hover:text-neutral-700 text-xs">Hiện
                                                            tại :
                                                        </div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold hover:text-red-500 "> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 hover:text-orange-300 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 overflow_css">
                                                        <div
                                                            className="text-neutral-500 hover:text-neutral-700 text-xs">Hiện
                                                            tại :
                                                        </div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold hover:text-red-500 "> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 hover:text-orange-300 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 overflow_css">
                                                        <div
                                                            className="text-neutral-500 hover:text-neutral-700 text-xs">Hiện
                                                            tại :
                                                        </div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold hover:text-red-500 "> {formatMoney(273000)} đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>

                                    </Carousel>
                                </div>
                                {/*sắp kết thúc*/}
                                <div className="flex flex-col bg-white pt-3 p-2 mb-4">
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">SẮP KẾT THÚC
                                            </div>
                                        </div>

                                    </div>

                                    <Carousel
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        className=""
                                        containerClass="carousel-container"
                                        dotListClass=""
                                        draggable
                                        focusOnSelect={false}

                                        keyBoardControl
                                        minimumTouchDrag={50}

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
                                                items: 4,

                                            },
                                            mobile: {
                                                breakpoint: {
                                                    max: 464,
                                                    min: 0
                                                },
                                                items: 1,

                                            },
                                            tablet: {
                                                breakpoint: {
                                                    max: 1024,
                                                    min: 464
                                                },
                                                items: 3,
                                            }
                                        }}
                                        rewind
                                        centerMode={true}
                                        rewindWithAnimation={false}
                                        rtl={false}
                                        shouldResetAutoplay
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={4}
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
                                {/*giá rẻ */}
                                <div className="flex flex-col bg-white pt-3 p-2 mb-4" style={{maxHeight: 844}}>
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">SẢN PHẨM GIÁ
                                                HỜI
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex flex-wrap">
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>


                                </div>

                                <div className="flex flex-col bg-white pt-3 p-2 mb-4" style={{maxHeight: 844}}>
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">SẢN PHẨM
                                                HIẾM / SIÊU HIẾM / GIÁ CAO
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex flex-wrap">
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
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
                                                <div className="flex flex-col text-left py-1 px-1">
                                                    <div
                                                        className="overflow_css_card text-base font-medium mb-1 leading-5">lala
                                                        hoa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdsssssxxxxx d
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1 ">
                                                        <div className="text-neutral-500 text-xs">Hiện tại :</div>
                                                        <div
                                                            className="text-red-700 text-sm font-semibold"> {formatMoney(273000)} đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>


                                </div>

                                {/* người bán nổi bật*/}
                                <div className="flex flex-col bg-white pt-3 p-2 mb-4" style={{maxHeight: 844}}>
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">NGƯỜI BÁN NỔI BẬT
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex flex-wrap ">
                                        <div className="md:basis-1/5 p-2" onClick={handleNavigateSellerHome}>
                                            <Card
                                                hoverable
                                                style={{
                                                    width: 209,
                                                }}
                                                actions={[
                                                    <div className="flex gap-1 justify-center">
                                                        <span>4.5</span>
                                                        <StarFilled className="text-yellow-500"/>

                                                    </div>,
                                                    <div>287 <span className="text-xs">đơn hàng</span></div>,
                                                ]}
                                            >
                                                <div className="flex flex-row p-2 pb-2 items-center gap-2">
                                                    <Avatar size="large"
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>
                                                    <div
                                                        className="overflow_css text-neutral-700 text-base font-sans"> Phạm
                                                        Thành Chunng hàng nnnnnnnnnnn
                                                    </div>
                                                </div>
                                            </Card>


                                        </div>
                                        <div className="md:basis-1/5 p-2">
                                            <Card
                                                hoverable
                                                style={{
                                                    width: 209,
                                                }}
                                                actions={[
                                                    <div className="flex gap-1 justify-center">
                                                        <span>4.5</span>
                                                        <StarFilled className="text-yellow-500"/>

                                                    </div>,
                                                    <div>287 <span className="text-xs">đơn hàng</span></div>,
                                                ]}
                                            >
                                                <div className="flex flex-row p-2 pb-2 items-center gap-2">
                                                    <Avatar size="large"
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>
                                                    <div
                                                        className="overflow_css text-neutral-700 text-base font-sans"> Phạm
                                                        Thành Chunng hàng nnnnnnnnnnn
                                                    </div>
                                                </div>
                                            </Card>


                                        </div>
                                        <div className="md:basis-1/5 p-2">
                                            <Card
                                                hoverable
                                                style={{
                                                    width: 209,
                                                }}
                                                actions={[
                                                    <div className="flex gap-1 justify-center">
                                                        <span>4.5</span>
                                                        <StarFilled className="text-yellow-500"/>

                                                    </div>,
                                                    <div>287 <span className="text-xs">đơn hàng</span></div>,
                                                ]}
                                            >
                                                <div className="flex flex-row p-2 pb-2 items-center gap-2">
                                                    <Avatar size="large"
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>
                                                    <div
                                                        className="overflow_css text-neutral-700 text-base font-sans"> Phạm
                                                        Thành Chunng hàng nnnnnnnnnnn
                                                    </div>
                                                </div>
                                            </Card>


                                        </div>

                                    </div>
                                    {/*collapse xem thêm nma chưa đc */}
                                    {/*<Collapse*/}
                                    {/*    accordion*/}
                                    {/*    bordered={false}*/}
                                    {/*    size="small"*/}
                                    {/*    destroyInactivePanel={true}*/}
                                    {/*    style={{padding:0}}*/}
                                    {/*    expandIcon={({ isActive }) => (*/}
                                    {/*        <span className={`custom-icon  text-right ${isActive ? '-z-50' : ''}`}>*/}
                                    {/*            {isActive ? '' : <div>Show more</div>}*/}
                                    {/*        </span>*/}
                                    {/*    )}*/}
                                    {/*    ghost*/}
                                    {/*    activeKey={activeKey}*/}
                                    {/*    onChange={handleCollapseChange}*/}
                                    {/*    items={[*/}
                                    {/*        {*/}
                                    {/*            key: '1',*/}
                                    {/*             children: <p>*/}
                                    {/*                <div className="-mt-10 md:basis-1/5 p-2">*/}
                                    {/*                    <Card*/}
                                    {/*                        hoverable*/}
                                    {/*                        style={{*/}
                                    {/*                            width: 209,*/}
                                    {/*                        }}*/}
                                    {/*                        actions={[*/}
                                    {/*                            <div className="flex gap-1 justify-center">*/}
                                    {/*                                <span>4.5</span>*/}
                                    {/*                                <StarFilled className="text-yellow-500"/>*/}

                                    {/*                            </div>,*/}
                                    {/*                            <div>287 <span className="text-xs">đơn hàng</span>*/}
                                    {/*                            </div>,*/}
                                    {/*                        ]}*/}
                                    {/*                    >*/}
                                    {/*                        <div className="flex flex-row p-2 pb-2 items-center gap-2">*/}
                                    {/*                            <Avatar size="large"*/}
                                    {/*                                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>*/}
                                    {/*                            <div*/}
                                    {/*                                className="overflow_css text-neutral-700 text-base font-sans"> Phạm*/}
                                    {/*                                Thành Chunng hàng nnnnnnnnnnn*/}
                                    {/*                            </div>*/}
                                    {/*                        </div>*/}
                                    {/*                    </Card>*/}

                                    {/*                </div>*/}
                                    {/*            </p>,*/}
                                    {/*        },*/}
                                    {/*    ]}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};

export default Home;

import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import  Carousel from "react-multi-carousel";
import {Avatar, Breadcrumb, Card} from "antd";
import {formatMoney} from "../../Utils/constant.js";
import CountDownFullDate from "../../Components/Clock/countDownFullDate.jsx";
import {ClockCircleOutlined, StarFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import CountDownDesSmall from "../../Components/Clock/countDownDesSmall.jsx";



const ProductDetail = () => {
    const targetDate = '2024-03-13T14:45:00';
    const navigate = useNavigate()
  return(
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
                  <div className="flex flex-row items-start gap-6 p-3 m-2 mt-4 ">
                      <div className=" md:basis-3/5 sm:basis-2/3 ">
                          <div id="slider" className="flexslider">
                              <ul className="slides">
                                  <li>
                                      <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                                  </li>

                              </ul>
                          </div>
                          <div id="carousel" className="flexslider">
                              <ul className="slides">


                              </ul>
                          </div>
                          <div className="mt-5 bg-white  text-left mb-4  text-neutral-700 p-3">
                              <div className="border-b pb-3 text-lg font-semibold">Mô tả sản phẩm</div>
                              <div className="pt-2 h-40">
                                  Sản phẩm mới
                                  alo alo
                              </div>
                          </div>

                          <div className="flex flex-col bg-white pt-3 p-3 mb-4">
                              <div className="flex flex-grow items-center justify-between p-2">
                                  <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                      <div className="text-left text-lg font-semibold text-gray-900 ">Các sản phẩm tương tự
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
                      </div>
                      <div className="md:basis-2/5 sm:basis-1/3">
                          {/*thông tinn đấu giá*/}
                          <div className="flex flex-col bg-white text-neutral-700 font-sans text-left pt-3 p-3 mb-4">
                              <div style={{fontWeight: 600}} className="text-lg    ">Đồng hồ casio siêu rẻ chính hãng
                                  fx6570 đời mới nhất 2023 hangxn Paris Pháp
                              </div>
                              <div className="flex flex-grow gap-3 items-end mt-4">
                                  <div className="text-sm mb-0.5 text-neutral-500">Hiện tại</div>
                                  <div className="text-2xl font-semibold text-red-600">{formatMoney(370000)} VNĐ</div>
                              </div>
                              <div className="flex flex-grow gap-3 items-end ">
                                  <div className="text-sm mb-0.5 text-neutral-500">Giá trực tiếp</div>
                                  <div className="text-2xl font-semibold text-neutral-900">{formatMoney(700000)} VNĐ
                                  </div>
                              </div>
                              <div className="flex flex-grow gap-3 items-end mt-1 mb-4">
                                  <div className="text-sm mb-0.5 text-neutral-500">Phí giao hàng</div>
                                  <div className="text-base ">{formatMoney(30000)} VNĐ</div>
                              </div>
                              <div className="flex flex-row items-center gap-5 pb-0.5 pt-1">
                                  <div className="flex flex-row items-center gap-1 ">
                                      <div><img
                                          style={{width: 24, height: 24}}
                                          src="https://s.yimg.jp/images/auc/pc/search/image/2.0.1/icon_hammer.svg"
                                          alt=""/></div>
                                      <span className="text-sm text-blue-800">2 lượt đấu giá</span>
                                  </div>

                                  <div className="flex flex-row items-center gap-1 ">
                                      <div><img
                                          style={{width: 24, height: 24}}
                                          src="https://s.yimg.jp/images/auc/pc/item/image/1.0.2/icon_time.svg"
                                          alt=""/>
                                      </div>
                                      <span className="text-lg">3 ngày </span>
                                  </div>
                                  <div className="flex flex-row items-center text-xs px-1 bg-amber-100 gap-1 ">

                                      <span className="">Kết thúc : 2023/03/13 21:45:00</span>
                                  </div>

                              </div>
                              <div className="mt-5 mb-6 flex gap-1 flex-row items-center">
                                  <button type="button"
                                          className="text-xl hover:border-amber-600 hover:bg-amber-100 focus:outline-none  p-2.5 font-semibold  text-white rounded border-amber-500 cursor-pointer"
                                          style={{backgroundColor: '#e8680e', width: '100%'}}
                                  >
                                      Đấu Giá
                                  </button>
                                  <button
                                      className="text-xl p-2.5 hover:border-amber-700  font-semibold text-white rounded border-amber-500 cursor-pointer"
                                      style={{backgroundColor: '#c74200', width: '100%'}}>
                                      Mua Trực Tiếp
                                  </button>
                              </div>
                              <div className="text-center mb-2">
                                  <CountDownFullDate targetDate={targetDate}></CountDownFullDate>

                              </div>

                          </div>
                          {/*người dùng */}
                          <div style={{backgroundColor: "white"}}
                               className="pt-1 pb-1  mb-5 text-neutral-700 font-sans text-left">
                              <div className="flex flex-row p-3 pb-1 items-center gap-2">
                                  <Avatar size="large"
                                          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                                  <div
                                      className=" text-neutral-700 text-base font-sans"> Phạm
                                      Thành Chunng
                                  </div>
                              </div>
                              <div className="flex flex-row justify-center 0 gap-4 px-4 p-3 pb-2 items-center">
                                  <div className="flex-col gap-1">
                                      <span className="font-medium">4,6 </span>
                                      <StarFilled className="text-yellow-500"/>
                                  </div>
                                  <div
                                      className="flex-col pl-4 border-x border-neutral-200 flex items-center gap-1 pr-5 ">
                                      <span className="font-medium">179  </span>
                                      <span> đánh giá </span>
                                  </div>

                                  <div className="flex-col border-r border-neutral-200  flex items-center gap-1 pr-5 ">
                                      <span className="font-medium">178  </span>
                                      <span> đơn hàng </span>
                                  </div>
                                  <div className="flex-col  flex items-center gap-1 pr-5 ">
                                      <span className="font-medium">1789  </span>
                                      <span> điểm </span>
                                  </div>
                              </div>
                              <div className="flex flex-row  0 gap-1 px-4 p-3 pb-2 items-center">
                                  <img src="https://s.yimg.jp/images/auc/pc/item/image/1.0.2/icon_delivery.svg" alt=""/>
                                  Nơi gửi hàng : Hai Bà Trưng, Hà Nội
                              </div>
                              <div
                                  className="flex flex-row border-t border-neutral-300 mx-4 text-blue-800  gap-1 py-2  pb-2 items-center">
                                  <div className="cursor-pointer font-medium"
                                       onClick={() => navigate('/seller/ptchung')}>
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
                                      <div className="basis-1/3 font-medium">Danh mục</div>
                                      <div className="basis-2/3">Đồ chơi</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Thương hiệu</div>
                                      <div className="basis-2/3">Không</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Trạng thái</div>
                                      <div className="basis-2/3">Chưa sử dụng</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Số lượng</div>
                                      <div className="basis-2/3">1</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Trả lại</div>
                                      <div className="basis-2/3">Không thể trả hàng</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Giá khởi điểm</div>
                                      <div className="basis-2/3">{formatMoney(190000)} VNĐ</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Giá bán trực tiếp</div>
                                      <div className="basis-2/3">{formatMoney(4000000)} VNĐ</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Thời gian bắt đầu</div>
                                      <div className="basis-2/3">2023/09/04 15:43:00</div>
                                  </div>
                                  <div className="flex-row flex gap-3 mb-3">
                                      <div className="basis-1/3 font-medium">Thời gian bắt đầu</div>
                                      <div className="basis-2/3">2023/09/09 15:43:00</div>
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

export default ProductDetail

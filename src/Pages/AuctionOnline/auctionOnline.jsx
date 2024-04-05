import { Breadcrumb} from "antd";

import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import CountDownTitleBig from "../../Components/Clock/countDownTitleBig.jsx";

const AuctionOnline = () => {
  return(
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

                  {/*{isLoading &&*/}
                  {/*    <>*/}
                  {/*        <Spin className="text-center mt-60" tip="Loading" size="large">*/}
                  {/*        </Spin>*/}
                  {/*    </>*/}
                  {/*}*/}

                  {
                          <div className="flex flex-row items-start gap-6 p-5 m-2 mt-4 "
                               style={{backgroundColor:'#ef9731'}}
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
                                                   src="https://storage.googleapis.com/auction_gr/1711036059504658ed6c300a80ce6b80ed8461%20qu%C3%A1%C2%BA%C2%A3%20chu%C3%A1%C2%BB%C2%91i%20c%C3%83%C2%B3%20bao%20nhi%C3%83%C2%AAu%20calo%20-%20Thumbnail.jpg"
                                                   alt={`Image`}/>
                                          </li>
                                      </ul>
                                  </div>
                              </div>

                              <div className="md:basis-1/2 sm:basis-2/5">
                                      <CountDownTitleBig hours={9} minutes={13} seconds={0}/>
                                  {/*thông tinn đấu giá*/}
                                  <div
                                      className="flex flex-col ring-2 ring-orange-500 text-white  shadow-lg shadow-orange-500/50 font-sans text-left mt-6 mx-10 mb-6"
                                      style={{backgroundColor: '#f1a851'}}>
                                      <div style={{fontWeight: 600, textShadow: '0px 0px 10px #ccc3b8'}}
                                           className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5   p-2 pr-6 relative">
                                            <span className="text-base  flex  gap-3  ">
                                                <img src="../../src/assets/bid.png" alt="" style={{width:'12%'}}/>
                                               Diễn biến cuộc đấu giá
                                            </span>
                                          <span className="text-sm hover:text-blue-600 cursor-pointer  hover:underline ">
                                               Xem tất cả
                                            </span>
                                      </div>
                                      <div className="flex justify-between items-center ">
                                          <div style={{fontWeight: 600}} className=" px-6 p-1.5 flex flex-col  relative">
                                            <h1 className=" text-base shadow-black  " style={{textShadow: '#f1a851 1px 0 10px'}}>
                                               333.000 Đ
                                            </h1>
                                              <span className="text-xs text-gray-200">
                                              23/09/2023 - 14:15:02:103
                                            </span>
                                          </div>
                                          <div className="px-6 font-bold text-base">
                                              h*****r
                                          </div>
                                      </div>
                                      <div className="flex justify-between items-center ">
                                          <div style={{fontWeight: 600}} className=" px-6 p-1.5 flex flex-col  relative">
                                            <span className=" text-base   ">
                                               333.000 Đ
                                            </span>
                                              <span className="text-xs text-gray-200">
                                              23/09/2023 - 14:15:02:103
                                            </span>
                                          </div>
                                          <div className="px-6 font-bold text-base">
                                              h*****r
                                          </div>
                                      </div>
                                      <div className="flex justify-between items-center ">
                                          <div style={{fontWeight: 600}} className=" px-6 p-1.5 flex flex-col  relative">
                                            <span className=" text-base   ">
                                               333.000 Đ
                                            </span>
                                              <span className="text-xs text-gray-200">
                                              23/09/2023 - 14:15:02:103
                                            </span>
                                          </div>
                                          <div className="px-6 font-bold text-base">
                                              h*****r
                                          </div>
                                      </div>
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
                                              400.000 Đ
                                            </span>
                                      </div>
                                      <div className=" justify-between items-center ">

                                          <div className="p-3 text-center cursor-pointer bg-gradient-to-r from-orange-500 to-yellow-700 hover:from-red-700 hover:to-orange-500  mx-8 mt-3 mb-3 font-semibold text-lg" >
                                              <span>Trả giá <span className='font-bold'>600.000 đ</span> </span>
                                          </div>
                                          <div className="text-xs text-center m-3">Sáu trăm nghìn đồng </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                  }
              </div>
          </MainLayOut>
      </>
  )
}
export default AuctionOnline

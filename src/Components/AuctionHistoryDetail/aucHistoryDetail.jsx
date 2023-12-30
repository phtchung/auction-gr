import SideBar from "../SideBar/index.jsx";

import {Step, StepLabel, Stepper} from "@mui/material";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getAuctionHistoryDetail} from "../../Services/productService.jsx";
import {formatDateTime} from "../../Utils/constant.js";


const AucHistoryDetail = () => {

    const navigate = useNavigate()
    const aucHistoryParams = useParams();
    console.log(aucHistoryParams)
    const {isLoading , isSuccess , data} = useQuery({
        queryKey:['getAucHistoryDetail'],
        queryFn :() => getAuctionHistoryDetail(aucHistoryParams.id)
    })
    console.log(data?.data)
    const steps = [
        'Đấu giá thành công',
        'Xác nhận đơn hàng',
        'Bắt đầu giao hàng',
        'Đã nhận được hàng',
    ];
  return(
      <>
          <div className="wrapper">
              <SideBar/>
              <div className="home-right bg-white">
                  {isSuccess &&
                      <>
                          <div className="flex justify-between items-center m-1.5">
                              <div className="flex items-center cursor-pointer" onClick={() => navigate(-1)}>
                                  <ArrowBackIosOutlinedIcon sx={{fontSize: 20}}
                                                            color='rgb(212,212,212)'></ArrowBackIosOutlinedIcon>
                                  <div className="text-sm"> TRỞ LẠI</div>
                              </div>

                              <div className="text-right px-5 pt-3 pb-3 text-sm  text-red-700  bg-white">
                                  ĐƠN HÀNG ĐÃ HOÀN THÀNH
                              </div>
                          </div>

                          <div className="border-b border-neutral-300 "></div>
                          <div className="bg-white pt-10">
                              <Stepper activeStep={4} alternativeLabel>

                                  <Step>
                                      <StepLabel>{steps[0]} <br/> <span
                                          className="text-xs text-stone-400">{formatDateTime(data.data.victory_time)}</span>
                                      </StepLabel>
                                  </Step>
                                  <Step>
                                      <StepLabel>{steps[1]} <br/> <span
                                          className="text-xs text-stone-400">{formatDateTime(data.data.createdAt)}</span>
                                      </StepLabel>
                                  </Step>
                                  <Step>
                                      <StepLabel>{steps[2]} <br/> <span
                                          className="text-xs text-stone-400">{formatDateTime(data.data.delivery_start_at)}</span>
                                      </StepLabel>
                                  </Step>
                                  <Step>
                                      <StepLabel>{steps[3]} <br/> <span
                                          className="text-xs text-stone-400">{formatDateTime(data.data.completed_at)}</span>
                                      </StepLabel>
                                  </Step>

                              </Stepper>
                          </div>
                          <div className="border-b border-neutral-300 mx-14 pt-10 "></div>

                          <div className="grid grid-cols-3 bg-white pt-8 gap-4">
                              <div className="text-sm text-left font-light text-neutral-600 mx-6 ">
                                  <div className="text-base font-semibold text-neutral-600 mx-6">Thông tin nhận hàng
                                  </div>

                                  <div className="flex-col mt-4 mx-6  ">
                                      <div className="mb-3">{data.data.name}</div>
                                      <div className="text-xs text-neutral-500 mb-2">{data.data.phone}</div>
                                      <div className="text-xs text-neutral-500">{data.data.address}
                                      </div>
                                  </div>
                              </div>
                              <div className="col-span-2 border-l border-gray-300">
                                  <div className="mx-6">
                                      <div className="text-base font-semibold text-neutral-600  text-left">Thông tin sản
                                          phẩm
                                      </div>
                                      <div className="flex items-start mt-4">
                                          <div className=" w-24">
                                              <img
                                                  src="https://down-vn.img.susercontent.com/file/2618feef5924bb0b0c2eaa348a66ee8a_tn"
                                                  alt=""/>
                                          </div>
                                          <div className="flex flex-col text-sm">
                                              <div className="px-4 max-w-3xl  text-left">
                                                  {data.data.product_name}
                                              </div>
                                              <div style={{color: 'rgba(0,0,0,.54)'}}
                                                   className="px-4 mt-2 max-w-3xl text-left">
                                                  Rank : {data.data.rank}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="grid grid-cols-3 text-sm mt-10">
                                      <div className="col-span-2 border-r border-gray-300 text-right pl-6 ">
                                          <div className="border-b border-gray-200 "></div>
                                          <div className="border-b border-gray-200 p-3">Giá khởi điểm</div>
                                          <div className="border-b border-gray-200 p-3">Giá thắng</div>
                                          <div className="border-b border-gray-200 p-3">Phí vận chuyển</div>
                                          <div className="border-b border-gray-200 p-4">Tổng tiền</div>
                                      </div>
                                      <div className="col-1 text-right mr-6">
                                          <div className="border-b border-gray-200 "></div>
                                          <div className="border-b border-gray-200  p-3">{data.data.reserve_price}đ</div>
                                          <div className="border-b border-gray-200 p-3">{data.data.final_price}đ</div>
                                          <div className="border-b border-gray-200 p-3">{data.data.shipping_fee}đ</div>
                                          <div
                                              className="border-b border-gray-200 font-semibold text-base text-gray-600 p-4">
                                              {data.data.final_price + data.data.shipping_fee}đ
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </>
                  }

              </div>

          </div>
      </>
  )
}

export default AucHistoryDetail

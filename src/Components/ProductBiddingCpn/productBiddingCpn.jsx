import StarIcon from '@mui/icons-material/Star';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const ProductBiddingCpn = ({data}) => {

    console.log(data)
  return(
      <>
          <div className=" px-6 py-3 mb-3 shadow-inner bg-white  text-sm ">
              <div className="flex pb-2 pt-2 items-center  border-b border-b-gray-150">
                  <div className="font-semibold pr-10">
                      {data?.seller_name}
                  </div>
                  <div className="">
                      {data?.avr_rating}
                  </div>
                  <StarIcon fontSize="small"
                            sx={{color: 'rgb(245 158 11)', width: 14, height: 14}}></StarIcon>

                  <div className="flex items-center gap-6 ml-auto">
                      <div className="leading-10 ">{data?.start_time}</div>
                      <NotificationsActiveIcon></NotificationsActiveIcon>
                      <div className="leading-10 pr-4 border-r border-gray-200">{data?.finish_time}</div>
                      <button
                          className="p-2 px-6 py-2  right-0  bg-blue-800 rounded   text-white border-gray-400 border-none text-sm  font-medium focus:outline-0">
                          Tới trang đấu giá
                      </button>
                  </div>
              </div>
              <div className="flex pb-3 py-4 items-center   border-b border-b-gray-150">
                  <div className="flex items-start">
                      <div className=" w-24">
                          <img
                              src="https://down-vn.img.susercontent.com/file/2618feef5924bb0b0c2eaa348a66ee8a_tn"
                              alt=""/>
                      </div>
                      <div className="flex flex-col">
                          <div className="px-4 max-w-3xl text-base text-left">
                              {data?.product_name}
                          </div>
                          <div style={{color: 'rgba(0,0,0,.54)'}} className="px-4 mt-2 max-w-3xl text-left">
                              Rank : {data?.rank}
                          </div>
                      </div>
                  </div>
                  <div className=" text-base ml-auto px-5">
                     Giá khởi điểm  <span className="font-semibold">{data?.reserve_price} đ</span>
                  </div>
              </div>
              <div className="py-4 flex items-center " style={{backgroundColor: '#fffefb'}}>
                  <div className="flex items-center " style={{color: 'rgba(0,0,0,.54)'}}>
                      <div>Người trả giá cao nhất : {data?.bidder}</div>
                  </div>

                  <div className="flex ml-auto items-center gap-2 px-6">
                      <div className="text-base">Giá hiện tại :</div>
                      <div className="font-semibold text-2xl">{data?.bid_price} đ</div>
                  </div>
              </div>

          </div>
      </>
  )
}

export default ProductBiddingCpn;

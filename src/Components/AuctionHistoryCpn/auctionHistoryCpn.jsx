import StarIcon from '@mui/icons-material/Star';
import {useNavigate } from "react-router-dom";
import {formatDateTime} from "../../Utils/constant.js";

const AuctionHistoryCpn = ({data}) => {
    console.log(data)


    const navigate = useNavigate()
    return(
        <>
            <div className=" px-6 py-3 mb-3 shadow-inner bg-white  text-sm cursor-pointer"  onClick={()=> navigate('/auctionHistory'+`/auction/${data.id}`)}>
                <div className="flex pb-2 pt-2 items-center  border-b border-b-gray-150" >
                    <div className="font-semibold pr-10">
                        {data?.seller_name}
                    </div>
                    <div className="" >
                        4.5
                    </div>
                    <StarIcon fontSize="small"
                              sx={{color: 'rgb(245 158 11)', width: 14, height: 14}}></StarIcon>

                    <div className="flex items-center gap-3 ml-auto">
                        <div className="leading-10 pr-4 border-r border-gray-200">{formatDateTime(data.completed_at)}</div>
                        <div
                            className="p-2  py-2  right-0   rounded  text-red-600 border-gray-400 border-none text-sm  font-medium focus:outline-0">
                           HOÀN THÀNH
                        </div>
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
                                {data.product_name}
                            </div>
                            <div style={{color: 'rgba(0,0,0,.54)'}} className="px-4 mt-2 max-w-3xl text-left">
                                Rank : {data.rank}
                            </div>
                        </div>
                    </div>
                    <div className="text-red-500 text-base ml-auto px-5">
                        {data.reserve_price}đ
                    </div>
                </div>
                <div className="py-4 flex items-center " style={{backgroundColor: '#fffefb'}}>
                    <div className="flex items-center gap-3" style={{color: 'rgba(0,0,0,.54)'}}>
                        {/*<img src="src/assets/fast.png" style={{maxWidth: '5%'}} alt=""/>*/}
                        <div>Đơn hàng đã giao thành công</div>
                    </div>

                    <div className="flex ml-auto items-center gap-2 px-6">
                        <div className="">Giá trúng thầu :</div>
                        <div className="text-red-500 text-2xl">{data.final_price}đ</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AuctionHistoryCpn;

import {numberToString} from "../../Utils/constant.js";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import {useNavigate} from "react-router-dom";

const RequestInfo = ({data}) => {
    console.log(data)
    const navigate = useNavigate()
    const stateStr = numberToString(data.status)
  return(
      <>
          <div className="flex m-4 gap-2 items-center px-2 justify-between">
              <div className="flex items-center cursor-pointer" onClick={() => navigate(-1)}>
                  <ArrowBackIosOutlinedIcon sx={{fontSize: 20}} color='rgb(212,212,212)'></ArrowBackIosOutlinedIcon>
                  <div className="text-sm"> TRỞ LẠI</div>
              </div>

              <div className="flex items-center gap-2">
                  <div className="text-left text-lg ">List - {stateStr} </div>
                  <ArrowForwardIosOutlinedIcon sx={{fontSize: 18}} fontSize="small"
                                               color="gray"></ArrowForwardIosOutlinedIcon>
                  <div className="">Request Detail</div>
              </div>

          </div>
          <div className="border-b border-gray-400  mx-5"></div>
          <div className="flex justify-between m-2.5 items-center px-2">
              <div className="text-left text-sm font-semibold ">Request Information</div>
              <div className="text-base font-semibold mr-10 bg-amber-300 p-1 px-4"> {stateStr}</div>
          </div>

          <div className="items-center font-medium text-xs gap-6 my-8 mx-8 px-1 space-y-6 ">

              <div className="grid grid-cols-6 text-left">
                  <div> Request ID :</div>
                  <div className="font-normal  col-span-2"> {data.id.slice(0,14)}</div>
                  <di> Request Time :</di>
                  <div className="font-normal col-span-2"> {data.createdAt}</div>
              </div>

              <div className="grid grid-cols-6 text-left">
                  <div> Product Name :</div>
                  <div className="font-normal  col-span-5"> {data.product_name}</div>
              </div>
              <div className="grid grid-cols-6 text-left">
                  <div> Category :</div>
                  <div className="font-normal col-span-2"> Đồng hồ</div>
                  <div> Rank :</div>
                  <div className="font-normal col-span-2"> {data.rank}</div>
              </div>

              <div className="grid grid-cols-6 text-left">
                  <div> Reverse Price :</div>
                  <div className="font-normal col-span-2"> {data.reserve_price} VND</div>
                  <div> Sale Price :</div>
                  <div className="font-normal col-span-2"> {data.sale_price} VND</div>
              </div>
              <div className="grid grid-cols-6 text-left font-medium">
                  <div> Step Price :</div>
                  <div className="font-normal col-span-2"> {data.step_price} VND</div>
                  <div> Shipping Fee :</div>
                  <div className="font-normal col-span-2"> {data.shipping_fee} VND</div>
              </div>

              <div className="grid grid-cols-6 text-left">
                  <div> Description :</div>
                  <div className="font-normal col-span-5"> {data.description}
                  </div>
              </div>

              <div className="grid grid-cols-6 text-left">
                  <div> Product Image :</div>
                  <div className="font-normal col-span-5"></div>
              </div>
          </div>
      </>
  )
}
export default RequestInfo;

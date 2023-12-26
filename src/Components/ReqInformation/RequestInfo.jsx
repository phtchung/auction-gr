import {numberToString} from "../../Utils/constant.js";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined.js";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined.js";
import {useNavigate} from "react-router-dom";

const RequestInfo = ({state}) => {
    const navigate = useNavigate()
    const stateStr = numberToString(state)
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
                  <div className="font-normal  col-span-2"> 20230903203322</div>
                  <di> Request Time :</di>
                  <div className="font-normal col-span-2"> 2023-09-09 15:03:21</div>
              </div>

              <div className="grid grid-cols-6 text-left">
                  <div> Product Name :</div>
                  <div className="font-normal  col-span-5"> Đồng hồ Rolex A532 2022</div>
              </div>
              <div className="grid grid-cols-6 text-left">
                  <div> Category :</div>
                  <div className="font-normal col-span-2"> Đồng hồ</div>
                  <div> Rank :</div>
                  <div className="font-normal col-span-2"> S</div>
              </div>

              <div className="grid grid-cols-6 text-left">
                  <div> Reverse Price :</div>
                  <div className="font-normal col-span-2"> 290.000 VND</div>
                  <div> Sale Price :</div>
                  <div className="font-normal col-span-2"> 4.000.000 VND</div>
              </div>
              <div className="grid grid-cols-6 text-left font-medium">
                  <div> Step Price :</div>
                  <div className="font-normal col-span-2"> 10.000 VND</div>
                  <div> Shipping Fee :</div>
                  <div className="font-normal col-span-2"> 30.000 VND</div>
              </div>

              <div className="grid grid-cols-6 text-left">
                  <div> Description :</div>
                  <div className="font-normal col-span-5"> Đồng hồ sịn , mới dùng 3 lần.
                      Còn bảo hành hãng 3 tháng
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

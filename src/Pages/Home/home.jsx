import SideBar from "../../Components/SideBar/index.jsx";

import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Home = () => {
  return(
      <>
          <div className="wrapper">
              <SideBar></SideBar>
              <div className="home-right bg-white">
                  <div className="text-left px-5 pt-3 pb-5 text-xl font-bold text-neutral-600  bg-white">Thông tin cá
                      nhân
                  </div>
                  <div className="border-b border-neutral-200 "></div>
                  <div className="items-center pt-6 text-sm gap-6 my-8 mx-8 px-1  ">

                      <div className="flex-1 pr-5 px-12 text-lef w-4/6">
                          <div className="flex pt-3 pb-5 gap-6 text-right">
                              <div className=" w-1/5"> Tên đăng nhập</div>
                              <div className=" "> chung.pt1944</div>
                          </div>
                          <div className="flex pt-3 pb-5 items-center gap-6 text-right">
                              <div className=" w-1/5"> Tên</div>
                              <div className="relative  w-3/5 shadow-sm">
                                  <input type="text" name="price" id="price"
                                         value="Phạm Thành Chung"
                                         className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"/>
                              </div>
                          </div>
                          <div className="flex pt-3 pb-5  gap-6 text-right">
                              <div className=" w-1/5"> Email</div>
                              <div className=" "> chung.pt194493@gmail.com</div>
                          </div>
                          <div className="flex pt-3 pb-5  gap-6 text-right">
                              <div className=" w-1/5"> Số điện thoại</div>
                              <div className=" "> 0918286381</div>
                          </div>
                          <div className="flex pt-3 pb-5  gap-6 text-right">
                              <div className=" w-1/5"> Điểm tích lũy</div>
                              <div className=" "> 1200</div>
                          </div>
                          <div className="flex pt-3 pb-5  gap-6 text-right">
                              <div className=" w-1/5"> Giới tính</div>
                              <div className="flex gap-3">
                                  <input id="male" className="peer/draft" type="radio" name="gender" checked/>
                                  <label htmlFor="male" className="peer-checked/draft:text-orange-500">Nam</label>
                                  <input id="female" className="peer/published" type="radio" name="gender"/>
                                  <label htmlFor="female"
                                         className="peer-checked/published:text-orange-500">Nữ</label>
                              </div>

                          </div>
                          <div className="flex pt-3 pb-5 items-center gap-6 text-right">
                              <div className=" w-1/5"> Ngày sinh</div>
                              <LocalizationProvider dateFormats="fullDate" dateAdapter={AdapterDayjs}>
                                  <DatePicker  defaultValue={dayjs('2022-04-17')}
                                               sx={{ '& .MuiInputBase-input':{width:258}}}
                                               components={{
                                      OpenPickerIcon: () =>
                                          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                  }} />
                              </LocalizationProvider>
                          </div>
                          <div className="flex pt-3 pb-5  gap-6 text-right">
                              <div className=" w-1/5"></div>
                              <button className=" bg-orange-500 text-white px-5 py-2.5 rounded  border-none">Lưu
                              </button>
                          </div>
                      </div>
                  </div>

              </div>

          </div>
      </>
  )
}

export default Home;

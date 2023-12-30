import SideBar from "../../Components/SideBar/index.jsx";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Header from "../../Components/Header/header.jsx";
import useProfile from "./useProfile.jsx";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateUserInfo} from "../../Services/userService";
import login from "../Login/login.jsx";

const Profile = () => {
    const {
        userData,
        isSuccess,
        isLoading,

    } = useProfile();
    console.log('aaaa',userData)
    const [gender,setGender] = useState(userData?.gender || false)
    const [data,setData] = useState(userData)
    const queryClient = useQueryClient();
    const handleRadio = () => {
        setGender((prevValue) => !prevValue);

        setData({
            ...data,
            'gender': !gender,
        });
    }
    const handleData = ((key,value) => {
      setData({...data,[key]:value})
    })
    console.log(userData)

    const update = useMutation({
        mutationFn: () => updateUserInfo({ ...data, userId: userData.id }),
        })

    const onSubmit = () => {
        console.log(data);
        update.mutate(
            { ...data, userId: userData.id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['getUser'],
                    });

                    toast.success('Cập nhập thành công',{
                        autoClose: 2000,
                    });
                }
            }
        );
    };
  return(
      <>  <Header></Header>
          <div className="wrapper">
              <SideBar></SideBar>
              {isSuccess && <>
                  <div className="home-right bg-white">
                      <div className="text-left px-5 pt-3 pb-5 text-xl font-bold text-neutral-600  bg-white">Thông tin
                          cá nhân
                      </div>
                      <div className="border-b border-neutral-200 "></div>
                      <div className="items-center pt-6 text-sm gap-6 my-8 mx-8 px-1  ">

                          <div className="flex-1 pr-5 px-12 text-lef w-4/6">
                              <div className="flex pt-3 pb-5 gap-6 text-right">
                                  <div className=" w-1/5"> Tên đăng nhập</div>
                                  <div className=" "> {userData?.username}</div>
                              </div>
                              <div className="flex pt-3 pb-5 items-center gap-6 text-right">
                                  <div className=" w-1/5"> Tên</div>
                                  <div className="relative  w-3/5 shadow-sm">
                                      <input type="text" name="price" id="price" disabled
                                             value="Phạm Thành Chung"
                                             className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"/>
                                  </div>
                              </div>
                              <div className="flex pt-3 pb-5  gap-6 text-right">
                                  <div className=" w-1/5"> Email</div>
                                  <div className=" "> {userData.email}</div>
                              </div>
                              <div className="flex pt-3 pb-5  gap-6 text-right">
                                  <div className=" w-1/5"> Số điện thoại</div>
                                  <div className=" "> {userData?.phone}</div>
                              </div>
                              <div className="flex pt-3 pb-5  gap-6 text-right">
                                  <div className=" w-1/5"> Điểm tích lũy</div>
                                  <div className=" "> {userData?.point}</div>
                              </div>
                              <div className="flex pt-3 pb-5  gap-6 text-right">
                                  <div className=" w-1/5"> Giới tính</div>
                                  <div className="flex gap-3">

                                      <input id="male" className="peer/draft" type="radio" name="gender"  defaultChecked={userData.gender}  onChange={handleRadio}/>
                                      <label htmlFor="male" className="peer-checked/draft:text-orange-500">Nam</label>
                                      <input id="female" className="peer/published" type="radio" name="gender"  defaultChecked={!userData.gender}  onChange={handleRadio} />
                                      <label htmlFor="female"
                                             className="peer-checked/published:text-orange-500">Nữ</label>
                                  </div>

                              </div>
                              <div className="flex pt-3 pb-5 items-center gap-6 text-right">
                                  <div className=" w-1/5"> Ngày sinh</div>
                                  <LocalizationProvider dateFormats="fullDate" dateAdapter={AdapterDayjs}>
                                      <DatePicker defaultValue={dayjs(userData.birthday)}
                                                  sx={{'& .MuiInputBase-input': {width: 258}}}
                                                  onChange={(newValue) => handleData('date_of_birth',newValue.format('YYYY-MM-DD'))}
                                                  components={{
                                                      OpenPickerIcon: () =>
                                                          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                                  }}/>
                                  </LocalizationProvider>
                              </div>
                              <div className="flex pt-3 pb-5  gap-6 text-right" onClick={ onSubmit}>
                                  <div className=" w-1/5"></div>
                                  <button  className=" bg-orange-500 text-white px-5 py-2.5 rounded  border-none">Lưu
                                  </button>
                              </div>
                          </div>
                      </div>

                  </div>
              </>
              }

          </div>
      </>
  )
}

export default Profile;

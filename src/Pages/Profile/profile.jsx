import SideBar from "../../Components/SideBar/index.jsx";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useProfile from "./useProfile.jsx";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateUserInfo} from "../../Services/userService";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Tooltip} from "antd";

const Profile = () => {
    const {userData, isSuccess, isLoading} = useProfile();
    const [data, setData] = useState(userData);
    const queryClient = useQueryClient();
    const [check , setCheck] = useState(false)

    const handleRadio = (value) => {
        setData({
            ...data,
            gender: value,
        });
        setCheck(true)
    };

    const handleData = (key, value) => {
        setData({...data, [key]: value});
        setCheck(true)
    };

    const update = useMutation({
        mutationFn: () => updateUserInfo({...data, userId: userData.id}),
    });

    const onSubmit = () => {
        update.mutate(
            {...data, userId: userData.id},
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["getUser"],
                    });

                    toast.success("Cập nhập thành công", {
                        autoClose: 1000,
                    });
                },
            },
        );
    };
    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <SideBar></SideBar>
                    {isSuccess && (
                        <>
                            <div className="home-right bg-white">
                                <div className="text-left px-5 pt-3 pb-5 text-xl font-bold text-neutral-600  bg-white">
                                    Thông tin cá nhân
                                </div>
                                <div className="border-b border-neutral-200 "></div>

                                <div className="items-center  text-sm gap-6 my-8 mx-8 px-1  ">
                                    <div className="flex-1 pr-5 px-12 text-lef w-4/6">
                                        <div className="flex pt-3 pb-5 gap-6 text-right">
                                            <div className=" w-1/5"> Tên đăng nhập</div>
                                            <div className=" "> {userData?.username}</div>
                                        </div>
                                        <div className="flex pt-3 pb-5 items-center gap-6 text-right">
                                            <div className=" w-1/5"> Tên</div>
                                            <div className="relative  w-3/5">
                                                <input
                                                    type="text"
                                                    name="price"
                                                    id="price"
                                                    disabled
                                                    value={userData.name}
                                                    className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                                />
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
                                            <div className=" w-1/5"> Điểm cửa hàng </div>
                                            <div className=" "> {userData?.shop_point}</div>
                                        </div>
                                        <div className="flex pt-3 pb-5  gap-6 text-right">
                                            <div className=" w-1/5"> Giới tính</div>
                                            <div className="flex gap-3">
                                                <input
                                                    id="male"
                                                    className="peer/draft"
                                                    type="radio"
                                                    name="gender"
                                                    defaultChecked={
                                                        (userData.gender && userData.gender === "1") || false}
                                                    onChange={() => handleRadio(1)}
                                                />
                                                <label
                                                    htmlFor="male"
                                                    className="peer-checked/draft:text-orange-500"
                                                >
                                                    Nam
                                                </label>
                                                <input
                                                    id="female"
                                                    className="peer/published"
                                                    type="radio"
                                                    name="gender"
                                                    defaultChecked={
                                                        (userData.gender && userData.gender === "0") || false}
                                                    onChange={() => handleRadio(0)}
                                                />
                                                <label
                                                    htmlFor="female"
                                                    className="peer-checked/published:text-orange-500"
                                                >
                                                    Nữ
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex pt-3 pb-5  gap-6 text-right">
                                            <Tooltip placement="top" title={<p>Nhận thông báo tới email khi đấu giá thành công</p>} arrow={true}>
                                                <div className=" w-1/5"> Thông báo</div>
                                            </Tooltip>

                                            <label className="relative inline-flex cursor-pointer items-center">
                                                <input id="switch" type="checkbox" defaultChecked={userData.receiveAuctionSuccessEmail} onChange={(e) => handleData('receiveAuctionSuccessEmail', e.target.checked)} className="peer sr-only"/>
                                                <label htmlFor="switch" className="hidden"></label>
                                                <div
                                                    className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px]
                                                    after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white
                                                    after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full
                                                    peer-checked:after:border-white peer-focus:ring-green-300"></div>
                                            </label>

                                        </div>

                                        <div className="flex pt-3 pb-5 items-center gap-6 text-right">
                                            <div className=" w-1/5"> Ngày sinh</div>
                                            <LocalizationProvider
                                                dateFormats="fullDate"
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DatePicker
                                                    defaultValue={dayjs(userData.birthday)}
                                                    sx={{"& .MuiInputBase-input": {width: 258,fontSize:15}}}
                                                    onChange={(newValue) =>
                                                        handleData(
                                                            "date_of_birth",
                                                            newValue.format("YYYY-MM-DD"),
                                                        )
                                                    }
                                                    components={{
                                                        OpenPickerIcon: () => (
                                                            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                                        ),
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div
                                            className="flex pt-3 pb-5  gap-6 text-right"
                                            onClick={onSubmit}
                                        >
                                            <div className=" w-1/5"></div>
                                            <button
                                                disabled={!check}
                                                className={`${check ? 'bg-orange-500' : 'bg-gray-300 cursor-no-drop'}  text-white px-7 py-2 text-base rounded  border-none`}>
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </MainLayOut>

        </>
    );
};

export default Profile;

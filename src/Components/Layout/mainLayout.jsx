import {Avatar, Layout} from 'antd';
import './layout.css'
import '../../index.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import useNotify from "./useNotify.jsx";
import {useQueryClient} from "@tanstack/react-query";
import {emphasizeTextAfterHash} from "../../Utils/constant.js";
import useLogout from "../../Hooks/useLogout.js";
import {useAuthContext} from "../../Pages/Context/AuthContext.jsx";
import MessageContainer from "../Message/messageContainer.jsx";
import useConversation from "../../zustand/useConversation.js";
import {UserOutlined} from "@ant-design/icons";

const {Header, Content, Footer} = Layout;


const MainLayOut = ({children}) => {
    const {currentUser} = useAuthContext();
    const {isLd, isSc, setStatus, total, notifications} = useNotify()
    const queryClient = useQueryClient();
    const naviagate = useNavigate()
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const {loading, logout} = useLogout()
    const {openChat, setOpenChat, unReadCount} = useConversation();
    const location = useLocation()
    const [selectedItem, setSelectedItem] = useState(location.pathname);


    useEffect(() => {
        if (currentUser) {
            const eventSource = new EventSource('http://localhost:8088/events');

            // có blog được tạo
            eventSource.addEventListener('newBlog', function (event) {
                const newBlogData = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            // yêu câầu request được phee duyệt
            eventSource.addEventListener(`approveProduct_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                if (data) {
                    setStatus(0)
                    queryClient.invalidateQueries({
                        queryKey: ["getCountNotify", currentUser.id],
                    });
                }
            });

            // thoog báo đấu giá thành coonng cho người bán
            eventSource.addEventListener(`auctionSuccess_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            // tb cho người thaắng đấu giá
            eventSource.addEventListener(`buySuccess_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });

            });

            //tb update status đơn hanngf
            eventSource.addEventListener(`updateStatus_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                console.log(data)
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            //notify khi người bán gửi request yêu cầu đấu giá
            eventSource.addEventListener(`sendRequest_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                if (data) {
                    setStatus(0)
                    queryClient.invalidateQueries({
                        queryKey: ["getCountNotify", currentUser.id],
                    });
                }
            });

            //notify từ chối yêu cầu người dùng từ quản trị viên
            eventSource.addEventListener(`rejectProduct_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                if (data) {
                    setStatus(0)
                    queryClient.invalidateQueries({
                        queryKey: ["getCountNotify", currentUser.id],
                    });
                }
            });

            //notify yêu cầu trả đơn hàng của ngưởi thắng đấu giá
            eventSource.addEventListener(`returnProductWinner_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                console.log(data)
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            //notify nhận được yêu cầu trả hàng của ng bán
            eventSource.addEventListener(`returnProductSeller_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            //notify thông báo được accept yc trả hàng cho ng bán
            eventSource.addEventListener(`acceptReturnSeller_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            //notify thông báo được duyệt yêu cầu trả hàng cho ng thắng
            eventSource.addEventListener(`acceptReturnWinner_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            //notify nhận được yêu cầu trả hàng của ng bán
            eventSource.addEventListener(`returnProductSeller_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            //notify thông báo từ chối yêu cầu trả hàng cho ng thắng
            eventSource.addEventListener(`denyReturnWinner_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            //notify thông báo sp bị từ chối trả lại
            eventSource.addEventListener(`denyReturnSeller_${currentUser.id}`, function (event) {
                const data = JSON.parse(event.data);
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", currentUser.id],
                });
            });

            // này là nghe 1 s kiện riêng cho từng user , user nào thì nhét vào là được
            eventSource.addEventListener(`notification-${currentUser.id}`, function (event) {
                console.log(event)
                const newBlogData = JSON.parse(event.data);
                toast(`blog ten la vua ${newBlogData.title} duoc tao`)
            });

            return () => {
                eventSource.close();
            };
        }
    }, [currentUser]);

    const selectItem = (index) => {
        setSelectedItem(index);
    };
    const handleNotify = async () => {
        if (open1 === false) {
            try {
                queryClient.invalidateQueries({
                    queryKey: ["getNotify", currentUser.id],
                });
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        }
    }
    const handleRead = async () => {
        try {
            setStatus(1)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
    }
    const handleUrl = (url) => {
        naviagate(`../${url}`, {replace: true})
        setOpen(!open)
    }

    return (
        <Layout>
            <header className={`flex w-full header  items-center dark:bg-dark`} style={{backgroundColor: '#F27C08'}}>
                <div className="container">
                    <div className="relative -mx-2 flex items-center justify-between">
                        <div className="w-60 max-w-full px-4">
                            <a href="/#" className="block w-full py-3">
                                <img
                                    src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                                    alt="logo"

                                />
                            </a>
                        </div>
                        <div className="flex w-full items-center justify-between px-4">
                            <div>
                                <button
                                    onClick={() => setOpen(!open)}
                                    id="navbarToggler"
                                    className={` ${
                                        open ? "bg-orange-500" : ''
                                    } absolute right-0  top-1/2 block bg-orange-300 -translate-y-1/2 rounded-lg px-2.5 py-0.5 hover:border-none ring-orange-600 focus:ring-2 lg:hidden`}
                                >
                                    <span
                                        className="relative my-[6px] block h-[2px] w-6 bg-orange-500 dark:bg-white"></span>
                                    <span
                                        className="relative my-[6px] block h-[2px] w-6 bg-orange-500 dark:bg-white"></span>
                                    <span
                                        className="relative my-[6px] block h-[2px] w-6 bg-orange-500 dark:bg-white"></span>
                                </button>
                                <nav
                                    id="navbarCollapse"
                                    className={`absolute right-0 top-full w-full max-w-[180px] rounded-lg px-6 py-3 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-white ${!open ? 'hidden' : ''}`}
                                    style={{backgroundColor: 'rgb(242, 124, 8)'}}
                                >
                                    <ul className="block lg:flex">
                                        <ListItem NavLink="/" onItemClick={() => selectItem("/")}
                                                  active={selectedItem === "/"}>Đấu giá thường</ListItem>
                                        <ListItem NavLink="/auctionRealtime" onItemClick={() => selectItem('/auctionRealtime')}
                                                  active={selectedItem === '/auctionRealtime'}>Đấu giá Real-time</ListItem>
                                        <ListItem NavLink="/auctionStream" onItemClick={() => selectItem("/auctionStream")}
                                                  active={selectedItem === "/auctionStream"}>Đấu giá LiveStream</ListItem>
                                        <ListItem NavLink="/streamGeneral" onItemClick={() => selectItem("/streamGeneral")}
                                                  active={selectedItem === "/streamGeneral"}>Phòng đấu giá</ListItem>
                                        <ListItem NavLink="/articles/news" onItemClick={() => selectItem("/articles/news")}
                                                  active={selectedItem === "/articles/news"}>Tin tức</ListItem>
                                    </ul>
                                </nav>
                            </div>
                            {
                                !currentUser &&
                                <>
                                    <div className="hidden justify-end pr-16 sm:flex  lg:pr-0">
                                        <a
                                            href="/signup"
                                            className="px-7 py-3 rounded-md  hover:text-white hover:bg-orange-400 text-base font-medium text-white"
                                        >
                                            Đăng kí
                                        </a>

                                        <a
                                            href="/login"
                                            className="rounded-md hover:bg-orange-400  hover:text-white px-7 py-3 text-base font-medium text-white "
                                        >
                                            Đăng nhập
                                        </a>
                                    </div>
                                </>
                            }

                            <div className=" flex relative  items-center   px-5 ">
                                {
                                    currentUser && <>
                                        <div className="cursor-pointer  h-full change "
                                             onClick={() => naviagate('/productBid')}>
                                            <img className=" p-2 rounded-md hover:bg-orange-500 h-11 w-11"
                                                 src="https://storage.googleapis.com/auction_gr/1712158718386658d8d59ded725a37cb8924eauction.png"
                                                 alt=""/>
                                        </div>

                                        <div onClick={() => handleNotify()} className=" h-full change "
                                             style={{position: 'relative', animation: 'fadein .4s'}}>
                                            <span className="cursor-pointer" onClick={() => setOpen1(!open1)}>
                                                <img className="p-2 rounded-md hover:bg-orange-500 h-11 w-11"
                                                     src="https://storage.googleapis.com/auction_gr/1712158719115658d8d59ded725a37cb8924enotification-bell.png"
                                                     alt=""/>
                                            </span>

                                            {
                                                notifications && <>
                                                    {
                                                        total > 0 &&
                                                        <>
                                                            <div className="counter">
                                                                {total}
                                                            </div>
                                                        </>
                                                    }
                                                    {
                                                        open1 && <>
                                                            <div className="notifications ">
                                                                <div
                                                                    className="flex items-center justify-between  p-4 h-14 text-base leading-6  text-left font-semibold"
                                                                    style={{borderBottom: '1px solid rgb(222 222 222)'}}>
                                                                    <div>
                                                                        Thông báo
                                                                    </div>
                                                                    <div onClick={() => handleRead()}
                                                                         className="text-orange-500 cursor-pointer hover:underline text-sm">
                                                                        Đánh dấu là đã đọc
                                                                    </div>
                                                                </div>

                                                                {notifications.map((noti) => (
                                                                    <>
                                                                        <div
                                                                            onClick={() => handleUrl(noti.url)}
                                                                            className="px-4 py-3 cursor-pointer text-left hover:text-orange-500 leading-6"
                                                                            style={{borderBottom: '1px solid rgb(230 234 234)'}}>
                                                                            <div
                                                                                className=" font-semibold  mb-1"> {noti?.title}
                                                                            </div>

                                                                            <div className="mb-2 leading-5 "
                                                                                 dangerouslySetInnerHTML={{__html: emphasizeTextAfterHash(noti?.content)}}></div>
                                                                            <div
                                                                                className="text-xs hover:text-neutral-700 text-neutral-700 opacity-80">{noti?.createdAt}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))}
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>

                                        <div onClick={() => setDropdownOpen(!dropdownOpen)}
                                             className="relative lg:w-44 md:w-28">
                                            <a className="flex items-center gap-4" href="#"
                                               onClick={() => setDropdownOpen(!dropdownOpen)}>
                                            <span className="hidden text-right lg:block flex-grow">
                                                <span
                                                    className="block text-sm font-medium truncate text-white dark:text-white">{currentUser?.username}</span>

                                            </span>
                                                <span className="rounded-full">
                                                  <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                                    {/*<img src="src/images/user/user-01.png" alt="User"/>*/}
                                                </span>

                                                <svg
                                                    className={dropdownOpen ? 'rotate-180' : ' fill-white sm:block'}
                                                    width="12" height="8" viewBox="0 0 12 8" fill="white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                                                          fill=""></path>
                                                </svg>
                                            </a>

                                            <div style={{display: dropdownOpen ? 'block' : 'none'}}
                                                 className="absolute right-0 mt-4 flex w-full flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                                <ul className="flex flex-col  border-b border-stroke  dark:border-strokedark">
                                                    <li>
                                                        <a href="/user/profile"
                                                           className="flex px-1.5 py-2 hover:text-neutral-700 items-center gap-2 text-sm  duration-300 ease-in-out text-neutral-600 hover:bg-neutral-100">
                                                            <svg className="fill-black" width="16" height="16"
                                                                 viewBox="0 0 22 22" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                                                                    fill=""></path>
                                                                <path
                                                                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                                                                    fill=""></path>
                                                            </svg>
                                                            <span className="truncate">Tài khoản cá nhân</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/reqOrderTracking"
                                                           className="flex px-1.5 py-2 hover:text-neutral-700 items-center gap-2 text-sm  duration-300 ease-in-out text-neutral-600 hover:bg-neutral-100">
                                                            <svg className="fill-black" width="16" height="16"
                                                                 viewBox="0 0 22 22" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998
                                                                         18.0125 4.29685 18.0125H5.25935V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374ZM16.9469 18.5625C16.9469 19.2844 16.3625 19.8344 15.6406 19.8344H7.3906C7.04685 19.8344 6.77185 19.5594 6.77185 19.2156V17.875H8.6281C9.0406 17.875 9.41873 17.5312 9.41873 17.0844C9.41873 16.6375 9.07498 16.2937 8.6281 16.2937H6.77185V11.7906H8.6281C9.0406
                                                                         11.7906 9.41873 11.4469 9.41873 11C9.41873 10.5875 9.07498 10.2094 8.6281 10.2094H6.77185V5.63749H8.6281C9.0406
                                                                          5.63749 9.41873 5.29374 9.41873 4.84687C9.41873 4.39999 9.07498 4.05624 8.6281 4.05624H6.77185V2.74999C6.77185 2.40624 7.04685 2.13124 7.3906 2.13124H15.6406C15.9844 2.13124 16.2937 2.26874 16.5687 2.50937C16.8094 2.74999 16.9469 3.09374 16.9469 3.43749V18.5625Z"
                                                                    fill=""></path>
                                                            </svg>
                                                            Đơn bán
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/winOrderTracking"
                                                           className="flex px-1.5 py-2 hover:text-neutral-700 items-center gap-2 text-sm  duration-300 ease-in-out text-neutral-600 hover:bg-neutral-100">
                                                            <svg className="fill-black" width="16" height="16"
                                                                 viewBox="0 0 22 22" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998
                                                                         18.0125 4.29685 18.0125H5.25935V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374ZM16.9469 18.5625C16.9469 19.2844 16.3625 19.8344 15.6406 19.8344H7.3906C7.04685 19.8344 6.77185 19.5594 6.77185 19.2156V17.875H8.6281C9.0406 17.875 9.41873 17.5312 9.41873 17.0844C9.41873 16.6375 9.07498 16.2937 8.6281 16.2937H6.77185V11.7906H8.6281C9.0406
                                                                         11.7906 9.41873 11.4469 9.41873 11C9.41873 10.5875 9.07498 10.2094 8.6281 10.2094H6.77185V5.63749H8.6281C9.0406
                                                                          5.63749 9.41873 5.29374 9.41873 4.84687C9.41873 4.39999 9.07498 4.05624 8.6281 4.05624H6.77185V2.74999C6.77185 2.40624 7.04685 2.13124 7.3906 2.13124H15.6406C15.9844 2.13124 16.2937 2.26874 16.5687 2.50937C16.8094 2.74999 16.9469 3.09374 16.9469 3.43749V18.5625Z"
                                                                    fill=""></path>
                                                            </svg>
                                                            Đơn mua
                                                        </a>
                                                    </li>
                                                </ul>
                                                <button onClick={logout}
                                                        className="flex px-1.5 py-2 hover:text-neutral-700 items-center gap-2 text-sm w-full hover:bg-orange-300 bg-white border-none  duration-300 ease-in-out text-neutral-600 ">
                                                    <svg className="fill-black" width="16" height="16"
                                                         viewBox="0 0 22 22" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031
                                                                 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                                                            fill=""></path>
                                                        <path
                                                            d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                                                            fill=""></path>
                                                    </svg>
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Content
                style={{
                    padding: '0 36px',
                    backgroundColor: '#f5f5f5',
                    minHeight: '40rem'
                }}
                className="container"
            >
                <Layout>
                    <Content>
                        {children}
                    </Content>
                    {
                        currentUser &&
                        <>
                            <div style={{display: !openChat ? 'block' : 'none'}}>
                                <div onClick={() => setOpenChat(true)}
                                     className="fixed bottom-2 right-3 px-3 py-3 cursor-pointer bg-orange-500 rounded shadow-md">
                                    <div className="flex gap-2 items-center">
                                        <svg className="w-6 h-6 text-white fill-current"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M18 6.07a1 1 0 01.993.883L19 7.07v10.365a1 1 0 01-1.64.768l-1.6-1.333H6.42a1 1
                                         0 01-.98-.8l-.016-.117-.149-1.783h9.292a1.8 1.8 0 001.776-1.508l.018-.154.494-6.438H18zm-2.78-4.5a1
                                         1 0 011 1l-.003.077-.746 9.7a1 1 0 01-.997.923H4.24l-1.6 1.333a1 1 0 01-.5.222l-.14.01a1 1 0 01-.993-.883L1
                                         13.835V2.57a1 1 0 011-1h13.22zm-4.638 5.082c-.223.222-.53.397-.903.526A4.61 4.61 0 018.2 7.42a4.61 4.61 0
                                         01-1.48-.242c-.372-.129-.68-.304-.902-.526a.45.45 0 00-.636.636c.329.33.753.571 1.246.74A5.448 5.448 0 008.2
                                         8.32c.51 0 1.126-.068 1.772-.291.493-.17.917-.412 1.246-.74a.45.45 0 00-.636-.637z"></path>
                                        </svg>
                                        <p className="text-white font-medium text-lg">Chat</p>
                                    </div>
                                    {
                                        unReadCount > 99 ? (
                                            <div
                                                className="absolute border border-s-gray-100 rounded-2xl text-white text-xs h-4.5 overflow-hidden py-0.5 px-1.5 bg-orange-500 -right-1 box-border -top-2 cursor-pointer">
                                                99+
                                            </div>
                                        ) : unReadCount > 0 ? (
                                            <div
                                                className="absolute border border-s-gray-100 rounded-2xl text-white text-xs h-4.5 overflow-hidden py-0.5 px-1.5 bg-orange-500 -right-1 box-border -top-2 cursor-pointer">
                                                {unReadCount}
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                            </div>
                            <div style={{display: openChat ? 'block' : 'none'}}>
                                <MessageContainer></MessageContainer>
                            </div>
                        </>
                    }
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )
};
export default MainLayOut;

const ListItem = ({children, NavLink, onItemClick, active}) => {
    return (
        <>
            <li>
                <a
                    href={NavLink}
                    className={`flex py-2  text-sm lg:ml-5 lg:inline-flex hover:text-white text-gray-100 ${active ? 'active-nav' : ''}`}
                    onClick={onItemClick}
                >
                    {children}
                </a>
            </li>
        </>
    );
};

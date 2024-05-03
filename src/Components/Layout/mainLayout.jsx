import {UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Dropdown, Layout} from 'antd';
import './layout.css'
import '../../index.css'
import {Input} from 'antd';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import useNotify from "./useNotify.jsx";
import {useQueryClient} from "@tanstack/react-query";
import { emphasizeTextAfterHash} from "../../Utils/constant.js";
import useLogout from "../../Hooks/useLogout.js";
import {useAuthContext} from "../../Pages/Context/AuthContext.jsx";
import MessageContainer from "../Message/messageContainer.jsx";
import useConversation from "../../zustand/useConversation.js";
const {Search} = Input;
const {Header, Content, Footer} = Layout;


const MainLayOut = ({children}) => {
    const { currentUser } = useAuthContext();
    const {isLd, isSc,setStatus, total, notifications} = useNotify()
    const queryClient = useQueryClient();
    const naviagate = useNavigate()
    const [open, setOpen] = useState(false)
    const {loading , logout} = useLogout()
    const { openChat, setOpenChat , unReadCount } = useConversation();

    useEffect(() => {
        if(currentUser){
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


    const handleNotify = async () => {
        if (open === false) {
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
    const handleNavi = (url) => {
        naviagate(`/${url}`)
        window.scrollTo(0, 0)
    }
    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => handleNavi('user/profile')}>
                    Tài khoản cá nhân
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => handleNavi('reqOrderTracking')}>
                    Đơn bán
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => handleNavi('winOrderTracking')}>
                    Đơn mua
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div onClick={logout} >
                    Đăng xuất
                </div>
            ),
        },
    ];
    return (
        <Layout>
            <Header
                className="header"
                style={{
                    alignItems: 'center',
                    backgroundColor: 'orange',
                    minHeight: '7rem',
                    zIndex: '100!important'
                }}
            >
                <div className="flex font-normal justify-between mx-10 items-center relative font_fml" style={{
                    maxWidth: 1280,
                    padding: '7px 70px',
                    top: 0,
                    height: '24px',
                    margin: '2px auto',
                    fontSize: '13px',
                    color: 'white',
                    boxSizing: 'border-box',
                    lineHeight: '20px'

                }}>
                    <span>Vận chuyển nhanh chóng</span>
                    <div className="flex items-center   gap-1 ">
                        <PhoneOutlined/>
                        <span>Trung tâm Hỗ Trợ</span>
                    </div>
                    <div className="cursor-pointer hover:text-black" onClick={() => naviagate('/articles/news')}>Blog
                    </div>
                    {
                        !currentUser && <>
                            <div className="flex gap-2 ">
                                <div onClick={() => naviagate('/signup')}
                                     className="cursor-pointer border-r pr-2 border-r-slate-200">Đăng Ký</div>
                                <div onClick={() => naviagate('/login')}
                                     className="cursor-pointer">Đăng Nhập
                                </div>
                            </div>
                        </>
                    }
                    {
                        currentUser && <>
                            <div className="flex items-center gap-0.5  justify-start ">
                                <UserOutlined/>
                                <div className="cursor-pointer text-left overflow_css">{currentUser?.username}</div>
                            </div>
                        </>
                    }

                </div>
                <header>
                    <div className="header_container">
                        <div className="container items-center  flex flex-row ">

                            <div className="basis-2/12 h-full cursor-pointer"
                                 onClick={() => naviagate('/')}>
                                Logo ở đây
                            </div>

                            <div className="basis-7/12 grow-0 h-full">
                                <form className="">
                                    <label htmlFor="default-search"
                                           className="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search"
                                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-600 focus:border-orange-500 "
                                               placeholder="Tìm kiếm..." required/>
                                        <button type="submit"
                                                className="text-white absolute end-2.5 bottom-2 bg-orange-500 hover:bg-orange-600 focus:ring-1 hover:border-orange-500 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2">Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className=" flex relative justify-around items-center basis-3/12  px-6 ">
                                {
                                    currentUser && <>
                                        <div className="cursor-pointer absolute h-full change "
                                             onClick={() => naviagate('/productBid')}>
                                            <img className=" p-2 rounded-md hover:bg-orange-500"
                                                 src="https://storage.googleapis.com/auction_gr/1712158718386658d8d59ded725a37cb8924eauction.png"
                                                // src="../../src/assets/auction.png"
                                                 style={{width: "68%"}}
                                                 alt=""/>
                                        </div>


                                        <div onClick={() => handleNotify()} className=" h-full change "
                                             style={{position: 'relative', animation: 'fadein .4s'}}>
                                            <span className="cursor-pointer" onClick={() => setOpen(!open)}>
                                                <img className="p-2 rounded-md hover:bg-orange-500"
                                                     src="https://storage.googleapis.com/auction_gr/1712158719115658d8d59ded725a37cb8924enotification-bell.png"
                                                     style={{width: "68%"}}
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
                                                        open && <>
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


                                        <Dropdown
                                            menu={{
                                                items,
                                                style: {marginTop: '-6px', marginRight: 20}
                                            }}
                                            placement="bottomRight"
                                        >
                                            <div className="cursor-pointer h-full change ">
                                                <img className="p-2 pt-2 rounded-md hover:bg-orange-500"
                                                     src="https://storage.googleapis.com/auction_gr/1712158719115658d8d59ded725a37cb8924eburger-bar.png"
                                                     style={{width: "68%"}}
                                                     alt=""/>
                                            </div>
                                        </Dropdown>
                                    </>
                                }
                                {
                                    !currentUser && <>
                                        <div className="cursor-pointer h-full change "
                                             onClick={() => naviagate('/productBid')}>
                                            <img className=" p-2 rounded-md hover:bg-orange-500"
                                                 src="../../src/assets/auction.png" style={{width: "60%"}}
                                                 alt=""/>
                                        </div>

                                        <div className="cursor-pointer h-full change ">
                                            <img className="p-2 rounded-md hover:bg-orange-500"
                                                 src="../../src/assets/notification-bell.png" style={{width: "60%"}}
                                                 alt=""/>
                                        </div>
                                    </>
                                }

                                {/*<Avatar*/}
                                {/*    style={{width: '30%'}}*/}
                                {/*    className="cursor-pointer "*/}
                                {/*    src="https://docs.material-tailwind.com/img/face-2.jpg"*/}
                                {/*    size="large"*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>
                </header>
            </Header>
            <Content
                style={{
                    marginTop: '6.7rem',
                    padding: '0 36px',
                    backgroundColor: '#f5f5f5',
                    minHeight: '40rem'
                }}
                className="container"
            >

                <Layout
                    style={{
                        padding: '24px 0',
                    }}
                >
                    {/*<Sider*/}
                    {/*    style={{*/}
                    {/*        background: colorBgContainer,*/}
                    {/*    }}*/}
                    {/*    width={200}*/}
                    {/*>*/}
                    {/*    <div>Danh mục sản phẩm</div>*/}
                    {/*    <Menu*/}
                    {/*        mode="inline"*/}
                    {/*        defaultSelectedKeys={['1']}*/}
                    {/*        defaultOpenKeys={['sub1']}*/}
                    {/*        style={{*/}
                    {/*            height: '100%',*/}
                    {/*        }}*/}
                    {/*        items={items2}*/}
                    {/*    />*/}
                    {/*</Sider>*/}
                    <Content
                    >
                        {children}
                    </Content>
                    {
                        currentUser &&
                        <>
                            <div style={{ display: !openChat ? 'block' : 'none' }}>
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
                                            <div className="absolute border border-s-gray-100 rounded-2xl text-white text-xs h-4.5 overflow-hidden py-0.5 px-1.5 bg-orange-500 -right-1 box-border -top-2 cursor-pointer">
                                                99+
                                            </div>
                                        ) : unReadCount > 0 ? (
                                            <div className="absolute border border-s-gray-100 rounded-2xl text-white text-xs h-4.5 overflow-hidden py-0.5 px-1.5 bg-orange-500 -right-1 box-border -top-2 cursor-pointer">
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
    );
};
export default MainLayOut;

import {UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Dropdown, Layout} from 'antd';
import './layout.css'
import '../../index.css'
import {Input} from 'antd';
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import useProfile from "../../Pages/Profile/useProfile.jsx";
import {toast} from "react-toastify";
import useNotify from "./useNotify.jsx";
import {useQueryClient} from "@tanstack/react-query";
import { emphasizeTextAfterHash} from "../../Utils/constant.js";
import useLogout from "../../Hooks/useLogout.js";
import {useAuthContext} from "../../Pages/Context/AuthContext.jsx";
const {Search} = Input;
const {Header, Content, Footer, Sider} = Layout;


const MainLayOut = ({children}) => {
    const { currentUser, setCurrentUser } = useAuthContext();
    const {isLd, isSc,setStatus, total, notifications} = useNotify()
    const userId = useMemo(() => localStorage.getItem("id"), []);
    const queryClient = useQueryClient();

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8088/events');

        // có blog được tạo
        eventSource.addEventListener('newBlog', function (event) {
            const newBlogData = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        // yêu câầu request được phee duyệt
        eventSource.addEventListener(`approveProduct_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            console.log(data)
            if (data) {
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", userId],
                });
            }
        });

        // thoog báo đấu giá thành coonng cho người bán
        eventSource.addEventListener(`auctionSuccess_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            console.log(data)
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        // tb cho người thaắng đấu giá
        eventSource.addEventListener(`buySuccess_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });

        });

        //tb update status đơn hanngf
        eventSource.addEventListener(`updateStatus_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            console.log(data)
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        //notify khi người bán gửi request yêu cầu đấu giá
        eventSource.addEventListener(`sendRequest_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            if (data) {
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", userId],
                });
            }
        });

        //notify từ chối yêu cầu người dùng từ quản trị viên
        eventSource.addEventListener(`rejectProduct_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            if (data) {
                setStatus(0)
                queryClient.invalidateQueries({
                    queryKey: ["getCountNotify", userId],
                });
            }
        });

        //notify yêu cầu trả đơn hàng của ngưởi thắng đấu giá
        eventSource.addEventListener(`returnProductWinner_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            console.log(data)
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        //notify nhận được yêu cầu trả hàng của ng bán
        eventSource.addEventListener(`returnProductSeller_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        //notify thông báo được accept yc trả hàng cho ng bán
        eventSource.addEventListener(`acceptReturnSeller_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        //notify thông báo được duyệt yêu cầu trả hàng cho ng thắng
        eventSource.addEventListener(`acceptReturnWinner_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        //notify nhận được yêu cầu trả hàng của ng bán
        eventSource.addEventListener(`returnProductSeller_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        //notify thông báo từ chối yêu cầu trả hàng cho ng thắng
        eventSource.addEventListener(`denyReturnWinner_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        //notify thông báo sp bị từ chối trả lại
        eventSource.addEventListener(`denyReturnSeller_${userId}`, function (event) {
            const data = JSON.parse(event.data);
            setStatus(0)
            queryClient.invalidateQueries({
                queryKey: ["getCountNotify", userId],
            });
        });

        // này là nghe 1 s kiện riêng cho từng user , user nào thì nhét vào là được
        eventSource.addEventListener(`notification-${userId}`, function (event) {
            console.log(event)
            const newBlogData = JSON.parse(event.data);
            toast(`blog ten la vua ${newBlogData.title} duoc tao`)
        });

        return () => {
            eventSource.close();
        };
    }, []);
    const {userData, isSuccess, isLoading} = useProfile();
    const naviagate = useNavigate()
    const [open, setOpen] = useState(false)
    const {loading , logout} = useLogout()

    const handleNotify = async () => {
        if (open === false) {
            try {
                queryClient.invalidateQueries({
                    queryKey: ["getNotify", userId],
                });
            } catch (error) {
                console.log(error)
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
                                <div className="cursor-pointer border-r pr-2 border-r-slate-200">Đăng Ký</div>
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
                                <div className="cursor-pointer text-left overflow_css">{userData?.username}</div>
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
                            <div className="basis-8/12 grow-0 h-full">
                                <Search
                                    placeholder="Tìm kiếm"
                                    allowClear
                                    size="large"
                                    style={{
                                        width: "100%",
                                        height: '48px'
                                    }}
                                />
                            </div>
                            <div className=" flex relative justify-around items-center  px-6 ">
                                {
                                    currentUser && <>
                                        <div className="cursor-pointer h-full change "
                                             onClick={() => naviagate('/productBid')}>
                                            <img className=" p-2 rounded-md hover:bg-orange-500"
                                                 src ="https://storage.googleapis.com/auction_gr/1712158718386658d8d59ded725a37cb8924eauction.png"
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
                                                notifications  && <>
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
                                                style: {marginTop: '-6px',marginRight:20}
                                            }}
                                            placement="bottomRight"
                                        >
                                            <div className="cursor-pointer h-full change ">
                                                <img className="p-2 pt-2 rounded-md hover:bg-orange-500"
                                                     src="https://storage.googleapis.com/auction_gr/1712158719115658d8d59ded725a37cb8924eburger-bar.png" style={{width: "68%"}}
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

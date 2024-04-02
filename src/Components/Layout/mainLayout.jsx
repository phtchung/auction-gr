import {UserOutlined, PhoneOutlined } from '@ant-design/icons';
import {Breadcrumb, Dropdown, Layout} from 'antd';
import './layout.css'
import '../../index.css'
import { Input } from 'antd';
import {NavLink, useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import useProfile from "../../Pages/Profile/useProfile.jsx";
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;


const MainLayOut = ({children}) => {

    const accessToken = useMemo(() => localStorage.getItem("accessToken"), []);
    const {userData, isSuccess, isLoading} = useProfile();
    const naviagate = useNavigate()
    const [open , setOpen] = useState(false)

    const handleNotify = () => {
        console.log(open)
      setOpen(!open)
    }
    const handleNavi = (url) => {
        naviagate(`/${url}`)
        window.scrollTo(0,0)
    }
    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => handleNavi('user/profile')} >
                    Tài khoản cá nhân
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => handleNavi('reqOrderTracking')}   >
                    Đơn bán
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div  onClick={() => handleNavi('winOrderTracking')} >
                    Đơn mua
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div >
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
                   backgroundColor:'orange',
                    minHeight:'7rem',
                    zIndex:'100!important'
                }}
            >
                <div className="flex font-normal justify-between mx-10 items-center relative font_fml" style={{
                    maxWidth: 1280,
                    padding: '7px 70px',
                    top: 0,
                    height: '24px',
                    margin: '2px auto',
                    fontSize: '13px',
                    color:'white',
                    boxSizing: 'border-box',
                    lineHeight:'20px'

                }}>
                        <span>Vận chuyển nhanh chóng</span>
                        <div className="flex items-center   gap-1 ">
                            <PhoneOutlined/>
                            <span>Trung tâm Hỗ Trợ</span>
                        </div>
                        <div className="cursor-pointer hover:text-black" onClick={() => naviagate('/articles/news')}>Blog</div>
                    {
                        !accessToken && <>
                            <div className="flex gap-2 ">
                                <div className="cursor-pointer border-r pr-2 border-r-slate-200">Đăng Ký</div>
                                <div onClick={() => naviagate('/login')}
                                     className="cursor-pointer">Đăng Nhập
                                </div>
                            </div>
                        </>
                    }
                    {
                        accessToken && <>
                            <div className="flex items-center gap-0.5  justify-start ">
                                <UserOutlined />
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
                                            height:'48px'
                                        }}
                                    />
                                </div>
                            <div className="basis-2/12 flex relative justify-around items-center h-full px-6 ">
                                {
                                    accessToken && <>
                                        <div className="cursor-pointer h-full change "
                                             onClick={() => naviagate('/productBid')}>
                                            <img className=" p-2 rounded-md hover:bg-orange-500"
                                                 src="../../src/assets/auction.png" style={{width: "80%"}}
                                                 alt=""/>
                                        </div>


                                        <div  onClick={() => handleNotify()} className="cursor-pointer h-full change " style={{position: 'relative',animation:'fadein .4s'}}>
                                            <img className="p-2 rounded-md hover:bg-orange-500"
                                                 src="../../src/assets/notification-bell.png" style={{width: "80%"}}
                                                 alt=""/>
                                            <div className="counter">
                                                2
                                            </div>
                                            {
                                                open && <>
                                                    <div className="notifications ">
                                                        <header
                                                            className="p-4 h-14 text-base leading-6  text-left font-semibold"
                                                            style={{borderBottom: '1px solid #f3f0f2'}}>Thông báo
                                                        </header>
                                                        <div className="px-4 py-3 text-left hover:text-orange-500 leading-6"
                                                             style={{borderBottom: '1px solid #f4f5f5'}}>
                                                            <div className=" font-semibold  mb-1"> Title liuke bai bieet
                                                            </div>
                                                            <div className=" mb-2 leading-5">heello like bai viet
                                                                heello like bai viet heell o like bai viet
                                                            </div>
                                                            <div
                                                                className="text-xs hover:text-neutral-700 text-neutral-700 opacity-80">6/3/2012
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3 text-left hover:text-orange-500 leading-6"
                                                             style={{borderBottom: '1px solid #f4f5f5'}}>
                                                            <div className=" font-semibold  mb-1"> Title liuke bai bieet
                                                            </div>
                                                            <div className=" mb-2 leading-4">heello like bai viet
                                                                heello like bai viet
                                                            </div>
                                                            <div
                                                                className="text-xs hover:text-neutral-700 text-neutral-700 opacity-80">6/3/2012
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>


                                        <Dropdown
                                            overlayStyle={{marginTop: '-4px'}}
                                            menu={{
                                                items,
                                                style: {marginTop: -15}
                                            }}
                                            placement="bottomRight"
                                            arrow
                                        >
                                            <div className="cursor-pointer h-full change ">
                                                <img className="p-2 pt-2 rounded-md hover:bg-orange-500"
                                                     src="../../src/assets/burger-bar.png" style={{width: "80%"}}
                                                     alt=""/>
                                            </div>
                                        </Dropdown>
                                    </>
                                }
                                {
                                    !accessToken && <>
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
                {/*<Breadcrumb*/}
                {/*    style={{*/}
                {/*        margin: '16px 0',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
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

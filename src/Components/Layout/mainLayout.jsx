import { LaptopOutlined, NotificationOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import {Breadcrumb, Dropdown, Layout} from 'antd';
import './layout.css'
import '../../index.css'
import { Input } from 'antd';
import {NavLink, useNavigate} from "react-router-dom";
import {useMemo} from "react";
import useProfile from "../../Pages/Profile/useProfile.jsx";
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const items = [
    {
        key: '1',
        label: (
            <NavLink  to="/user/profile">
                Tài khoản cá nhân
            </NavLink>
        ),
    },
    {
        key: '2',
        label: (
            <NavLink   to="/reqOrderTracking">
                Đơn bán
            </NavLink>
        ),
    },
    {
        key: '3',
        label: (
            <NavLink    to="/winOrderTracking">
                Đơn mua
            </NavLink>
        ),
    },
    {
        key: '4',
        label: (
            <NavLink    to="/winOrderTracking">
               Đăng xuất
            </NavLink>
        ),
    },
];
const MainLayOut = ({children}) => {
    const accessToken = useMemo(() => localStorage.getItem("accessToken"), []);
    const {userData, isSuccess, isLoading} = useProfile();
    const naviagate = useNavigate()
    return (
        <Layout>
            <Header
                className="header"
                style={{
                    alignItems: 'center',
                   backgroundColor:'orange',
                    minHeight:'7rem',
                }}
            >
                <div className="flex font-normal justify-between mx-10 items-center relative" style={{
                    maxWidth: 1280,
                    padding: '7px 70px',
                    top: 0,
                    height: '24px',
                    margin: '2px auto',
                    fontSize: '14px',
                    color:'white',
                    boxSizing: 'border-box',
                    lineHeight:'20px'
                }}>
                        <span>Vận chuyển nhanh chóng</span>
                        <div className="flex items-center   gap-1 ">
                            <PhoneOutlined/>
                            <span>Trung tâm Hỗ Trợ</span>
                        </div>
                        <div>Blog</div>
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
                            <div className="basis-2/12 flex justify-around items-center h-full px-6 ">

                                {
                                    accessToken && <>
                                        <div className="cursor-pointer h-full change " onClick={() => naviagate('/productBid')}>
                                            <img className=" p-2 rounded-md hover:bg-orange-500"
                                                 src="../../src/assets/auction.png" style={{width: "80%"}}
                                                 alt=""/>
                                        </div>

                                        <div className="cursor-pointer h-full change ">
                                            <img className="p-2 rounded-md hover:bg-orange-500"
                                                 src="../../src/assets/notification-bell.png" style={{width: "80%"}}
                                                 alt=""/>
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
                    backgroundColor: '#f5f5f5'
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

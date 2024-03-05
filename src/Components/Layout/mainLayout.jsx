import { LaptopOutlined, NotificationOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './layout.css'
import '../../index.css'
import { Input, Avatar } from 'antd';
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
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
const MainLayOut = ({children}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout >
            <Header
                className="header"
                style={{
                    alignItems: 'center',
                   backgroundColor:'orange',
                    minHeight:'7rem',
                }}
            >
                <div className="flex font-sans font-normal justify-around items-center relative" style={{
                    maxWidth: 1280,
                    padding: '7px 20px',
                    top: 0,
                    height: '24px',
                    margin: '4px auto',
                    fontSize: '14px',
                    color:'white',
                    lineHeight:18

                }}>
                    <div >Vận chuyển nhanh chóng</div>
                    <div className="flex items-center  gap-1 ">
                        <PhoneOutlined/>
                        <span>Trung tâm hỗ trợ</span>
                    </div>
                    <div>Giá cả hợp lý</div>
                </div>
                <header>
                    <div className="header_container">
                        <div className="container items-center   flex flex-row ">

                                <div className="basis-2/12 h-full">
                                    hello
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
                                <div className="cursor-pointer h-full change ">
                                    <img className=" p-2 rounded-md hover:bg-orange-500"
                                         src="../../src/assets/auction.png" style={{width: "80%"}}
                                         alt=""/>
                                </div>

                                <div className="cursor-pointer h-full change ">
                                    <img className="p-2 rounded-md hover:bg-orange-500"
                                         src="../../src/assets/notification-bell.png" style={{width: "80%"}}
                                         alt=""/>
                                </div>

                                <Avatar
                                    style={{width:'30%'}}
                                    className="cursor-pointer "
                                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </header>

            </Header>
            <Content
                style={{
                    marginTop:'7rem',
                    padding:'0 36px',
                    minHeight:'100vh'
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

import "./sidebar.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Avatar} from "antd";
import useProfile from "../../Pages/Profile/useProfile.jsx";
import {getColorForLetter, getFirstLetter} from "../../Utils/constant.js";

const SideBar = () => {
    const navigate = useNavigate();
    const {userData, isSuccess, isLoading} = useProfile();
    const location = useLocation();
    const activeItem = location.pathname.split('/')[1]
    const handleItemClick = (itemName) => {
        navigate(itemName)
    };

    return (
        <>
            {userData && <>
                {/*<div className="flex-col w-52 py-4 text-base">*/}
                {/*    */}
                {/*</div>*/}
                <aside
                    className="flex flex-col w-[16.7rem]  px-2 py-3 ">
                    <div className="flex gap-0.5 justify-end items-center mb-3">
                        <Avatar
                            style={{
                                backgroundColor: getColorForLetter(getFirstLetter(userData?.name)),
                                verticalAlign: 'middle',
                            }}
                            size='large'
                        >
                            <span className="font-medium text-lg">{getFirstLetter(userData?.name)}</span>
                        </Avatar>

                        <div className="overflow_css font-medium text-base text-neutral-600">
                            <span>{userData?.username}</span>
                        </div>
                    </div>

                    <hr className=" border-gray-300 dark:border-gray-600"/>


                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <NavLink
                                onClick={() => handleItemClick('/user')}
                                style={{color: activeItem === 'user' ? '#F27C08' : ''}}
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                                to="/user/profile"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>

                                <span className="mx-4 text-base font-medium">Hồ sơ cá nhân</span>
                            </NavLink>

                            <NavLink
                                to="/create"
                                style={{color: activeItem === 'create' ? '#F27C08' : 'text-neutral-600'}}
                                onClick={() => handleItemClick('/reqHistory')}
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                </svg>
                                <span className="mx-4  text-base font-medium">Tạo yêu cầu</span>
                            </NavLink>

                            <NavLink
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                                to="/winOrderTracking"
                                onClick={() => handleItemClick('/winOrderTracking')}
                                style={{color: activeItem === 'winOrderTracking' ? '#F27C08' : ''}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/>
                                </svg>
                                <span className="mx-4  text-base font-medium">Đơn mua</span>
                            </NavLink>

                            <NavLink
                                style={{color: activeItem === 'reqOrderTracking' ? '#F27C08' : ''}}
                                onClick={() => handleItemClick('/reqOrderTracking')}
                                to="/reqOrderTracking"
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                                href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/>
                                </svg>

                                <span className="mx-4  text-base font-medium">Đơn bán</span>
                            </NavLink>

                            <NavLink
                                style={{color: activeItem === 'productBid' ? '#F27C08' : ''}}
                                onClick={() => handleItemClick('/productBid')}
                                to="/productBid"
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0
                                       .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095
                                        4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75
                                         12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                                </svg>

                                <span className="mx-4  text-base font-medium">Đang tham gia</span>
                            </NavLink>


                            <NavLink
                                to="/auctionHistory"
                                style={{color: activeItem === 'auctionHistory' ? '#F27C08' : ''}}
                                onClick={() => handleItemClick('/auctionHistory')}
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"/>
                                </svg>

                                <span className="mx-4  text-base font-medium">Lịch sử đấu giá</span>
                            </NavLink>


                            <NavLink
                                to="/saleHistory"
                                style={{color: activeItem === 'saleHistory' ? '#F27C08' : ''}}
                                onClick={() => handleItemClick('/saleHistory')}
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"/>
                                </svg>

                                <span className="mx-4  text-base font-medium">Lịch sử bán</span>
                            </NavLink>


                            <NavLink
                                to="/reqHistory"
                                style={{color: activeItem === 'reqHistory' ? '#F27C08' : 'text-neutral-600'}}
                                onClick={() => handleItemClick('/reqHistory')}
                                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-200 "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"/>
                                </svg>

                                <span className="mx-4  text-base font-medium">Lịch sử yêu cầu</span>
                            </NavLink>


                        </nav>
                    </div>
                </aside>
            </>}

        </>
    );
};

export default SideBar;

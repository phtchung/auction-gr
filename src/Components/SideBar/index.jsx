import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import "./sidebar.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Avatar} from "antd";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const activeItem = location.pathname.split('/')[1]
    const handleItemClick = (itemName) => {
        navigate(itemName)
    };


    return (
        <>
            <div className="flex-col w-52 py-4 text-base">
                <div className="flex gap-1 items-center mb-4">
                    <Avatar
                        className="cursor-pointer "
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                        size="medium"
                    />
                    <div className="overflow_css">
                        <strong>chung.pt194493</strong>
                    </div>
                </div>

                <div className="border-b border-gray-400"></div>

                <div className="mt-7 cursor-pointer flex-col font-normal text-left leading-snug text-sm">
                    <div className=" flex items-center  ">
                        <PersonIcon fontSize="medium"></PersonIcon>
                        <NavLink
                            to="/user/profile"
                            style={{ color: activeItem === 'user' ? 'red' : 'black' }}
                            className={`sidebar-item`}
                            onClick={() => handleItemClick('/user')}
                        >
                            Hồ Sơ Cá Nhân
                        </NavLink>
                    </div>

                    <div
                        className=" flex items-center"
                    >
                        <ListAltIcon fontSize="medium"></ListAltIcon>
                        <NavLink
                            to="/winOrderTracking"
                            style={{ color: activeItem === 'winOrderTracking' ? 'red' : 'black' }}
                            onClick={() => handleItemClick('/winOrderTracking')}
                            className="sidebar-item"
                        >
                            Đơn Mua
                        </NavLink>
                    </div>
                    <div
                        className=" flex items-center"
                    >
                        <ListAltIcon fontSize="medium"></ListAltIcon>
                        <NavLink
                            to="/reqOrderTracking"
                            style={{ color: activeItem === 'reqOrderTracking' ? 'red' : 'black' }}
                            onClick={() => handleItemClick('/reqOrderTracking')}
                            className="sidebar-item"
                        >Đơn Bán
                        </NavLink>
                    </div>
                    <div
                        className=" flex gap-0.5 items-center"
                    >
                        <img
                            src="../../src/assets/hammer_838391.png"
                            style={{maxWidth: "12%"}}
                            alt=""
                        />
                        <NavLink
                            to="/productBid"
                            style={{ color: activeItem === 'productBid' ? 'red' : 'black' }}
                            onClick={() => handleItemClick('/productBid')}
                            className="sidebar-item"
                        >
                            Đang tham gia
                        </NavLink>
                    </div>
                    <div
                        className=" flex gap-0.5 items-center"
                    >
                        <img
                            src="../../src/assets/law.png"
                            style={{maxWidth: "12%"}}
                            alt=""
                        />
                        <NavLink
                            to="/auctionHistory"
                            style={{ color: activeItem === 'auctionHistory' ? 'red' : 'black' }}
                            onClick={() => handleItemClick('/auctionHistory')}
                            className="sidebar-item"
                        >
                            Lịch sử đấu giá
                        </NavLink>
                    </div>
                    <div
                        className=" flex gap-0.5 items-center"
                        onClick={() => {
                            navigate("/saleHistory");
                        }}
                    >
                        <img
                            src="../../src/assets/time-management.png"
                            style={{maxWidth: "12%"}}
                            alt=""
                        />
                        <NavLink
                            to="/saleHistory"
                            style={{ color: activeItem === 'saleHistory' ? 'red' : 'black' }}
                            onClick={() => handleItemClick('/saleHistory')}
                            className="sidebar-item"
                        >
                            Lịch sử bán
                        </NavLink>
                    </div>
                    <div
                        className=" flex gap-0.5 items-center"
                    >
                        <img
                            src="../../src/assets/request-for-proposal.png"
                            style={{maxWidth: "12%"}}
                            alt=""
                        />
                        <NavLink
                            to="/reqHistory"
                            style={{ color: activeItem === 'reqHistory' ? 'red' : 'black' }}
                            onClick={() => handleItemClick('/reqHistory')}
                            className="sidebar-item"
                        >
                            Lịch sử yêu cầu
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;

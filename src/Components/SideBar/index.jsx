import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import './sidebar.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const SideBar = () => {

    const navigate = useNavigate()
    const [selectedItem, setSelectedItem] = useState(null);

    const selectItem = (item,nav) => {
        // setSelectedItem(item);
        navigate(nav)
    };
    return (
        <>
            <div className="flex-col w-52 py-4 text-base">
                <div className="mb-4">
                    <strong>chung.pt194493</strong>
                </div>
                <div className="border-b border-gray-400"></div>

                <div className="mt-7 cursor-pointer flex-col font-normal text-left leading-snug text-sm">
                    <div className=" flex gap-3 items-center  ">
                        <PersonIcon fontSize="medium"></PersonIcon>
                        <div className={`sidebar-item ${selectedItem === 1 ? 'selected' : ''}`}
                             onClick={() => selectItem(1, '/')}>
                            Hồ Sơ Cá Nhân
                        </div>
                    </div>

                    <div className=" flex gap-3 items-center" onClick={() => {
                        navigate('/winOrderTracking')
                    }}>
                        <ListAltIcon fontSize="medium"></ListAltIcon>
                        <div className="hover:text-orange-400 sidebar-item">
                            Đơn Mua
                        </div>
                    </div>
                    <div className=" flex gap-3 items-center" onClick={() => {
                        navigate('/reqOrderTracking')
                    }}>
                        <ListAltIcon fontSize="medium"></ListAltIcon>
                        <div className="hover:text-orange-400 sidebar-item">
                            Đơn Bán
                        </div>
                    </div>
                    <div className=" flex gap-3 items-center" onClick={() => {
                        navigate('/productBid')
                    }}>
                        <img src="src/assets/hammer_838391.png" style={{maxWidth: '12%'}} alt=""/>
                        <div className="hover:text-orange-400 sidebar-item">
                            Đang tham gia
                        </div>
                    </div>
                    <div className=" flex gap-3 items-center" onClick={() => {
                        navigate('/auctionHistory')
                    }}>
                        <img src="src/assets/law.png" style={{maxWidth: '12%'}} alt=""/>
                        <div className="hover:text-orange-400 sidebar-item">
                            Lịch sử đấu giá
                        </div>
                    </div>
                    <div className=" flex gap-3 items-center" onClick={() => {
                        navigate('/saleHistory')
                    }}>
                        <img src="src/assets/time-management.png" style={{maxWidth: '12%'}} alt=""/>
                        <div className="hover:text-orange-400 sidebar-item">
                            Lịch sử bán
                        </div>
                    </div>
                    <div className=" flex gap-3 items-center" onClick={() => {
                        navigate('/reqHistory')
                    }}>
                        <img src="src/assets/request-for-proposal.png" style={{maxWidth: '12%'}} alt=""/>
                        <div className="hover:text-orange-400 sidebar-item">Lịch sử yêu cầu
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default SideBar;

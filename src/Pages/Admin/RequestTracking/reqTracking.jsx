import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {adminProcessStatus, tabDataAdmin} from "../../../Utils/constant.js";
import Header from "../../../Components/Header/header.jsx";
import SideBar from "../../../Components/SideBar/index.jsx";
import CountdownTimer from "../../../Components/Clock/countDownTime.jsx";
import TabItem from "../../../Components/TabItem/TabItem.jsx";
import {CircularProgress} from "@mui/material";

import {
    MaterialReactTable,
} from 'material-react-table';
import useAdminRequestTracking from "./useReqTracking.jsx";

const RequestTracking = () => {
    const navigate = useNavigate();

    const {
        isLoading,
        isSuccess,
        data,
        isScCount,
        adminReqCount,
        columns,
        status,
        setStatus,
    } = useAdminRequestTracking();


    const [selectedTab, setSelectedTab] = useState(status);
    const handelClick = (value) => {
        setStatus(adminProcessStatus(value));
        setSelectedTab(value);
        navigate(`/admin/reqTracking?status=${value}`);
    };
    return (
        <>
            <Header/>
            <div className="wrapper">
                <SideBar></SideBar>
                <div className="home-right ">
                    <div className="flex justify-between items-center px-5 pt-3 pb-3   text-neutral-600  bg-white">
                        <div className="text-left text-xl font-bold ">
                            Quản Lý Yêu Cầu Đấu Giá Sản Phẩm
                        </div>
                        <div className="  ">
                            <CountdownTimer initialTimeInSeconds={20}/>
                        </div>
                    </div>
                    <div className="border-b border-neutral-300 "></div>
                    <div className="flex items-center font-normal justify-center pt-10 flex-wrap  ">
                        {isSuccess && isScCount && (
                            <div className="flex justify-end">
                                <>
                                    <TabItem
                                        data={tabDataAdmin[0]}
                                        count={adminReqCount?.countNewReq}
                                        onClick={() => handelClick(1)}
                                        isSelected={selectedTab === 1}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataAdmin[1]}
                                        count={adminReqCount?.countApproved}
                                        onClick={() => handelClick(2)}
                                        isSelected={selectedTab === 2}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataAdmin[2]}
                                        count={adminReqCount?.countBidding}
                                        onClick={() => handelClick(3)}
                                        isSelected={selectedTab === 3}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataAdmin[3]}
                                        count={adminReqCount?.countReject}
                                        onClick={() => handelClick(13)}
                                        isSelected={selectedTab === 13}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataAdmin[4]}
                                        count={adminReqCount?.countCancel}
                                        onClick={() => handelClick(11)}
                                        isSelected={selectedTab === 11}
                                    ></TabItem>
                                </>
                            </div>
                        )}
                    </div>
                    {isLoading && (
                        <>
                            <CircularProgress color="inherit" className="mt-20"/>{" "}
                        </>
                    )}

                    {isSuccess && (
                        <>
                            <div className="border border-gray-300 mt-6">
                                <div className="flex items-center justify-between  bg-white  p-2 text-base">
                                    <div className="text-left font-medium my-2 ml-3 ">
                                        Danh sách yêu cầu đấu giá sản phẩm
                                    </div>
                                </div>

                                <div className="border-b-2 border-gray-300 "></div>
                                <MaterialReactTable
                                    columns={columns}
                                    data={(data)}
                                    isloading={isLoading}
                                    enableDensityToggle={false}
                                    enableColumnFilters={false}
                                    enableHiding = {false}
                                    showColumnFilters={true}
                                    enableColumnActions={false}

                                    muiTableHeadCellProps={({ column }) => ({
                                        sx: {
                                            textAlign:'right',
                                            fontSize: '14px',
                                        },
                                    })}
                                    muiTableBodyCellProps={({ row }) => ({
                                        sx: {
                                            textAlign:'center',
                                            textOverflow:'ellipsis',
                                            overflow:'hidden !important',
                                            whiteSpace:'nowrap',
                                            fontSize: '14px',
                                            cursor:'pointer'
                                        },
                                    })}
                                    muiTableBodyRowProps={({ row }) => ({
                                        onClick: (event) => {
                                            console.log( row.original.request_id);
                                        },
                                    })}

                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default RequestTracking

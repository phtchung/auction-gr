import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
    adminChangeStateToString,
     adminProductStatus,
    tabDataBiddingAdmin
} from "../../../Utils/constant.js";
import Header from "../../../Components/Header/header.jsx";
import SideBar from "../../../Components/SideBar/index.jsx";
import CountdownTimer from "../../../Components/Clock/countDownTime.jsx";
import TabItem from "../../../Components/TabItem/TabItem.jsx";
import {CircularProgress} from "@mui/material";

import {
    MaterialReactTable,
} from 'material-react-table';
import {Button} from "@material-tailwind/react";
import useAdminBiddingTracking from "./useAdminBiddingTracking.jsx";


const AdminBiddingTracking = () => {
    const navigate = useNavigate();

    const {
        isLoading,
        isSuccess,
        data,
        isScCount,
        adminBidCount,
        columns,
        status,
        setStatus,
    } = useAdminBiddingTracking();


    const [selectedTab, setSelectedTab] = useState('N');
    const handelClick = (value) => {
        setStatus(adminProductStatus(value));
        setSelectedTab(value);
        navigate(`/admin/adminBidTracking?status=${value}`);
    };
    return (
        <>
            <Header/>
            <div className="wrapper">
                <SideBar></SideBar>
                <div className="home-right ">
                    <div className="flex justify-between items-center px-5 pt-3 pb-3   text-neutral-600  bg-white">
                        <div className="text-left text-xl font-bold ">
                            Quản lý sản phẩm đấu giá hệ thống
                        </div>
                        <div className="  ">
                            <CountdownTimer initialTimeInSeconds={20}/>
                        </div>
                    </div>
                    <div className="border-b border-neutral-300 "></div>
                    <div className="flex items-center font-normal justify-center pt-10 flex-wrap  ">
                        {isSuccess && isScCount && (
                            <div className="flex justify-center flex-wrap">
                                <>
                                    <TabItem
                                        data={tabDataBiddingAdmin[0]}
                                        count={adminBidCount?.countNewProduct}
                                        onClick={() => handelClick('N')}
                                        isSelected={selectedTab === 'N'}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[9]}
                                        count={adminBidCount?.countNewProductMinus}
                                        onClick={() => handelClick('-N')}
                                        isSelected={selectedTab === '-N'}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[1]}
                                        count={adminBidCount?.countProductBid}
                                        onClick={() => handelClick('B')}
                                        isSelected={selectedTab === 'B'}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[2]}
                                        count={adminBidCount?.countProductSuccess}
                                        onClick={() => handelClick('S')}
                                        isSelected={selectedTab === 'S'}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[3]}
                                        count={adminBidCount?.countProductConfirm}
                                        onClick={() => handelClick('C')}
                                        isSelected={selectedTab === 'C'}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[4]}
                                        count={adminBidCount?.countProductDelivery}
                                        onClick={() => handelClick('D')}
                                        isSelected={selectedTab === 'D'}
                                    ></TabItem>

                                    <TabItem
                                    data={tabDataBiddingAdmin[5]}
                                    count={adminBidCount?.countProductCompleted}
                                    onClick={() => handelClick('E')}
                                    isSelected={selectedTab === 'E'}
                                ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[6]}
                                        count={adminBidCount?.countProductCancel}
                                        onClick={() => handelClick('R')}
                                        isSelected={selectedTab === 'R'}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[7]}
                                        count={adminBidCount?.countProductReturn}
                                        onClick={() => handelClick('G')}
                                        isSelected={selectedTab === 'G'}
                                    ></TabItem>
                                    <TabItem
                                        data={tabDataBiddingAdmin[8]}
                                        count={adminBidCount?.countProductFailure}
                                        onClick={() => handelClick('F')}
                                        isSelected={selectedTab === 'F'}
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

                    <div className="flex m-6 gap-5 justify-end mr-10">

                        <Button
                            onClick={() => navigate('/admin/createProductAuction')}
                            className="p-2 px-6 py-2 right-0 bg-yellow-400 rounded text-black border-gray-400 border-none text-sm  font-semibold focus:outline-0">
                            Đấu giá sản phẩm
                        </Button>
                    </div>

                    {isSuccess && (
                        <>
                            <div className="border border-gray-300 mt-6">
                                <div className="flex items-center justify-between  bg-white  p-2 text-base">
                                    <div className="text-left font-medium my-2 ml-3 ">
                                        Danh sách yêu cầu {adminChangeStateToString(status)}
                                    </div>
                                </div>

                                <div className="border-b-2 border-gray-300 "></div>
                                <MaterialReactTable

                                    columns={columns}
                                    data={(data)}
                                    isloading={isLoading}
                                    enableDensityToggle={false}
                                    enableColumnFilters={false}
                                    enableHiding={false}
                                    showColumnFilters={true}
                                    enableColumnActions={false}
                                    muiTablePaperProps={{
                                        sx: {
                                            margin:0,
                                            padding:0,
                                            maxWidth:'1065px'
                                        },
                                    }}
                                    muiTableHeadCellProps={({column}) => ({
                                        sx: {
                                            textAlign: 'right',
                                            fontSize: '14px',
                                        },
                                    })}

                                    muiTableBodyCellProps={({row}) => ({
                                        sx: {
                                            textAlign: 'center',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden !important',
                                            whiteSpace: 'nowrap',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            paddingX:'12px'
                                        },
                                    })}
                                    muiTableBodyRowProps={({row}) => ({
                                        onClick: () => {
                                            console.log(row.original);
                                            navigate(
                                                `/admin/reqTracking/requestDetail/${row.original.request_id}?status=${row.original.status}`,
                                            )
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
export default AdminBiddingTracking

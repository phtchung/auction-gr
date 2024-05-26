import SideBar from "../../Components/SideBar/index.jsx";
import "./home.css";
import { numberToString, pending,reqConvertStatus, tabData,} from "../../Utils/constant.js";
import { useState} from "react";
import TabItem from "../../Components/TabItem/TabItem.jsx";
import TableData from "../../Components/TableData/TableData.jsx";
import {useNavigate} from "react-router-dom";
import useReqOrderTracking from "./useReqOrderTracking.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import CountdownTimer from "../../Components/Clock/countDownTime.jsx";

const ReqOrderTracking = () => {
    const {
        isLdCount,
        isScCount,
        reqCount,
        isLoading,
        colData,
        isSuccess,
        reqTrackingData,
        status,
        setStatus,
    } = useReqOrderTracking();

    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(status);

    const handelClick = (value) => {
        setStatus(reqConvertStatus(value));
        setSelectedTab(value);
        navigate(`/reqOrderTracking?status=${value}`);
    };

    return (
        <>
            {/*<Spin spinning={loading} tip="Đang gửi yêu cầu" >*/}
            <MainLayOut>
                <div className="wrapper">
                    <SideBar></SideBar>
                    <div className="home-right ">
                        <div className="flex justify-between items-center px-5 pt-3 pb-3   text-neutral-600  bg-white">
                            <div className="text-left text-xl font-bold ">
                                Quản Lý Đơn Bán
                            </div>
                            <div className="  ">
                                <CountdownTimer initialTimeInSeconds={20}/>
                            </div>
                        </div>
                        <div className="border-b border-neutral-300 "></div>

                        <div className="flex items-center font-normal justify-center pt-10 flex-wrap  "></div>
                        {isScCount && (
                            <div className="flex justify-around flex-wrap">
                                <>
                                    <TabItem
                                        data={pending}
                                        count={reqCount.count_penR}
                                        onClick={() => handelClick(1)}
                                        isSelected={selectedTab === 1}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[0]}
                                        count={reqCount.count_appR}
                                        onClick={() => handelClick(2)}
                                        isSelected={selectedTab === 2}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[1]}
                                        count={reqCount.count_bidR}
                                        onClick={() => handelClick(3)}
                                        isSelected={selectedTab === 3}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[2]}
                                        count={reqCount.count_sucR}
                                        onClick={() => handelClick(5)}
                                        isSelected={selectedTab === 5}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[4]}
                                        count={reqCount.count_cfR}
                                        onClick={() => handelClick(6)}
                                        isSelected={selectedTab === 6}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[5]}
                                        count={reqCount.count_dlvR}
                                        onClick={() => handelClick(7)}
                                        isSelected={selectedTab === 7}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[6]}
                                        count={reqCount.count_cplR}
                                        onClick={() => handelClick(8)}
                                        isSelected={selectedTab === 8}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[3]}
                                        count={reqCount.count_failR}
                                        onClick={() => handelClick(10)}
                                        isSelected={selectedTab === 10}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[7]}
                                        count={reqCount.count_retR}
                                        onClick={() => handelClick(9)}
                                        isSelected={selectedTab === 9}
                                    ></TabItem>
                                    <TabItem
                                        data={tabData[8]}
                                        count={reqCount.count_rejR}
                                        onClick={() => handelClick(13)}
                                        isSelected={selectedTab === 13}
                                    ></TabItem>
                                </>
                            </div>
                        )}

                        {isSuccess && (
                            <>
                                <div className="border border-gray-300 mt-6">
                                    <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                                        <div className="text-left font-medium my-2 ml-3 ">
                                            List - {numberToString(status)}
                                        </div>
                                    </div>

                                    <div className="border-b-2 border-gray-300 "></div>
                                    <TableData cols={colData} rows={reqTrackingData}></TableData>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};

export default ReqOrderTracking;

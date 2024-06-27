import SideBar from "../../Components/SideBar/index.jsx";
import RequestInfo from "../../Components/Information/RequestInfo.jsx";
import BiddingInfo from "../../Components/Information/BiddingInfo.jsx";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup.jsx";
import useReqHistoryDetail from "./useReqHistoryDetail.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined.js";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import {useNavigate} from "react-router-dom";
import {numberToString} from "../../Utils/constant.js";
import {Tabs} from "antd";
import DeliveryInfor from "../../Components/Information/DeliveryInfo.jsx";
import ReturnInfo from "../../Components/Information/ReturnInfo.jsx";
import ReviewInfo from "../../Components/Information/ReviewInfo.jsx";
import RejectInfo from "../../Components/Information/RejectInfo.jsx";
import PendingInfo from "../../Components/Information/PendingInfo.jsx";
const TabPane = Tabs.TabPane

const ReqHistoryDetail = () => {
    const {reqData, isLoading, isSuccess,isError} = useReqHistoryDetail();

    const navigate = useNavigate();
    const stateStr = numberToString(reqData?.status);
    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <SideBar/>
                    <div className="home-right bg-white">
                        {
                            isLoading ?
                                <CustomSpinner h={12} w={12} font={'sm'}/>
                                :
                                isError ?
                                    <FZFNotFound margin={'-mt-20'} btnText={'Trở về'} error={'Rất tiếc, không tìm thấy thông tin của yêu cầu này.'} urlReturn={'/reqHistory'} />
                                    :
                                    isSuccess &&
                                    <>
                                        <div className="flex m-4 gap-4 items-center px-2 justify-between">
                                            <div
                                                className="flex items-center font-medium text-neutral-600 gap-1 cursor-pointer"
                                                onClick={() => navigate(-1)}
                                            >
                                                <ArrowBackIosOutlinedIcon
                                                    sx={{fontSize: 16}}
                                                    color="rgb(212,212,212)"
                                                ></ArrowBackIosOutlinedIcon>
                                                <div className="text-base "> Trở lại</div>
                                            </div>

                                            <div className="flex items-center gap-2 font-medium text-neutral-600">
                                                <div className="text-left text-base ">Danh sách - {stateStr} </div>
                                                <ArrowForwardIosOutlinedIcon
                                                    sx={{fontSize: 16}}
                                                    fontSize="small"
                                                    color="gray"
                                                ></ArrowForwardIosOutlinedIcon>
                                                <div className="text-base">Chi tiết</div>
                                            </div>
                                        </div>

                                        <div className="border-b border-gray-400  mx-5"></div>
                                        <div
                                            className="flex justify-between absolute right-32  m-2.5 items-center px-2">
                                            <div className="text-base  font-medium  text-white bg-orange-400 p-1 px-4">
                                                {stateStr}
                                            </div>
                                        </div>
                                        <div>
                                            <Tabs defaultActiveKey="1" className="px-8">
                                                <TabPane tab="Thông tin sản phẩm" key="1">
                                                    <RequestInfo data={reqData}/>
                                                </TabPane>

                                                {(reqData.status === 1 ) && (
                                                    <TabPane tab="Thông tin đấu giá" key="2">
                                                        <PendingInfo data={reqData}/>
                                                    </TabPane>
                                                )}

                                                {(reqData.status !== undefined && reqData.status !== 1 && reqData.status !== 13) ? (
                                                    <TabPane tab="Thông tin đấu giá" key="2">
                                                        <BiddingInfo data={reqData}/>
                                                    </TabPane>
                                                ) : (
                                                    <></>
                                                )}
                                                {(reqData.status === 7 || reqData.status === 5 || reqData.status === 6 || reqData.status === 8 || reqData.status === 9 || reqData.status === 14 || reqData.status === 15) && (
                                                    <TabPane tab="Thông tin giao hàng" key="3">
                                                        <DeliveryInfor data={reqData}/>
                                                    </TabPane>
                                                )}

                                                {(reqData.status === 9 || reqData.status === 14 || reqData.status === 15) && (
                                                    <TabPane tab="Thông tin trả hàng" key="4">
                                                        <ReturnInfo data={reqData}/>
                                                    </TabPane>
                                                )}

                                                {(reqData.status === 8 || reqData.is_review === 1) && (
                                                    <TabPane tab="Thông tin đánh giá" key="5">
                                                        <ReviewInfo data={reqData}/>
                                                    </TabPane>
                                                )}

                                                {reqData.status === 13 && (
                                                    <TabPane tab="Thông tin từ chối yêu cầu" key="6">
                                                        <RejectInfo data={reqData}/>
                                                    </TabPane>
                                                )}
                                            </Tabs>
                                        </div>
                                    </>
                        }
                    </div>
                </div>
            </MainLayOut>

        </>
    );
};
export default ReqHistoryDetail;

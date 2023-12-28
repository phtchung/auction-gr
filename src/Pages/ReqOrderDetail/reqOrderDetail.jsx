import SideBar from "../../Components/SideBar/index.jsx";
import RequestInfo from "../../Components/ReqInformation/RequestInfo.jsx";
import BiddingInfo from "../../Components/BidInformation/BiddingInfo.jsx";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup.jsx";
import {useLocation} from "react-router-dom";
import Header from "../../Components/Header/header.jsx";

const ReqOrderDetail = () => {

    const location = useLocation();
    const state = parseInt(new URLSearchParams(location.search).get('state'));

    return (
        <>  <Header/>
            <div className="wrapper">
                <SideBar/>
                <div className="home-right bg-white">
                    <RequestInfo state={state}/>
                    {state !== undefined && state !== 1 ? <BiddingInfo state={state}/> : <></>}
                    {state !== undefined && [5, 6].includes(state) ? <UpdatePopup state={state}/> : <></>}
                    {state === 11 &&
                        <>
                            <div className="flex justify-between m-2.5 items-center px-2">
                                <div className="text-left text-base font-medium ">Lí do hủy</div>
                            </div>
                            <div className="items-center gap-6 font-medium my-8 mx-8 px-1 text-xs space-y-6 ">

                                <div className="grid grid-cols-6 text-left">
                                    <div> Tác nhân :</div>
                                    <div className="font-normal  col-span-2"> Quản trị viên</div>
                                </div>

                                <div className="grid grid-cols-6 text-left">
                                    <div> Lí do :</div>
                                    <div className="font-normal  col-span-2">Không phù hơp, chưa vượt qua kiểm duyệt
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    )
};
export default ReqOrderDetail;

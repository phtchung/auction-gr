import SideBar from "../../Components/SideBar/index.jsx";
import {useLocation} from "react-router-dom";


const WinOrderDetail = () => {

    const location = useLocation();
    const state = parseInt(new URLSearchParams(location.search).get('state'));
    const stateStr = state === 4 ?
        'Done' : [5,6,7].includes(state) ?
            'Delivery Wait' : state == 8 ?
                'Completed' : state === 9 ?
                    'Cancel' : null

    return (
        <>
            <div className="wrapper">
                <SideBar/>
                <div className="home-right bg-white">
                    <div className="flex justify-between m-4 items-center px-2">
                        <div className="text-left text-base font-medium"> List - {stateStr} - Detail</div>
                    </div>
                    <div className="border-b border-gray-400  mx-5"></div>
                    <div className="flex justify-between m-2.5 items-center px-2">
                        <div className="text-left text-sm font-medium ">Product Information</div>
                        <div className="text-base font-medium mr-10 bg-amber-300 p-1 px-4"> {stateStr}</div>
                    </div>

                    <div className="items-center font-medium text-xs gap-6 my-8 mx-8 px-1 space-y-6 ">

                        <div className="grid grid-cols-6 text-left">
                            <div> Người bán :</div>
                            <div className="font-normal col-span-2"> Hoa</div>
                            <div> Số điện thoại :</div>
                            <div className="font-normal col-span-2"> 0918286381</div>
                        </div>

                        <div className="grid grid-cols-6 text-left">
                            <div> Product Name :</div>
                            <div className="font-normal  col-span-5"> Đồng hồ Rolex A532 2022</div>
                        </div>
                        <div className="grid grid-cols-6 text-left">
                            <div> Category :</div>
                            <div className="font-normal col-span-2"> Đồng hồ</div>
                            <div> Rank :</div>
                            <div className="font-normal col-span-2"> S</div>
                        </div>

                        <div className="grid grid-cols-6 text-left">
                            <div> Giá khởi điểm :</div>
                            <div className="font-normal col-span-2"> 290.000 VND</div>
                            <div> Giá trúng thầu :</div>
                            <div className="font-normal col-span-2"> 4.000.000 VND</div>
                        </div>
                        <div className="grid grid-cols-6 text-left font-medium">
                            <div> Phí ship :</div>
                            <div className="font-normal col-span-2"> 30.000 VND</div>
                            <div> Tổng tiền :</div>
                            <div className="font-normal col-span-2"><strong>4.030.000 VND</strong></div>
                        </div>

                        <div className="grid grid-cols-6 text-left">
                            <div> Thời gian thắng :</div>
                            <div className="font-normal  col-span-2"> 2023-09-09 15:03:21</div>
                            <di> Hạn hoàn thành thủ tục :</di>
                            <div className=" col-span-2 font-bold"> 2023-09-09 15:03:21</div>
                        </div>

                    </div>

                    {state && state !== 4 &&
                        <>
                            <div className="flex justify-between m-2.5 items-center px-2">
                                <div className="text-left text-base font-medium ">Delivery Information</div>
                            </div>
                            <div className="items-center font-medium text-xs gap-6 my-8 mx-8 px-1 space-y-6 ">
                                <div className="grid grid-cols-6 text-left">
                                    <div> Người trúng thầu :</div>
                                    <div className="font-normal col-span-2"> Phạm Huy Hùng</div>
                                    <div> Phone Number :</div>
                                    <div className="font-normal col-span-2"> 0971751699</div>
                                </div>
                                <div className="grid grid-cols-6 text-left">
                                    <div> Địa chỉ :</div>
                                    <div className="font-normal col-span-5"> 67a ngõ 128c Đại La, Hai Bà Trưng, Hà Nội
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 text-left">
                                    <div> Ghi chú :</div>
                                    <div className="font-normal col-span-5"> 67a ngõ 128c Đại La, Hai Bà Trưng, Hà Nội
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 text-left">
                                    <div> Trạng thái đơn hiện tại :</div>
                                    <div className="font-normal col-span-2 text-amber-400"> Đã xác nhận bởi người bán
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
export default WinOrderDetail;

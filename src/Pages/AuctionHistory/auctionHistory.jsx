import SideBar from "../../Components/SideBar/index.jsx";
import {useState} from "react";
import AuctionHistoryCpn from "../../Components/AuctionHistoryCpn/auctionHistoryCpn.jsx";
import useAuctionHistory from "./useAuctionHistory.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";

const AuctionHistory = () => {
    const [search, setSearch] = useState("");
    const {aucHistoryData, isLoading, isSuccess,isError} = useAuctionHistory();
    const onChange = ({target}) => setSearch(target.value);
    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <SideBar/>
                    <div className="home-right ">
                        <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
                            Lịch sử đấu giá
                        </div>
                        <div className="border-b border-neutral-300 "></div>
                        <div className=" flex h-10 flex-row justify-between ">
                            <input
                                type="text"
                                style={{backgroundColor: "#eaeaea"}}
                                value={search}
                                onChange={onChange}
                                placeholder="Bạn có thể tìm kiếm theo tên hoặc mã sản phẩm"
                                className=" pl-5 w-full outline-none"
                            />
                            <button
                                className={`w-[7rem]  text-white border-none text-sm font-semibold focus:outline-0  rounded ${
                                    search ? "bg-orange-500" : "bg-gray-300"
                                }`}
                            >
                                Tìm kiếm
                            </button>
                        </div>

                        {isLoading ?
                            <>
                                <CustomSpinner h={12} w={12} font={'sm'}/>
                            </>
                            :
                            isError ?
                                <FZFNotFound error={'Rất tiếc, đã có lỗi xảy ra.'}
                                             urlReturn={'/'} btnText={'Về trang chủ'}/>
                                :
                                isSuccess &&
                                <>
                                    <div className="flex flex-col gap-3">
                                        {
                                            aucHistoryData.map((data) => (
                                                <AuctionHistoryCpn key={data.id} data={data}/>
                                            ))
                                        }
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};

export default AuctionHistory;

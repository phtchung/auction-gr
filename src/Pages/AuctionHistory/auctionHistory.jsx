import SideBar from "../../Components/SideBar/index.jsx";
import {useEffect, useState} from "react";
import AuctionHistoryCpn from "../../Components/AuctionHistoryCpn/auctionHistoryCpn.jsx";
import useAuctionHistory from "./useAuctionHistory.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import ProductBiddingCpn from "../../Components/ProductBiddingCpn/productBiddingCpn.jsx";
import {useInView} from "react-intersection-observer";

const AuctionHistory = () => {
    const [keyword, setKeyword] = useState('')

    const {isLoading,
        isSuccess,
        data,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        queryString,
        setQueryString
    } = useAuctionHistory();
    const onChange = ({target}) => {
        setKeyword(target.value)
    }
    const handleSearch = () => {
        setQueryString({...queryString, keyword: keyword})
    }
    const {ref, inView} = useInView();

    useEffect(() => {
        console.log(inView)
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);
    console.log(data)
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
                                value={keyword}
                                onChange={onChange}
                                placeholder="Bạn có thể tìm kiếm theo tên sản phẩm"
                                className=" pl-5 w-full outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className={`w-[7rem]  text-white border-none text-sm font-semibold focus:outline-0  rounded ${
                                    keyword ? "bg-orange-500" : "bg-gray-300"
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
                                <FZFNotFound margin={'-mt-40'} error={'Rất tiếc, đã có lỗi xảy ra.'}
                                             urlReturn={'/'} btnText={'Về trang chủ'}/>
                                :
                                isSuccess &&
                                <>
                                    {data.pages.map((page) => (
                                        <>
                                            {
                                                page.data.data.length !== 0 ?
                                                    <>
                                                        <div className="flex flex-col gap-3">
                                                            {page.data.data.map((item) => (
                                                                <>
                                                                    <AuctionHistoryCpn key={item._id} data={item}/>
                                                                </>
                                                            ))}
                                                        </div>

                                                        <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex flex-col mb-7 mt-5 items-center">
                                                            <img
                                                                style={{width: '30%'}}
                                                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png"
                                                                alt=""/>
                                                            <div className="text-gray-500 -mt-7 font-medium text-base">Không có sản phẩm nào.
                                                            </div>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                    ))}
                                </>
                        }
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};

export default AuctionHistory;

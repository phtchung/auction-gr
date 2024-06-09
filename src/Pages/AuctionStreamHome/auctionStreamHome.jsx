import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Select} from "antd";
import {Pagination} from "@mui/material";
import useCategories from "../Home/useCategories.jsx";
import {useState} from "react";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import useAuctionStreamHome from "./useAuctionStreamHome.jsx";
import CardAuctionStream from "../../Components/Card/cardAuctionStream.jsx";
import {useLocation} from "react-router-dom";

const AuctionStreamHome = () => {
    const {isSuccess , isLoading,data , setType , type, setQueryString, queryString , totalPage,currentPage,handlePageChange } = useAuctionStreamHome()
    const {categories  , isSuccess : sc , isLoading : ld} = useCategories()
    const [activeTab, setActiveTab] = useState(type);
    const query = new URLSearchParams(useLocation().search);
    const initialKeyword = query.get('keyword') || '';
    const [keyword, setKeyword] = useState(initialKeyword);

    const handleTabClick = (tab) => {
        setType(tab);
        setActiveTab(tab);
        setQueryString({...queryString,type:tab})
    };

    const handleFilter = (key, value) => {
        setQueryString({...queryString, [key]: value, page: 1})
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        console.log(queryString)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword ===''){
            delete queryString.keyword
            setQueryString(queryString)
        }else {
            handleFilter('keyword',keyword)
        }
    };

    return (
        <>
            <MainLayOut style={{zIndex: 10000}}>
                {/*Search*/}
                <div
                    className="header_container z-50 lg:mx-[-8.04rem] md:mx-[-4.04rem] bg-orange-500 opacity-90 border border-t-amber-50"
                    style={{marginTop: '4rem'}}>
                    <div className="container">
                        <div className=" lg:w-7/12 md:w-6/12 my-8   mx-auto">
                            <form className="" onSubmit={handleSearch}>
                                <label htmlFor="default-search"
                                       className="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white">Tìm
                                    kiếm</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search"
                                           value={keyword}
                                           onChange={(e) => setKeyword(e.target.value)}
                                           className="block w-full p-4 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-600 focus:border-orange-500 "
                                           placeholder="Tìm kiếm..."/>
                                    <button type="submit"
                                            className="text-white absolute end-2.5 bottom-2 bg-orange-500 hover:bg-orange-600 focus:ring-1 hover:border-orange-500 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2">Tìm
                                        kiếm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    categories && sc ?
                        <>
                            <div
                                className="flex flex-col gap-8 sm:gap-[60px]  lg:gap-32 xs:px-2 pb-4 md:pb-8 xl:pb-12 pt-[10px]">
                                <div className=" relative ">
                                    <div
                                        className="mb-4 flex min-[450px]:flex-col  sm:flex-col md:flex-row flex-row  items-center justify-between text-base font-medium w-full ">
                                        <div className="h-12 w-full flex flex-row justify-between pt-3 rounded-md ">
                                            <div onClick={() => handleTabClick("all")}
                                                 className={`w-full text-center cursor-pointer text-neutral-600 pb-2.5 mx-2.5 ${activeTab === "all" ? 'active_tab' : ''}`}
                                            >Tất cả
                                            </div>
                                            <div
                                                onClick={() => handleTabClick("increase")}
                                                className={`w-full text-center cursor-pointer text-neutral-600 pb-2.5 mx-2.5 ${activeTab === "increase" ? 'active_tab' : ''}`}>Đấu
                                                giá tăng
                                            </div>
                                            <div onClick={() => handleTabClick("decrease")}
                                                 className={`w-full text-center cursor-pointer text-neutral-600 pb-2.5 mx-2.5 ${activeTab === "decrease" ? 'active_tab' : ''}`}>Đấu
                                                giá giảm
                                            </div>
                                        </div>
                                        <div className="cursor-text min-[450px]:mt-3 sm:mt-0  h-8 px-2.5 pt-1 ">
                                            <Select
                                                showSearch
                                                className="hover:border-none"
                                                style={{
                                                    width: 200,
                                                }}
                                                placeholder="Search to Select"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                defaultValue={{value: 0, label: 'Tất cả'}}
                                                onChange={(value) => handleFilter('category', value)}
                                                options={[{value: 0, label: 'Tất cả'}, ...categories]}
                                            />
                                        </div>
                                    </div>

                                    {
                                        isSuccess ?
                                            <>
                                                <div>
                                                    <div
                                                        className=" text-sm min-[450px]:grid-cols-2 grid sm:grid-cols-3 md:grid-cols-4 mb-4 lg:grid-cols-5 grid-cols-5 gap-4">
                                                        {
                                                            isSuccess && data && data.length > 0 &&
                                                            data.map((product, index) => (
                                                                <div key={index}
                                                                     className=" p-2  ">
                                                                    <CardAuctionStream data={product}/>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>

                                                    {
                                                        isSuccess && data && data.length === 0 ?
                                                            <>
                                                                <div className="flex flex-col items-center">
                                                                    <img
                                                                        style={{width: '30%'}}
                                                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png"
                                                                        alt=""/>
                                                                    <div
                                                                        className="font-medium text-neutral-600 text-base">Không
                                                                        có sản phẩm
                                                                        nào.
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <Pagination
                                                                    count={totalPage}
                                                                    page={currentPage}
                                                                    onChange={handlePageChange}
                                                                    shape="rounded"
                                                                    style={{
                                                                        justifyContent: "center",
                                                                        display: "flex",
                                                                    }}
                                                                />
                                                            </>
                                                    }
                                                </div>
                                            </>
                                            :
                                            <>
                                                <CustomSpinner h={8} w={8} font={'sm'}/>
                                            </>
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <CustomSpinner h={12} w={12} font={'sm'}/>
                        </>
                }
            </MainLayOut>
        </>
    )
}

export default AuctionStreamHome

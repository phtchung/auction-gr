import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Select} from "antd";
import {Pagination} from "@mui/material";
import Search from "../../Components/SearchCpn/Search.jsx";
import useCategories from "../Home/useCategories.jsx";
import {useState} from "react";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import useAuctionStreamHome from "./useAuctionStreamHome.jsx";
import CardAuctionStream from "../../Components/Card/cardAuctionStream.jsx";

const AuctionStreamHome = () => {
    const {isSuccess , isLoading,data , setType , type, setQueryString, queryString , totalPage,currentPage,handlePageChange } = useAuctionStreamHome()
    const {categories  , isSuccess : sc , isLoading : ld} = useCategories()
    const [activeTab, setActiveTab] = useState(type);

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

    return (
        <>
            <MainLayOut style={{zIndex: 10000}}>
                <Search />
                {
                   categories && sc ?
                       <>
                           <div className="flex flex-col gap-8 sm:gap-[60px]  lg:gap-32 xs:px-2 pb-4 md:pb-8 xl:pb-12 pt-[10px]">
                               <div className=" relative ">
                                   <div className="mb-4 flex min-[450px]:flex-col  sm:flex-col md:flex-row flex-row  items-center justify-between text-base font-medium w-full ">
                                       <div className="h-12 w-full flex flex-row justify-between pt-3 rounded-md ">
                                           <div onClick={() => handleTabClick("all")}
                                                className={`w-full text-center cursor-pointer text-neutral-600 pb-2.5 mx-2.5 ${activeTab === "all" ? 'active_tab' : ''}`}
                                              >Tất cả
                                           </div>
                                           <div
                                               onClick={() => handleTabClick("increase")}
                                               className={`w-full text-center cursor-pointer text-neutral-600 pb-2.5 mx-2.5 ${activeTab === "increase" ? 'active_tab' : ''}`}>Đấu giá tăng
                                           </div>
                                           <div   onClick={() => handleTabClick("decrease")}
                                                  className={`w-full text-center cursor-pointer text-neutral-600 pb-2.5 mx-2.5 ${activeTab === "decrease" ? 'active_tab' : ''}`}>Đấu giá giảm
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
                                               defaultValue={{value:0,label:'Tất cả'}}
                                               onChange={(value) => handleFilter('category',value)}
                                               options={[{value:0,label:'Tất cả'},...categories]}
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

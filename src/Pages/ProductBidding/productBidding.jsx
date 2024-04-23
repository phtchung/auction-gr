import SideBar from "../../Components/SideBar/index.jsx";
import {useEffect, useState} from "react";
import {Button, Input} from "@material-tailwind/react";
import ProductBiddingCpn from "../../Components/ProductBiddingCpn/productBiddingCpn.jsx";
import useProductBidding from "./useProductBidding.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Spin} from "antd";
import {useInView} from 'react-intersection-observer';

const ProductBidding = () => {
    const [keyword, setKeyword] = useState('')
    const {
        isLoading,
        isSuccess,
        data,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        queryString,
        setQueryString
    } = useProductBidding();
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
    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <SideBar/>
                    <div className="home-right ">
                        <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
                            Đang tham gia đấu giá
                        </div>
                        <div className="border-b border-neutral-300 "></div>
                        <div className="relative flex w-full ">
                            <Input
                                type="text"
                                style={{backgroundColor: "#eaeaea"}}
                                defaultValue={queryString.keyword ? queryString.keyword : keyword}
                                onChange={onChange}
                                placeholder="Bạn có thể tìm kiếm theo tên hoặc mã sản phẩm"
                                className="pr-30 pl-5"
                            />
                            <Button
                                onClick={handleSearch}
                                size="sm"
                                className={`!absolute right-1 top-1 rounded ${
                                    keyword ? "bg-blue-800" : "bg-gray-400"
                                }`}
                            >
                                Search
                            </Button>
                        </div>

                        {isLoading ?
                            <>
                                <Spin className="text-center mt-60" tip="Loading"/>
                            </>
                            :
                            isSuccess ?
                                <>
                                    {data.pages.map((page) => (
                                        <>
                                            {
                                                page.data.data.length !== 0 ?
                                                    <>
                                                        <div className="flex flex-col gap-3">
                                                            {page.data.data.map((item) => (
                                                                <>
                                                                    <ProductBiddingCpn key={item._id} data={item}/>
                                                                </>
                                                            ))}
                                                        </div>

                                                        <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="mt-20">Không có sản phẩm</div>
                                                    </>
                                            }
                                        </>
                                    ))}
                                </>
                                :
                                <>
                                    <div>Lỗi</div>
                                </>
                        }
                    </div>
                </div>
            </MainLayOut>
        </>
    )
}
export default ProductBidding;

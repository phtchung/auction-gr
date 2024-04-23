import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Avatar, Breadcrumb, Checkbox,Input, Select, Spin } from "antd";
import {StarFilled , SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import useSellerHome from "./useSellerHome.jsx";
import CardItem4Line from "../../Components/Card/cardItem4Line.jsx";
import {useNavigate} from "react-router-dom";
import {Pagination} from "@mui/material";


const SellerHome = () => {
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState(null)
    const [price, setPrice] = useState({})
    const [minPrice,setMinPrice] = useState(null)
    const [maxPrice,setMaxPrice] = useState(null)
    const {
        isError,
        isLoading,
        isSuccess,
        sellerHomeData,
        total_product,
        isLd,
        isSc,
        queryString,
        totalPage,
        handlePageChange,
        currentPage,
        total,
        setQueryString,
        products,
    } = useSellerHome()

    const handleFilter = (key, value) => {
        setQueryString({...queryString, [key]: value, page: 1})
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        console.log(queryString)
    }

    const handleKeyword = (value) => {
        if(keyword){
            setQueryString({...queryString,keyword:value})
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }else {
            console.log('alo')
             delete queryString.keyword
            setQueryString(queryString)
        }

    }
    const handleInput = (key, value) => {
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(value) || value === '' || value === '-') {
            setPrice({...price, [key]: value})
            if(key === 'minPrice'){
                setMinPrice(value)
            }else setMaxPrice(value)
        }
    }
    const handlePrice = () => {
        if(minPrice === '' && maxPrice === ''){
            delete queryString.minPrice
            delete queryString.maxPrice
            setQueryString(queryString)
        }else if(minPrice === ''){
            delete price.minPrice
            delete queryString.minPrice
            setQueryString({...queryString, ...price, page: 1})
        }else if(maxPrice === ''){
            delete price.maxPrice
            delete queryString.maxPrice
            setQueryString({...queryString, ...price, page: 1})
        } else {
            setQueryString({...queryString, ...price, page: 1})
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const handleRemove = () => {
        setQueryString({page:1})
        setMinPrice(null)
        setMaxPrice(null)
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const handleRmPrice = () => {
        delete queryString.minPrice
        delete queryString.maxPrice
        setMaxPrice(null)
        setMinPrice(null)
        setQueryString(queryString)
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    useEffect(() => {
        setMinPrice(queryString.minPrice)
        setMaxPrice(queryString.maxPrice)
        setKeyword(queryString.keyword)

    }, []);

    const handleNavigateAuction = (id) => {
        navigate(`/auction/item/${id}`)
        window.scrollTo(0, 0);
    }

    return (
        <>
            <MainLayOut>
                <div className="md:container">
                    {isLoading ?
                        <>
                            <Spin className="text-center mt-60" tip="Loading" size="large">
                            </Spin>
                        </>
                        :
                        <>
                        {
                            isError ?
                                navigate('/404')
                            :
                            <>
                                {
                                    isSuccess && <>
                                        <div className="px-3  mx-2 mt-2">
                                            <Breadcrumb
                                                items={[
                                                    {
                                                        title: <a className="text-base" href="/">Trang chủ</a>,
                                                    },
                                                    {
                                                        title: <a className="text-base" href="">{sellerHomeData.seller_user_name}</a>,
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="flex flex-row items-start gap-6 p-3 m-2 mt-4 ">
                                            {/*cột menu danh mục và filter */}
                                            <div className=" md:basis-1/5 sm:basis-1/4 ">
                                                <div style={{backgroundColor: "white"}} className="pt-1 mb-5">
                                                    <div className="flex flex-row p-3 pb-1 items-center gap-2">
                                                        <Avatar size="large"
                                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                                                        <div
                                                            className="overflow_css_w_158 text-left text-neutral-700 text-base font-sans"> {sellerHomeData.seller_user_name}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex flex-row justify-center gap-4 px-4 p-3 pb-2 items-center">
                                                        <div
                                                            className="flex items-center gap-1 pr-4 border-r border-neutral-200">
                                                            <span>{sellerHomeData?.average_rating} </span>
                                                            <StarFilled className="text-yellow-500"/>
                                                        </div>
                                                        <div>
                                                            {sellerHomeData?.rate_count} đánh giá
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex flex-row justify-center gap-6 px-4 p-3 pb-2 items-center">
                                                        <div className=" gap-1 pr-5 ">
                                                            <span> Đã bán : </span>
                                                            <span>{sellerHomeData?.product_done_count}  </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex flex-row justify-center gap-6 px-4 p-2 pb-3 items-center">

                                                        <div className=" flex items-center gap-1 pr-5 ">
                                                            <span>Đang đấu giá : </span>
                                                            <span
                                                                className="font-bold text-base"> {total_product} </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/*filter */}

                                                <div style={{backgroundColor: "white"}} className="p-5 pt-3 mb-5 ">
                                                    <div
                                                        className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-base text-left">Lọc theo từ khóa
                                                    </div>
                                                    <div className="flex gap-2 ">
                                                        <input onChange={(e) => setKeyword(e.target.value)}
                                                               placeholder="Nhập từ khóa"
                                                               value={keyword}
                                                               className="border w-11/12 border-orange-500 px-3 py-2 focus:outline-orange-500 "/>
                                                        <SearchOutlined className="cursor-pointer" onClick={() => handleKeyword(keyword)}  style={{ fontSize: '20px',color: keyword ? 'rgb(249, 115, 22)' : '#A6A4A3FF' }}/>
                                                    </div>

                                                </div>

                                                <div style={{backgroundColor: "white"}} className="p-5 pt-3 mb-5 ">
                                                    <div
                                                        className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-base text-left">Lọc
                                                        nâng cao
                                                    </div>

                                                    <Checkbox.Group value={queryString.advance}
                                                                    onChange={(value) => handleFilter('advance', value)}
                                                                    className="flex flex-col justify-center gap-y-1">
                                                        <Checkbox value="3">Miễn phí vận chuyển</Checkbox>
                                                        <Checkbox value="4">Kết thúc sau 1 giờ</Checkbox>
                                                        <Checkbox value="5">Sản phẩm mới đấu giá </Checkbox>
                                                    </Checkbox.Group>
                                                </div>

                                                <div style={{backgroundColor: "white"}} className="p-5 pt-3 mb-5 ">
                                                    <div
                                                        className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-left text-base"> Tình
                                                        trạng
                                                    </div>
                                                    <Checkbox.Group value={queryString.state}
                                                                    onChange={(value) => handleFilter('state', value)}
                                                                    className="flex flex-col justify-center gap-y-1">
                                                        <Checkbox value="0">Chưa sử dụng</Checkbox>
                                                        <Checkbox value='1'>Đã sử dụng</Checkbox>
                                                    </Checkbox.Group>
                                                </div>

                                                <div style={{backgroundColor: "white"}} className="p-4 pt-3 mb-5 ">
                                                    <div
                                                        className="flex justify-between items-center text-base pb-1 mb-2 border-b border-b-neutral-200 font-sans">
                                                        <div>
                                                            Tìm kiếm theo giá
                                                        </div>
                                                        {
                                                            (queryString?.minPrice || queryString?.maxPrice) &&
                                                            <div onClick={handleRmPrice}
                                                                 className="text-yellow-500 underline cursor-pointer font-semibold text-sm">Xóa</div>
                                                        }
                                                    </div>

                                                    <div className="flex flex-col justify-center gap-y-1">
                                                        <div
                                                            className="flex flex-grow gap-2 mt-2 items-center justify-between">
                                                            <Input
                                                                className="border focus:border-amber-500 p-2 h-9 border-amber-500"
                                                                placeholder="Từ"
                                                                value={minPrice}
                                                                type="number"
                                                                onChange={(e) => handleInput('minPrice', e.target.value)}/>
                                                            <span>-</span>
                                                            <Input
                                                                className="border p-2 h-9 border-amber-500 hover:border-amber-500"
                                                                placeholder="Đến"
                                                                type="number"
                                                                value={maxPrice}
                                                                onChange={(e) => handleInput('maxPrice', e.target.value)}/>
                                                        </div>
                                                        <div>
                                                            <div onClick={handlePrice}
                                                                 className="pb-1 mt-4 text-center border border-amber-500 h-9 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer pt-1 font-semibold  text-base">
                                                                Tìm kiếm
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div onClick={handleRemove}
                                                         className="pb-1 text-center border border-amber-500 h-9 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer pt-1 font-semibold  text-base">
                                                        Xóa tất cả
                                                    </div>
                                                </div>
                                            </div>

                                            {/*    cột hiển thị sản phẩm*/}
                                            <div className=" md:basis-4/5 sm:basis-3/4  flex-col gap-y-4">
                                                {isLd ?
                                                    <>
                                                        <Spin className="text-center mt-40" tip="Loading" size="large"/>

                                                    </>
                                                    :
                                                    <>
                                                        {(totalPage && totalPage !== 0 && currentPage) ? (
                                                                <>
                                                                    <div className="flex flex-col bg-white pt-3 p-2 mb-4">
                                                                        <div
                                                                            className="flex flex-grow items-center justify-end border-b border-b-neutral-200 px-2 pb-2">
                                                                        <Select
                                                                                value={queryString.sortBy || 'Sắp xếp'}
                                                                                style={{
                                                                                    width: 160,
                                                                                    borderRadius: 0,
                                                                                    zIndex: 0
                                                                                }}
                                                                                onSelect={(value) => handleFilter('sortBy', value)}
                                                                            >
                                                                                <Select.OptGroup label='Giá'>
                                                                                    <Select.Option label='price' value='price-desc'>Từ
                                                                                        cao đến
                                                                                        thấp</Select.Option>
                                                                                    <Select.Option label='price' value='price-asc'>Từ
                                                                                        thấp đến
                                                                                        cao</Select.Option>
                                                                                </Select.OptGroup>
                                                                                <Select.OptGroup label='Thời gian kết thúc'>
                                                                                    <Select.Option label='finish_time'
                                                                                                   value='finish_time-asc'>Gần
                                                                                        nhất</Select.Option>
                                                                                    <Select.Option label='finish_time'
                                                                                                   value='finish_time-desc'>Xa
                                                                                        nhất</Select.Option>
                                                                                </Select.OptGroup>
                                                                                <Select.OptGroup label='Số lượt đấu giá'>
                                                                                    <Select.Option label='bid_count'
                                                                                                   value='bid_count-desc'>Nhiều
                                                                                        nhất</Select.Option>
                                                                                    <Select.Option label='bid_count'
                                                                                                   value='bid_count-asc'>Ít
                                                                                        nhất </Select.Option>
                                                                                </Select.OptGroup>
                                                                            </Select>
                                                                        </div>

                                                                        <div className="flex flex-wrap">
                                                                            {
                                                                                products && products.map((product, index) => (
                                                                                    <div
                                                                                        onClick={() => handleNavigateAuction(product.product_id)}
                                                                                        key={index} className="md:basis-1/5 p-2">
                                                                                        <CardItem4Line data={product}/>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
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
                                                            )
                                                            :
                                                            <>
                                                                <div className="flex flex-col mt-5 items-center">
                                                                    <img
                                                                        style={{width: '30%'}}
                                                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png"
                                                                        alt=""/>
                                                                    <div className="text-gray-500 text-base">Không có sản phẩm nào. Bạn
                                                                        thử
                                                                        tắt điều kiện lọc và tìm lại nhé?
                                                                    </div>
                                                                    <div onClick={handleRemove}
                                                                         className="p-6 mt-5 text-center border border-amber-500 h-9 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer pt-1 font-semibold  text-base">
                                                                        Xóa bộ lọc
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        }
                        </>
                    }
                </div>
            </MainLayOut>
        </>
    )
}

export default SellerHome

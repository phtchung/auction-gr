import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Select, Checkbox, Breadcrumb, Radio, Input, Spin} from "antd";
import { StarFilled} from '@ant-design/icons';
import {useEffect, useState} from "react";
import useCategoryDetail from "./useCategoryDetail.jsx";
import CardItem4Line from "../../Components/Card/cardItem4Line.jsx";
import {useNavigate} from "react-router-dom";
import {Pagination} from "@mui/material";

const CategoriesFilter = () => {
    const navigate = useNavigate()
    const [price,setPrice] = useState({})
    const {isSucces, isLoading, category , products, isSc,total,isLd,currentPage,totalPage,setQueryString,queryString,handlePageChange} = useCategoryDetail()

    const handleFilter =  (key,value) => {
        setQueryString({...queryString,[key]:value,page:1})
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        console.log(queryString)
    }
    const handleInput = (key,value) => {
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(value) || value === '' || value === '-') {
            setPrice({...price,[key]: value})
        }
    }
    const handleNavigateAuction = (id) => {
        navigate(`/auction/item/${id}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const handlePrice = () => {
        setQueryString({...queryString,...price,page:1})
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const handleRemove = () => {
        setQueryString({page:1})
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const onChange = (checkedValues) => {
        setQueryString({...queryString,page:1,rate:checkedValues.target.value})
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <MainLayOut>
                <div className="md:container">
                    {category &&
                        <>
                            <div className="px-3 mx-2 mt-2">
                                <Breadcrumb
                                    items={[
                                        {
                                            title: 'Home',
                                        },
                                        {
                                            title: <a href="">Application Center</a>,
                                        },
                                        {
                                            title: <span>{category.name}</span>
                                        },
                                    ]}
                                />
                            </div>
                        </>}

                    <div className="flex flex-row items-start gap-6 p-3 m-2 mt-4 ">
                        {/*cột menu danh mục và filter */}

                        <div className=" md:basis-1/5 sm:basis-1/4 ">
                            {
                                category &&
                                <>
                                    <div style={{backgroundColor: "white"}} className="pt-5 mb-5">
                                        <div
                                            className={`mb-1 font-semibold  text-base ${!category.child ? 'pb-5' : 'pb-1'}`}>{category.name}</div>
                                        {
                                            category.child && category?.child.map((child, index) => (
                                                <>
                                                    <div
                                                         className={` border-b border-neutral-100 pl-5 hover:bg-neutral-200 relative  cursor-pointer flex items-center justify-between`}>
                                                        <div key={index}
                                                            onClick={() => handleFilter('subcate',child._id)}
                                                            className={`text-base cursor-pointer leading-10 text-neutral-700 `}>
                                                            {child.name}
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </>
                            }

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

                            <div style={{backgroundColor: "white"}} className="p-5 pt-3 mb-5 ">
                                <div
                                    className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-left text-base">Đánh
                                    giá người bán hàng
                                </div>
                                <div className="flex flex-col item-center gap-y-1">
                                    <Radio.Group value={parseInt(queryString.rate)} className="flex flex-col gap-y-1" onChange={onChange}>
                                        <Radio value={-1}>Dưới 1 <StarFilled className="text-yellow-500"/></Radio>
                                        <Radio value={1}>Trên 1 <StarFilled className="text-yellow-500"/></Radio>
                                        <Radio value={2}>Trên 2 <StarFilled className="text-yellow-500"/></Radio>
                                        <Radio value={3}>Trên 3 <StarFilled className="text-yellow-500"/></Radio>
                                        <Radio value={4}>Trên 4 <StarFilled className="text-yellow-500"/> </Radio>
                                    </Radio.Group>

                                </div>
                            </div>

                            <div style={{backgroundColor: "white"}} className="p-4 pt-3 mb-5 ">
                                <div className="flex justify-between items-center text-base pb-1 mb-2 border-b border-b-neutral-200 font-sans">
                                    <div>
                                        Tìm kiếm theo giá
                                    </div>
                                    {
                                        (queryString?.minPrice || queryString?.maxPrice) &&
                                        <div className="text-yellow-500 underline cursor-pointer font-semibold text-sm">Xóa</div>
                                    }

                                </div>

                                <div className="flex flex-col justify-center gap-y-1">
                                    <div className="flex flex-grow gap-2 mt-2 items-center justify-between">
                                        <Input className="border focus:border-amber-500 p-2 h-9 border-amber-500"
                                               placeholder="Từ"
                                               defaultValue={queryString.minPrice ? parseInt(queryString.minPrice) : ''}
                                               type="number"
                                               onChange ={(e) => handleInput('minPrice', e.target.value)}/>
                                        <span>-</span>
                                        <Input className="border p-2 h-9 border-amber-500 hover:border-amber-500"
                                               placeholder="Đến"
                                               type="number"
                                               defaultValue={parseInt(queryString.maxPrice)}
                                               onChange={(e) => handleInput('maxPrice', e.target.value)}/>
                                    </div>
                                    <div>
                                        <div onClick={handlePrice}
                                             className="pb-1 mt-4 text-center border border-amber-500 h-9 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer pt-1 font-semibold  text-base">
                                            Theo giá hiện tại
                                        </div>
                                    </div>

                                </div>

                                {/*<div className="flex flex-col mt-4 justify-center gap-y-1">*/}
                                {/*    <div className="flex flex-grow gap-2 mt-2 items-center justify-between">*/}
                                {/*        <Input className="border focus:border-amber-500 p-2 h-9 border-amber-500"*/}
                                {/*               placeholder="Từ"*/}
                                {/*               defaultValue={parseInt(queryString.mMinPrice)}*/}
                                {/*               type="number"*/}
                                {/*               onChange={(e) => handleInput('pMinPrice', e.target.value)}/>*/}
                                {/*        <span>-</span>*/}
                                {/*        <Input className="border p-2 h-9 border-amber-500 hover:border-amber-500"*/}
                                {/*               placeholder="Đến"*/}
                                {/*               type="number"*/}
                                {/*               defaultValue={parseInt(queryString.pMaxPrice)}*/}
                                {/*               onChange={(e) => handleInput('pMaxPrice', e.target.value)}/>*/}
                                {/*    </div>*/}
                                {/*    <div>*/}
                                {/*        <div onClick={handlePrice}*/}
                                {/*             className="pb-1 mt-4 text-center border border-amber-500 h-9 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer pt-1 font-semibold  text-base">*/}
                                {/*            Theo giá khởi điểm*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*</div>*/}
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
                            {/*giá rẻ */}

                            {isLd ?
                                <>
                                    <Spin className="text-center mt-40"  tip="Loading" size="large"/>

                                </>
                                :
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
                                                    <Select.Option label='price' value='price-desc'>Từ cao đến
                                                        thấp</Select.Option>
                                                    <Select.Option label='price' value='price-asc'>Từ thấp đến
                                                        cao</Select.Option>
                                                </Select.OptGroup>
                                                <Select.OptGroup label='Thời gian kết thúc'>
                                                    <Select.Option label='finish_time' value='finish_time-asc'>Gần
                                                        nhất</Select.Option>
                                                    <Select.Option label='finish_time' value='finish_time-desc'>Xa
                                                        nhất</Select.Option>
                                                </Select.OptGroup>
                                                <Select.OptGroup label='Số lượt đấu giá'>
                                                    <Select.Option label='bid_count' value='bid_count-desc'>Nhiều
                                                        nhất</Select.Option>
                                                    <Select.Option label='bid_count' value='bid_count-asc'>Ít
                                                        nhất </Select.Option>
                                                </Select.OptGroup>
                                            </Select>
                                        </div>

                                        <div className="flex flex-wrap">
                                            {
                                                products && products.map((product, index) => (
                                                    <div onClick={() => handleNavigateAuction(product.product_id)}
                                                         key={index} className="md:basis-1/5 p-2">
                                                        <CardItem4Line data={product}/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {(totalPage && totalPage !== 0 && currentPage) ? (
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
                                        )
                                        :
                                        <>
                                            <div className="flex flex-col items-center">
                                                <img
                                                    style={{width: '30%'}}
                                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png"
                                                    alt=""/>
                                                <div className="text-gray-500 text-base">Không có sản phẩm nào. Bạn thử
                                                    tắt điều
                                                    kiện lọc và tìm lại nhé?
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

                </div>
            </MainLayOut>
        </>
    )
}
export default CategoriesFilter

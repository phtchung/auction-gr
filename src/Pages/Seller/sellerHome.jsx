import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Avatar, Breadcrumb, Checkbox, Input, Pagination, Select} from "antd";
import {categoriesItems} from "../../Utils/constant.js";
import {StarFilled} from "@ant-design/icons";
import {useState} from "react";
import useSellerHome from "./useSellerHome.jsx";
import CardItem4Line from "../../Components/Card/cardItem4Line.jsx";

const SellerHome = () => {
    const {isError, isLoading, isSuccess, sellerHomeData, products, refetch} = useSellerHome()
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [current, setCurrent] = useState(3);
    const onChangePagination = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    return (
        <>
            <MainLayOut>
                <div className="md:container">

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
                                    title: 'Seller Name',
                                },
                            ]}
                        />
                    </div>
                    {
                        isSuccess && <>
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
                                        <div className="flex flex-row justify-center gap-4 px-4 p-3 pb-2 items-center">
                                            <div className="flex items-center gap-1 pr-4 border-r border-neutral-200">
                                                <span>{sellerHomeData?.average_rating} </span>
                                                <StarFilled className="text-yellow-500"/>
                                            </div>
                                            <div>
                                                {sellerHomeData?.rate_count} đánh giá
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-6 px-4 p-3 pb-2 items-center">
                                            <div className="flex-col flex items-center gap-1 pr-5 ">
                                                <span>{sellerHomeData?.product_done_count}  </span>
                                                <span> đơn hàng </span>
                                            </div>
                                            <div className="flex-col flex items-center gap-1 pr-5 ">
                                                <span>{sellerHomeData?.point}  </span>
                                                <span> điểm</span>
                                            </div>

                                        </div>
                                        <div className="flex flex-row justify-center gap-6 px-4 p-2 pb-3 items-center">

                                            <div className=" flex items-center gap-1 pr-5 ">
                                                <span>Đang đấu giá : </span>
                                                <span className="font-bold text-base"> {products.length} </span>
                                            </div>

                                        </div>

                                    </div>
                                    {/*filter */}
                                    <div style={{backgroundColor: "white"}} className="p-5 pt-3 mb-5 ">
                                        <div
                                            className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-base text-left">Lọc
                                            nâng cao
                                        </div>
                                        <div className="flex flex-col justify-center gap-y-1">
                                            <Checkbox value="11">Miễn phí vận chuyển</Checkbox>
                                            <Checkbox value='22'>Kết thúc sau 1 giờ</Checkbox>
                                            <Checkbox value="33">Sản phẩm mới đấu giá</Checkbox>
                                        </div>
                                    </div>

                                    <div style={{backgroundColor: "white"}} className="p-5 pt-3 mb-5 ">
                                        <div
                                            className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-left text-base"> Tình
                                            trạng
                                        </div>
                                        <div className="flex flex-col justify-center gap-y-1">
                                            <Checkbox value="44">Chưa sử dụng</Checkbox>
                                            <Checkbox value='55'>Đã sử dụng</Checkbox>
                                        </div>
                                    </div>

                                    <div style={{backgroundColor: "white"}} className="p-4 pt-3 mb-5 ">
                                        <div
                                            className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-left text-base">Theo
                                            giá
                                        </div>
                                        <div className="flex flex-col justify-center gap-y-1">
                                            <div className="flex flex-grow gap-2 items-center justify-between">
                                                <Input className="border focus:border-amber-500 p-2 h-9 border-amber-500 "
                                                       placeholder="Từ" onChange={onChange}/>
                                                <span>-</span>
                                                <Input
                                                    className="border p-2 h-9 border-amber-500  focus:border-amber-500 outline-none hover:border-amber-500"
                                                    placeholder="Đến" onChange={onChange}/>

                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="pb-1 text-center border border-amber-500 h-9 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer pt-1 font-semibold  text-base">Tìm
                                            kiếm
                                        </div>
                                    </div>
                                </div>

                                {/*    cột hiển thị sản phẩm*/}
                                <div className=" md:basis-4/5 sm:basis-3/4  flex-col gap-y-4">

                                    {/*giá rẻ */}
                                    <div className="flex flex-col bg-white pt-3 p-2 mb-4">
                                        <div
                                            className="flex flex-grow items-center justify-end border-b border-b-neutral-200 px-2 pb-2">
                                            <Select
                                                defaultValue="Sắp xếp"
                                                style={{
                                                    width: 160,
                                                    borderRadius: 0,
                                                }}
                                                onChange={handleChange}
                                                options={[
                                                    {
                                                        label: <span>Giá </span>,
                                                        title: 'manager',
                                                        options: [
                                                            {
                                                                label: <span>Từ cao đến thấp</span>,
                                                                value: '1',
                                                            },
                                                            {
                                                                label: <span>Từ thấp đến cao</span>,
                                                                value: '2',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        label: <span>Thời gian kết thúc</span>,
                                                        title: 'engineer',
                                                        options: [
                                                            {
                                                                label: <span>Gần nhất</span>,
                                                                value: '3',
                                                            },
                                                            {
                                                                label: <span>Xa nhất</span>,
                                                                value: '4',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        label: <span>Số lượt đấu giá </span>,
                                                        title: 'engineer',
                                                        options: [
                                                            {
                                                                label: <span>Nhiều nhất</span>,
                                                                value: '5',
                                                            },
                                                            {
                                                                label: <span>Ít nhất</span>,
                                                                value: '6',
                                                            },
                                                        ],
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="flex flex-wrap">
                                            {
                                                products.map((product, index) => (
                                                    <div key={index} className="md:basis-1/5 p-2">
                                                        <CardItem4Line data={product}/>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                    <Pagination current={current} showSizeChanger={false} onChange={onChangePagination}
                                                total={100}/>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </MainLayOut>
        </>
    )
}

export default SellerHome

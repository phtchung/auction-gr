import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import { Select, Checkbox, Pagination, Breadcrumb, Radio, Input} from "antd";
import { StarFilled} from '@ant-design/icons';
import {useState} from "react";
import useCategoryDetail from "./useCategoryDetail.jsx";
import CardItem4Line from "../../Components/Card/cardItem4Line.jsx";
import {useNavigate} from "react-router-dom";

const CategoriesFilter = () => {
    const navigate = useNavigate()
    const {isSucces, isLoading, category , products, isSc} = useCategoryDetail()
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [current, setCurrent] = useState(3);
    const onChangePagination = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const handleNavigateAuction = (id) => {
        navigate(`/auction/item/${id}`)
        window.scrollTo(0, 0);
    }
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
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
                                                    <div key={index}
                                                         className={` border-b border-neutral-100 pl-5 hover:bg-neutral-200 relative  cursor-pointer flex items-center justify-between`}>
                                                        <div
                                                            // onClick={() => handleNavigateCate(category.category_id)}
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

                            <div style={{backgroundColor: "white"}} className="p-5 pt-3 mb-5 ">
                                <div
                                    className="pb-1 mb-2 border-b border-b-neutral-200 font-sans text-left text-base">Đánh
                                    giá người bán hàng
                                </div>
                                <div className="flex flex-col item-center gap-y-1">
                                    <Radio.Group className="flex flex-col gap-y-1" onChange={onChange}>
                                        <Radio value={1}>Dưới 1 <StarFilled className="text-yellow-500"/></Radio>
                                        <Radio value={2}>Trên 1 <StarFilled className="text-yellow-500"/></Radio>
                                        <Radio value={3}>Trên 2 <StarFilled className="text-yellow-500"/></Radio>
                                        <Radio value={4}>Trên 3 <StarFilled className="text-yellow-500"/> </Radio>
                                        <Radio value={5}>Trên 4 <StarFilled className="text-yellow-500"/></Radio>
                                    </Radio.Group>

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

                                        <Input className="border p-2 h-9 border-amber-500 hover:border-amber-500"
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
                                            zIndex: 0
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
                                        products && products.map((product,index) => (
                                            <div onClick={() => handleNavigateAuction(product.product_id)}
                                                 key={index} className="md:basis-1/5 p-2">
                                                <CardItem4Line data={product}/>
                                            </div>
                                        ))
                                    }

                                </div>

                            </div>
                            <Pagination current={current} showSizeChanger={false} onChange={onChangePagination}
                                        total={50}/>
                        </div>
                    </div>

                </div>
            </MainLayOut>
        </>
    )
}
export default CategoriesFilter

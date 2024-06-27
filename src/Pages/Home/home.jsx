import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {DownOutlined , UpOutlined} from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import {useNavigate} from "react-router-dom";
import useHome from "./useHome.jsx";
import CardNormal from "../../Components/Card/cardNormal.jsx";
import CardSeller from "../../Components/Card/cardSeller.jsx";
import CardPreEnd from "../../Components/Card/cardPreEnd.jsx";
import useCategories from "./useCategories.jsx";
import {useState} from "react";
const Home = () => {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
        }
    };
    const toggleCategory = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };
    const handleNavigateCate = (url) => {
        navigate(`/categories/${url}`)
        window.scrollTo(0,0)
    };
    const {categories , isSuccess : sc , isLoading : ld} = useCategories()
    const {productRare , products1k , productsPreEnd , topSeller , isRareSc ,
        isTopLd , isRareLd , is1dSc, isSuccess ,
        isLoading , isTopSc , is1dLd,standOut, isStandOutSc , isStandOutLd} = useHome()

    const handleNavigateSellerHome = (username) => {
        navigate(`/seller/${username}`)
        window.scrollTo(0, 0);
    }
    const handleNavigateAuction = (id) => {
        navigate(`/auction/item/${id}`)
        window.scrollTo(0, 0);
    }

    return (
        <>
            <MainLayOut style={{zIndex: 10000}}>

                {/*Search */}
                <div className="header_container z-50 mx-[-8.044rem] bg-orange-500 opacity-90 border border-t-amber-50"
                     style={{marginTop: '4rem'}}>
                    <div className="container">
                        <div className=" lg:w-7/12 md:w-6/12 my-8   mx-auto">
                            <form className="" onSubmit={handleSearch}>
                                <label htmlFor="default-search"
                                       className="mb-1 text-sm font-medium text-gray-900 sr-only ">Tìm
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
                                           className="block w-full p-4 ps-10 text-base bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-600 focus:border-orange-500 "
                                           placeholder="Tìm kiếm..." required/>
                                    <button type="submit"
                                            className="text-white absolute end-2.5 bottom-2 bg-orange-500 hover:bg-orange-600 focus:ring-1 hover:border-orange-500 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2">Tìm
                                        kiếm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="md:container">

                    <div>
                        {/*//chia 2 cột , 1 cột danhm muc , 1 sột sản phẩm */}
                        <div className="flex flex-row items-start gap-6 p-3 m-2  ">
                            <div className=" md:basis-1/5 sm:basis-1/4  "
                                 style={{backgroundColor: "white"}}>
                                {
                                    isSuccess &&
                                    <div className="mb-1 pt-4 font-semibold text-lg">Danh mục</div>
                                }

                                {
                                    categories && categories.map((category, index) => (
                                        <>
                                            <div key={index}
                                                 className={`${selectedCategory === category.name ? 'bg-orange-200' : ''} border-b border-neutral-100 pl-5 hover:bg-neutral-200 relative  cursor-pointer flex items-center justify-between`}>
                                                <div onClick={() => handleNavigateCate(category.category_id)}
                                                     className={`text-base cursor-pointer leading-10 text-neutral-700 `}>
                                                    {category.name}
                                                </div>
                                                <div className="py-2 px-4" onClick={() => toggleCategory(category.name)}>
                                                    {selectedCategory === category.name ?
                                                        <UpOutlined style={{fontSize: 12}}/> :
                                                        <DownOutlined style={{fontSize: 12}}/>}
                                                </div>
                                            </div>
                                            {selectedCategory === category.name && (
                                                category.children.map((child, index) => (
                                                    <div key={index}
                                                         className=" slide-down cursor-pointer text-left px-5  bg-white">
                                                        <div
                                                            className="hover:text-orange-500 border-b border-neutral-100 leading-8 text-sm">
                                                            {child.name}
                                                        </div>
                                                    </div>
                                                ))

                                            )}
                                        </>
                                    ))
                                }
                                {/*<Menu*/}
                                {/*    onClick={onClick}*/}
                                {/*    onOpenChange={handleNavigateCate}*/}
                                {/*    style={{*/}
                                {/*        width: '100%',*/}
                                {/*        textAlign: 'left',*/}
                                {/*        backgroundColor: 'white'*/}
                                {/*    }}*/}
                                {/*    mode="inline"*/}
                                {/*    items={categoriesItems}*/}
                                {/*>*/}
                                {/*</Menu>*/}
                            </div>

                            {/*cột hiển thị các sản phẩm*/}
                            <div className=" md:basis-4/5 sm:basis-3/4  flex-col gap-y-4">
                                {/* Sản phẩm nổi bật*/}
                                <div className="flex flex-col bg-white pt-3 p-2 mb-4">
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">SẢN PHẨM NỔI
                                                BẬT
                                            </div>
                                        </div>
                                    </div>

                                    <Carousel
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        className=""
                                        containerClass="carousel-container"
                                        dotListClass=""
                                        draggable
                                        focusOnSelect={false}
                                        keyBoardControl
                                        minimumTouchDrag={50}
                                        pauseOnHover
                                        renderArrowsWhenDisabled={false}
                                        renderButtonGroupOutside={false}
                                        renderDotsOutside={false}
                                        responsive={{
                                            desktop: {
                                                breakpoint: {
                                                    max: 3000,
                                                    min: 1024
                                                },
                                                items: 4,
                                            },
                                            mobile: {
                                                breakpoint: {
                                                    max: 464,
                                                    min: 0
                                                },
                                                items: 1,
                                            },
                                            tablet: {
                                                breakpoint: {
                                                    max: 1024,
                                                    min: 464
                                                },
                                                items: 3,
                                            }
                                        }}
                                        rewind
                                        centerMode={true}
                                        rewindWithAnimation={false}
                                        rtl={false}
                                        shouldResetAutoplay
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={4}
                                        swipeable
                                    >

                                            {
                                                isStandOutSc && standOut && standOut.map((product, index) => (
                                                    <div onClick={() => handleNavigateAuction(product.product_id)}
                                                         key={index}
                                                         className=" p-2 ">
                                                        <CardNormal data={product}/>
                                                    </div>
                                                ))
                                            }

                                    </Carousel>
                                </div>
                                {/*sắp kết thúc*/}
                                <div className="flex flex-col bg-white pt-3 p-2 mb-4">
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">SẮP KẾT THÚC
                                            </div>
                                        </div>
                                    </div>

                                    <Carousel
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        className=""
                                        containerClass="carousel-container"
                                        dotListClass=""
                                        draggable
                                        focusOnSelect={false}
                                        keyBoardControl
                                        minimumTouchDrag={50}
                                        pauseOnHover
                                        renderArrowsWhenDisabled={false}
                                        renderButtonGroupOutside={false}
                                        renderDotsOutside={false}
                                        responsive={{
                                            desktop: {
                                                breakpoint: {
                                                    max: 3000,
                                                    min: 1024
                                                },
                                                items: 4,
                                            },
                                            mobile: {
                                                breakpoint: {
                                                    max: 464,
                                                    min: 0
                                                },
                                                items: 1,
                                            },
                                            tablet: {
                                                breakpoint: {
                                                    max: 1024,
                                                    min: 464
                                                },
                                                items: 3,
                                            }
                                        }}
                                        rewind
                                        centerMode={true}
                                        rewindWithAnimation={false}
                                        rtl={false}
                                        shouldResetAutoplay
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={4}
                                        swipeable
                                    >
                                        {
                                            isSuccess && productsPreEnd && productsPreEnd.map((product, index) => (
                                                <div onClick={() => handleNavigateAuction(product.product_id)} key={index}
                                                     className="md:basis-1/5 p-2 ">
                                                    <CardPreEnd data={product}/>
                                                </div>
                                            ))
                                        }
                                    </Carousel>
                                </div>

                                {/*giá rẻ */}
                                <div className="flex flex-col bg-white pt-3 p-2 mb-4" style={{maxHeight: 844}}>
                                    <div className="flex flex-grow  justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                            <span className="relative flex h-3 w-3">
                                                <span
                                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                                <span
                                                    className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">SẢN PHẨM
                                                DƯỚI 1K
                                            </div>
                                        </div>
                                        {
                                            products1k && products1k.length > 9 && <>
                                                <div className="text-base cursor-pointer view_all">
                                                    <span>Xem tất cả  →</span>
                                                </div>
                                            </>
                                        }
                                    </div>

                                    <div className="flex flex-wrap">
                                        {
                                            is1dSc && products1k && products1k.map((product, index) => (
                                                <div onClick={() => handleNavigateAuction(product.product_id)} key={index}
                                                     className="md:basis-1/5 p-1.5 py-3 ">
                                                    <CardNormal data={product}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col bg-white pt-3 p-2 mb-4" style={{maxHeight: 844}}>
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                                            <span
                                                className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                            <div className="text-left text-lg font-semibold text-gray-900 ">SẢN PHẨM
                                                HIẾM / SIÊU HIẾM / GIÁ CAO
                                            </div>
                                        </div>
                                        {
                                            productRare && productRare.length > 9 && <>
                                                <div className="text-base cursor-pointer view_all">
                                                    <span>Xem tất cả  →</span>
                                                </div>
                                            </>
                                        }

                                    </div>

                                    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                                        {
                                            isRareSc && productRare && productRare.map((product, index) => (
                                                <div onClick={() => handleNavigateAuction(product.product_id)} key={index}
                                                     className=" p-2 ">
                                                    <CardNormal data={product}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* người bán nổi bật*/}
                                <div className="flex flex-col bg-white pt-3 p-2 " style={{maxHeight: 844}}>
                                    <div className="flex flex-grow items-center justify-between p-2">
                                        <div className="flex gap-2 items-center mb-2 ">
                                            <div className="text-left text-lg font-semibold text-gray-900 ">NGƯỜI BÁN
                                                NỔI BẬT
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap ">
                                        {
                                            isTopSc && topSeller && topSeller.map((seller, index) => (
                                                <div onClick={() => handleNavigateSellerHome(seller.username)} key={index}
                                                     className="md:basis-1/5 p-2.5 py-3 ">
                                                    <CardSeller data={seller}/>
                                                </div>
                                            ))
                                        }

                                    </div>
                                    {/*collapse xem thêm nma chưa đc */}
                                    {/*<Collapse*/}
                                    {/*    accordion*/}
                                    {/*    bordered={false}*/}
                                    {/*    size="small"*/}
                                    {/*    destroyInactivePanel={true}*/}
                                    {/*    style={{padding:0}}*/}
                                    {/*    expandIcon={({ isActive }) => (*/}
                                    {/*        <span className={`custom-icon  text-right ${isActive ? '-z-50' : ''}`}>*/}
                                    {/*            {isActive ? '' : <div>Show more</div>}*/}
                                    {/*        </span>*/}
                                    {/*    )}*/}
                                    {/*    ghost*/}
                                    {/*    activeKey={activeKey}*/}
                                    {/*    onChange={handleCollapseChange}*/}
                                    {/*    items={[*/}
                                    {/*        {*/}
                                    {/*            key: '1',*/}
                                    {/*             children: <p>*/}
                                    {/*                <div className="-mt-10 md:basis-1/5 p-2">*/}
                                    {/*                    <Card*/}
                                    {/*                        hoverable*/}
                                    {/*                        style={{*/}
                                    {/*                            width: 209,*/}
                                    {/*                        }}*/}
                                    {/*                        actions={[*/}
                                    {/*                            <div className="flex gap-1 justify-center">*/}
                                    {/*                                <span>4.5</span>*/}
                                    {/*                                <StarFilled className="text-yellow-500"/>*/}

                                    {/*                            </div>,*/}
                                    {/*                            <div>287 <span className="text-xs">đơn hàng</span>*/}
                                    {/*                            </div>,*/}
                                    {/*                        ]}*/}
                                    {/*                    >*/}
                                    {/*                        <div className="flex flex-row p-2 pb-2 items-center gap-2">*/}
                                    {/*                            <Avatar size="large"*/}
                                    {/*                                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>*/}
                                    {/*                            <div*/}
                                    {/*                                className="overflow_css text-neutral-700 text-base font-sans"> Phạm*/}
                                    {/*                                Thành Chunng hàng nnnnnnnnnnn*/}
                                    {/*                            </div>*/}
                                    {/*                        </div>*/}
                                    {/*                    </Card>*/}

                                    {/*                </div>*/}
                                    {/*            </p>,*/}
                                    {/*        },*/}
                                    {/*    ]}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};

export default Home;

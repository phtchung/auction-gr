import SideBar from "../../Components/SideBar/index.jsx";
import {useEffect, useState} from "react";
import { Button, Input } from "@material-tailwind/react";
import ProductBiddingCpn from "../../Components/ProductBiddingCpn/productBiddingCpn.jsx";
import useProductBidding from "./useProductBidding.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Spin} from "antd";
import { useInView } from 'react-intersection-observer';

const ProductBidding = () => {
  const [email, setEmail] = useState("");
  const { isLoading, isSuccess, data,isError,fetchNextPage ,isFetchingNextPage } = useProductBidding();
  const onChange = ({ target }) => setEmail(target.value);
    console.log(data?.pages[0].data?.data)

    const { ref, inView } = useInView();

    useEffect(() => {
        console.log(inView)
        if (inView) {
            console.log('aaa' +
                '')
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
                            type="email"
                            style={{backgroundColor: "#eaeaea"}}
                            value={email}
                            onChange={onChange}
                            placeholder="Bạn có thể tìm kiếm theo tên hoặc mã sản phẩm"
                            className="pr-30 pl-5"
                        />
                        <Button
                            size="sm"
                            className={`!absolute right-1 top-1 rounded ${
                                email ? "bg-blue-800" : "bg-gray-400"
                            }`}
                        >
                            Search
                        </Button>
                    </div>

                    {isLoading ?
                        <>
                            <Spin className="text-center mt-60"  tip="Loading"/>
                        </>
                        :
                        isSuccess ?
                            <>
                                {data.pages.map((page) => (
                                    <>
                                        {page.data.data.map((item, index) => (
                                            <>
                                                <div className={index !== 0 ? "mt-3" : ""}>
                                                    <ProductBiddingCpn key={item._id} data={item}/>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                ))}
                                <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
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
  );
};

export default ProductBidding;

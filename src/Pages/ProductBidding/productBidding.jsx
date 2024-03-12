import SideBar from "../../Components/SideBar/index.jsx";
import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import ProductBiddingCpn from "../../Components/ProductBiddingCpn/productBiddingCpn.jsx";
import useProductBidding from "./useProductBidding.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";

const ProductBidding = () => {
  const [email, setEmail] = useState("");
  const { isLoading, isSuccess, biddingList } = useProductBidding();
  const onChange = ({ target }) => setEmail(target.value);
  return (
    <>
        <MainLayOut>
            <div className="wrapper">
                <SideBar/>
                <div className="home-right ">
                    {isSuccess && (
                        <>
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

                            {biddingList &&
                                biddingList.map((item) => (
                                    <ProductBiddingCpn key={item.id} data={item}/>
                                ))}
                        </>
                    )}
                </div>
            </div>
        </MainLayOut>

    </>
  );
};

export default ProductBidding;

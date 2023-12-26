import SideBar from "../../Components/SideBar/index.jsx";
import {useState} from "react";
import {Button, Input} from "@material-tailwind/react";
import AuctionHistoryCpn from "../../Components/AuctionHistoryCpn/auctionHistoryCpn.jsx";


const AuctionHistory = () => {
    const [email, setEmail] = useState("");
    const onChange = ({ target }) => setEmail(target.value);
    return (
        <>
            <div className="wrapper">
                <SideBar/>
                <div className="home-right ">
                    <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
                        Lịch sử đấu giá
                    </div>
                    <div className="border-b border-neutral-300 "></div>
                    <div className="relative flex w-full ">
                        <Input
                            type="email"
                            style={{backgroundColor: '#eaeaea'}}
                            value={email}
                            onChange={onChange}
                            placeholder="Bạn có thể tìm kiếm theo tên hoặc mã sản phẩm"
                            className="pr-30 pl-5"
                            containerProps={{
                                className: "min-w-0",
                            }}
                        />
                        <Button
                            size="sm"
                            className={`!absolute right-1 top-1 rounded ${email ? 'bg-black' : 'bg-gray-400'}`}
                        >
                            Search
                        </Button>
                    </div>


                    <AuctionHistoryCpn/>



                </div>
            </div>
        </>
    )
}

export default AuctionHistory;

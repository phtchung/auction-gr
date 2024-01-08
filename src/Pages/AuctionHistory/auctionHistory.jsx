import SideBar from "../../Components/SideBar/index.jsx";
import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import AuctionHistoryCpn from "../../Components/AuctionHistoryCpn/auctionHistoryCpn.jsx";
import Header from "../../Components/Header/header.jsx";
import useAuctionHistory from "./useAuctionHistory.jsx";

const AuctionHistory = () => {
  const [search, setSearch] = useState("");
  const { aucHistoryData, isLoading, isSuccess } = useAuctionHistory();
  console.log(aucHistoryData);
  const onChange = ({ target }) => setSearch(target.value);
  return (
    <>
      <Header />
      <div className="wrapper">
        <SideBar />
        <div className="home-right ">
          <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
            Lịch sử đấu giá
          </div>
          <div className="border-b border-neutral-300 "></div>
          <div className="relative flex w-full ">
            <Input
              type="search"
              style={{ backgroundColor: "#eaeaea" }}
              value={search}
              onChange={onChange}
              placeholder="Bạn có thể tìm kiếm theo tên hoặc mã sản phẩm"
              className="pr-30 pl-5"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              className={`!absolute right-1 top-1 rounded ${
                search ? "bg-black" : "bg-gray-400"
              }`}
            >
              Search
            </Button>
          </div>

          {isSuccess &&
            aucHistoryData.map((data) => (
              <AuctionHistoryCpn key={data.id} data={data} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AuctionHistory;

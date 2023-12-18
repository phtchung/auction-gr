import {colAuctionWin, rowAuctionWin} from "../../Utils/constant.js";
import AuctionTable from "../AuctionTable/auctionTable.jsx";


const ListAuctionWinning = () => {

    return(
        <>
            <div className="border border-gray-300">

                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                    <div className="text-left font-medium my-2 ">
                        List - Auction Winning
                    </div>
                </div>

                <div className="border-b-2 border-gray-300 "></div>
                <AuctionTable cols={colAuctionWin} rows={rowAuctionWin}></AuctionTable>
            </div>
        </>
    )
}

export default ListAuctionWinning;

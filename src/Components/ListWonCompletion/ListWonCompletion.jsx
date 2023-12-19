import {rowsSuccess,colSuccess} from "../../Utils/constant.js";
import AuctionTable from "../AuctionTable/auctionTable.jsx";
const ListWonCompletion = () => {

    return(
        <>
            <div className="border border-gray-300">
                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                    <div className="text-left font-medium my-2 ">
                        List - Won Success
                    </div>
                </div>
                <div className="border-b-2 border-gray-300 "></div>
                <AuctionTable cols={colSuccess} rows={rowsSuccess}></AuctionTable>

            </div>
        </>
    )
}

export default ListWonCompletion;

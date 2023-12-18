import {rowConfirm,colConfirm} from "../../Utils/constant.js";
import TableData from "../TableData/TableData.jsx";

const ListConfirm = () => {

    return(
        <>
            <div className="border border-gray-300">
                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                    <div className="text-left font-medium my-2 ">
                        List - Confirm
                    </div>
                </div>

                <div className="border-b-2 border-gray-300 "></div>
                <TableData cols={colConfirm} rows={rowConfirm}></TableData>
            </div>
        </>
    )
}
export default ListConfirm;

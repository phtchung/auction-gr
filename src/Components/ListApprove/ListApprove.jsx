import {columns1, rows1} from "../../Utils/constant.js";
import TableData from "../TableData/TableData.jsx";

const ListApprove = () => {

    return (
        <>
            <div className="border border-gray-300">

                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                    <div className="text-left font-medium my-2 ">
                        List - Approved
                    </div>
                </div>

                <div className="border-b-2 border-gray-300 "></div>
                <TableData cols={columns1} rows={rows1}></TableData>
            </div>
        </>
    )
}

export default ListApprove;

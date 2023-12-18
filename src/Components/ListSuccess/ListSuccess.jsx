import {rowsSuccess,colSuccess} from "../../Utils/constant.js";
import TableData from "../TableData/TableData.jsx";
const ListSuccess = () => {

    return(
        <>
            <div className="border border-gray-300">
                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                    <div className="text-left font-medium my-2 ">
                        List - Success
                    </div>
                </div>
                <div className="border-b-2 border-gray-300 "></div>
                <TableData cols={colSuccess} rows={rowsSuccess}></TableData>

            </div>
        </>
    )
}

export default ListSuccess;

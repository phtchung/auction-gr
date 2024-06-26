import SideBar from "../../Components/SideBar/index.jsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import useRequestHistory from "./useRequestHistory.jsx";
import {useState} from "react";
import {colReqHistory, pathReqHistory} from "../../Utils/constant.js";
import TableDataHistory from "../../Components/TableDataHistory/TableDataHistory.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";

const RequestHistory = () => {
    const [filter, setFilter] = useState({});
    const navigate = useNavigate();
    const {
        reqHistoryData,
        isLoading,
        isSuccess,
        total,
        queryString,
        setQueryString,
    } = useRequestHistory();
    console.log(reqHistoryData);

    const handleFilter = (key, value) => {
        setFilter({...filter, [key]: value});
    };
    const onSubmit = () => {
        const params = {
            ...queryString,
            ...filter,
        };
        setQueryString(params);
    };

    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <SideBar/>
                    <div className="home-right">
                        <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
                            Lịch sử yêu cầu
                        </div>
                        <div className="border-b border-neutral-300 "></div>
                        <div className="bg-white p-3 grid grid-cols-5 items-center border-gray-300 border h-28 text-sm  justify-around">
                            <div className="font-medium text-base p-3 ">Tìm kiếm ngày :</div>
                            <div className="col-span-3 ">
                                <div className="grid grid-cols-2">
                                    <LocalizationProvider
                                        dateFormats="fullDate"
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            defaultValue={dayjs(new Date()).subtract(7, "day")}
                                            sx={{
                                                margin: 2,
                                                "& .MuiInputBase-input": {width: 200, fontSize: 13, padding : '8px'},
                                            }}
                                            onChange={(newValue) =>
                                                handleFilter("start_time", newValue.toISOString())
                                            }
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider
                                        dateFormats="fullDate"
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            defaultValue={dayjs(new Date())}
                                            sx={{
                                                margin: 2,
                                                "& .MuiInputBase-input": {width: 200, fontSize: 13, padding : '8px'},
                                            }}
                                            onChange={(newValue) =>
                                                handleFilter("finish_time", newValue.toISOString())
                                            }
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={onSubmit}
                                    className="px-6 right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-semibold focus:outline-0">
                                    Tìm kiếm
                                </button>
                            </div>

                        </div>
                        {isSuccess && (
                            <>
                                <div className="bg-white border-gray-300 border p-2 mt-6  h-24">
                                    <table style={{width: "100%"}}>
                                        <thead>
                                        <tr
                                            className="text-neutral-700 text-base "
                                            style={{
                                                borderBottom: "1px solid #e5e7eb",
                                                height: 40,
                                            }}
                                        >
                                            <th className="font-medium">Tổng số yêu cầu</th>
                                            <th className="font-medium">Đã duyệt</th>
                                            <th className="font-medium">Đang duyệt</th>
                                            <th className="font-medium">Từ chối</th>
                                        </tr>
                                        </thead>
                                        <tbody className="font-semibold">
                                        <tr style={{height: 40, fontSize: 18}}>
                                            <td className="cursor-pointer">{total.total_request}</td>
                                            <td>{total.total_approved}</td>
                                            <td>{total.total_pending}</td>
                                            <td>{total.total_rejected}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                        {/*table data*/}
                        {isSuccess && (
                            <>
                                <div className="border border-gray-300 mt-6 ">

                                    <TableDataHistory path={pathReqHistory} cols={colReqHistory}
                                                      rows={reqHistoryData}></TableDataHistory>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </MainLayOut>

        </>
    );
};

export default RequestHistory;

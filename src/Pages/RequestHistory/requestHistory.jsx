import SideBar from "../../Components/SideBar/index.jsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {Button} from "@material-tailwind/react";

import {useNavigate} from "react-router-dom";
import Header from "../../Components/Header/header.jsx";
import useRequestHistory from "./useRequestHistory.jsx";
import {useState} from "react";
import {colReqHistory, pathReqHistory} from "../../Utils/constant.js";
import TableDataHistory from "../../Components/TableDataHistory/TableDataHistory.jsx";

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
            <Header/>
            <div className="wrapper">
                <SideBar/>
                <div className="home-right">
                    <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
                        Lịch sử yêu cầu
                    </div>
                    <div className="border-b border-neutral-300 "></div>
                    <div className="bg-white p-3 m-7 border-gray-300 border h-28 text-sm gap-7 justify-around flex">
                        <div className="font-medium text-xs p-3 ">Tìm kiếm ngày :</div>
                        <div className="flex-col ">
                            <LocalizationProvider
                                dateFormats="fullDate"
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker
                                    defaultValue={dayjs(new Date()).subtract(7, "day")}
                                    sx={{
                                        margin: 3,
                                        "& .MuiInputBase-input": {width: 150, fontSize: 12},
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
                                        margin: 3,
                                        "& .MuiInputBase-input": {width: 150, fontSize: 12},
                                    }}
                                    onChange={(newValue) =>
                                        handleFilter("finish_time", newValue.toISOString())
                                    }
                                />
                            </LocalizationProvider>
                        </div>
                        <Button
                            onClick={onSubmit}
                            size="md"
                            className="bg-blue-800 ml-auto h-9 py-2 rounded m-2 mt-5 px-4"
                        >
                            Search
                        </Button>
                    </div>
                    {isSuccess && (
                        <>
                            <div className="bg-white border-gray-300 border p-2 m-7 text-sm h-24">
                                <table style={{width: "100%"}}>
                                    <thead>
                                    <tr
                                        style={{
                                            borderBottom: "1px solid #e5e7eb",
                                            height: 40,
                                            fontSize: 12,
                                        }}
                                    >
                                        <th>Tổng số yêu cầu</th>
                                        <th>Đã duyệt</th>
                                        <th>Đang duyệt</th>
                                        <th>Từ chối</th>
                                    </tr>
                                    </thead>
                                    <tbody className="font-light">
                                    <tr style={{height: 40, fontSize: 14}}>
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
                        <div className="border border-gray-300 mt-6 mx-7">

                          <TableDataHistory path={pathReqHistory} cols={colReqHistory} rows={reqHistoryData}></TableDataHistory>
                        </div>
                      </>
                  )}
                </div>
            </div>
        </>
    );
};

export default RequestHistory;

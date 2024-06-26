import SideBar from "../../Components/SideBar/index.jsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import useSaleHistory from "./useSaleHistory.jsx";
import TableDataHistory from "../../Components/TableDataHistory/TableDataHistory.jsx";
import {colSaleHistory, pathSaleHistory} from "../../Utils/constant.js";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";

const SaleHistory = () => {
    const [filter, setFilter] = useState({});
    const {
        saleHistoryData,
        isLoading,
        isSuccess,
        total,
        queryString,
        setQueryString,
    } = useSaleHistory();
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
                        <div className="text-left px-5 pt-3 pb-3 text-xl  font-bold text-neutral-600  bg-white">
                            Lịch sử bán
                        </div>
                        <div className="border-b border-neutral-300 "></div>
                        <div className="bg-white p-3 grid grid-cols-5 items-center gap-3 border-gray-300 border h-28 text-sm  justify-around">
                            <div className="font-medium text-base p-3 ">Tìm kiếm ngày :</div>
                            <div className="col-span-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <LocalizationProvider
                                        dateFormats="fullDate"
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            defaultValue={dayjs(new Date()).subtract(7, "day")}
                                            sx={{
                                                margin: 2,
                                                "& .MuiInputBase-input": {width: 200, fontSize: 13, padding : 8},
                                            }}
                                            onChange={(newValue) =>
                                                handleFilter(
                                                    "start_time",
                                                    newValue.startOf("day").toISOString(),
                                                )
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
                                                "& .MuiInputBase-input": {width: 200, fontSize: 13, padding : 8},
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
                                <div className="bg-white text-neutral-800 font-medium border-gray-300 border p-2 mt-6 text-sm h-24">
                                    <table style={{width: "100%"}}>
                                        <thead>
                                        <tr
                                            className="text-neutral-600"
                                            style={{
                                                borderBottom: "1px solid #e5e7eb",
                                                height: 40,
                                            }}
                                        >
                                            <th>Tổng</th>
                                            <th>Tổng đơn</th>
                                            <th>Hoàn thành</th>
                                            <th>Thất bại</th>
                                            <th>Trả hàng</th>
                                        </tr>
                                        </thead>
                                        <tbody className="font-medium">
                                        <tr style={{height: 40, fontSize: 14}}>
                                            <td> Số lượng</td>
                                            <td>{total.total_sale}</td>
                                            <td>{total.total_completed}</td>
                                            <td>{total.total_failure}</td>
                                            <td>{total.total_return}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {isSuccess && (
                            <>
                                <div className="border border-gray-300 mt-6">
                                    <TableDataHistory path={pathSaleHistory} cols={colSaleHistory}
                                                      rows={saleHistoryData}></TableDataHistory>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};

export default SaleHistory;

import SideBar from "../../Components/SideBar/index.jsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Button } from "@material-tailwind/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/header.jsx";
import { useState } from "react";
import useSaleHistory from "./useSaleHistory.jsx";

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
  console.log(saleHistoryData);

  const handleFilter = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };
  const onSubmit = () => {
    const params = {
      ...queryString,
      ...filter,
    };
    setQueryString(params);
  };

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="wrapper">
        <SideBar />
        <div className="home-right">
          <div className="text-left px-5 pt-3 pb-3 text-xl font-semibold text-neutral-600  bg-white">
            Lịch Sử Bán
          </div>
          <div className="border-b border-neutral-300 "></div>
          <div className="bg-white p-3 m-7 h-28 text-sm gap-7 justify-around flex">
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
                    "& .MuiInputBase-input": { width: 150, fontSize: 12 },
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
                    margin: 3,
                    "& .MuiInputBase-input": { width: 150, fontSize: 12 },
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
              <div className="bg-white p-2 m-7 text-xs h-32">
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid #e5e7eb", height: 40 }}
                    >
                      <th>Tổng</th>
                      <th>Tổng đơn</th>
                      <th>Đã hoàn thành</th>
                      <th>Hủy</th>
                    </tr>
                  </thead>
                  <tbody className="font-light">
                    <tr
                      style={{
                        height: 40,
                        fontSize: 12,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <td> Số lượng</td>
                      <td>{total.total_sale}</td>
                      <td>{total.total_completed}</td>
                      <td>{total.total_cancel}</td>
                    </tr>
                    <tr style={{ height: 40, fontSize: 12 }}>
                      <td className="text-xs"> Tổng tiền</td>
                      <td>{total?.total_price_sale}</td>
                      <td>{total?.total_price_completed}</td>
                      <td>{total?.total_price_cancel}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {isSuccess && (
            <>
              <div className="bg-white p-3 m-7 ">
                <TableContainer>
                  <Table
                    sx={{
                      minWidth: 650,
                      "& .MuiTableCell-root": {
                        fontSize: 12,
                        cursor: "pointer",
                      },
                      "& .MuiTableRow-root": {
                        fontSize: 12,
                        cursor: "pointer",
                        "&:not(.MuiTableRow-head):hover": {
                          backgroundColor: "rgb(209, 213, 219)",
                        },
                      },
                    }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow className="font-bold">
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          Mã yêu cầu{" "}
                        </TableCell>
                        <TableCell align="center">Mã sản phẩm</TableCell>
                        <TableCell align="center">Tên sản phẩm</TableCell>
                        <TableCell align="center">Thành tiền </TableCell>
                        <TableCell align="center">Ngày hoàn thành</TableCell>
                        <TableCell align="center">Trạng thái </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {saleHistoryData.map((row) => (
                        <TableRow
                          onClick={() =>
                            navigate(
                              `/saleHistory/reqOrderDetail/${row.request_id}?status=${row.status}`,
                            )
                          }
                          key={row.productId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.request_id.slice(0, 14)}
                          </TableCell>
                          <TableCell align="center">
                            {row.productId.slice(0, 14)}
                          </TableCell>
                          <TableCell align="center">
                            {row.product_name}
                          </TableCell>
                          <TableCell align="center">
                            {row.final_price}
                          </TableCell>
                          <TableCell align="center">
                            {row.completed_at}
                          </TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                        </TableRow>
                      ))}

                      { saleHistoryData.length === 0 && <>
                        <tr>
                          <TableCell
                              align="center"
                              colSpan={6}
                              style={{
                                color: "dimgray",
                                fontWeight: "550",
                                fontSize: "12px",
                                padding:""
                              }}
                          >
                            Không có dữ liệu
                          </TableCell>
                        </tr>
                      </>}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          )}


        </div>
      </div>
    </>
  );
};

export default SaleHistory;

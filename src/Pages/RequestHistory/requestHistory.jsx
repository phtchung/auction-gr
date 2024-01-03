import SideBar from "../../Components/SideBar/index.jsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {Button} from "@material-tailwind/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate,} from "react-router-dom";
import Header from "../../Components/Header/header.jsx";
import useRequestHistory from "./useRequestHistory.jsx";
import {useState} from "react";

const RequestHistory = () => {

    const [filter, setFilter] = useState({});
    const navigate = useNavigate()
    const {reqHistoryData , isLoading , isSuccess,total, queryString , setQueryString} = useRequestHistory()
    console.log(reqHistoryData)

    const handleFilter = (key,value) => {
        setFilter({...filter,[key]:value})

    }
    const onSubmit = () => {
        const params = {
            ...queryString,
            ...filter}
        setQueryString(params)
    }

  return(
      <>
          <Header/>
          <div className="wrapper">
              <SideBar/>
              <div className="home-right">
                  <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
                      Lịch sử yêu cầu
                  </div>
                  <div className="border-b border-neutral-300 "></div>
                  <div className="bg-white p-3 m-7 h-28 text-sm gap-7 justify-around flex">
                      <div className="font-medium text-xs p-3 ">Tìm kiếm ngày :</div>
                      <div className="flex-col ">
                          <LocalizationProvider dateFormats="fullDate" dateAdapter={AdapterDayjs}>
                              <DatePicker defaultValue={dayjs(new Date()).subtract(7, 'day')}
                                          sx={{margin: 3, '& .MuiInputBase-input': {width: 150, fontSize: 12}}}
                                          onChange={(newValue) => handleFilter('start_time',newValue.toISOString())}

                              />
                          </LocalizationProvider>
                          <LocalizationProvider dateFormats="fullDate" dateAdapter={AdapterDayjs}>
                              <DatePicker defaultValue={dayjs(new Date())}
                                          sx={{margin: 3, '& .MuiInputBase-input': {width: 150, fontSize: 12}}}
                                          onChange={(newValue) => handleFilter('finish_time',newValue.toISOString())}

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
                  {
                      isSuccess && <>
                          <div className="bg-white p-2 m-7 text-sm h-24">
                              <table style={{width: '100%'}}>
                                  <thead>
                                  <tr style={{borderBottom: '1px solid #e5e7eb', height: 40, fontSize: 12}}>
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
                  }

                  {
                      isSuccess && <>
                          <div className="bg-white p-3 m-7 text-sm ">
                              <TableContainer>
                                  <Table sx={{
                                      minWidth: 650, '& .MuiTableCell-root': {fontSize: 12, cursor: 'pointer'},
                                      '& .MuiTableRow-root': {
                                          fontSize: 12,
                                          cursor: 'pointer',
                                          '&:not(.MuiTableRow-head):hover': {
                                              backgroundColor: 'rgb(209, 213, 219)',
                                          },
                                      }
                                  }} size="small" aria-label="a dense table">
                                      <TableHead>
                                          <TableRow className="font-bold">
                                              <TableCell sx={{fontWeight: 700}} align="center">Mã yêu cầu </TableCell>
                                              <TableCell align="center">Ngày yêu cầu</TableCell>
                                              <TableCell align="center">Tên sản phẩm</TableCell>
                                              <TableCell align="center">Chất lượng</TableCell>
                                              <TableCell align="center">Trạng thái </TableCell>
                                          </TableRow>
                                      </TableHead>
                                      <TableBody>
                                          {reqHistoryData.map((row) => (
                                              <TableRow
                                                  key={row.id}
                                                  onClick={() => navigate(`/reqHistory/reqHistoryDetail/${row.id}?status=${row.status}`)}
                                                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                              >
                                                  <TableCell component="th" scope="row" align="center">
                                                      {row.id.slice(0,14)}
                                                  </TableCell>
                                                  <TableCell align="center">{row.createdAt}</TableCell>
                                                  <TableCell align="center">{row.product_name}</TableCell>
                                                  <TableCell align="center">{row.rank}</TableCell>
                                                  <TableCell sx={{color:'red'}} align="center">{row.status === 1 ? 'Đang duyệt' : row.status === 2 ? 'Đã duyệt' : 'Từ chối'}</TableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                              </TableContainer>
                          </div>
                      </>
                  }

              </div>
          </div>
      </>
  )
}


export default RequestHistory;

import SideBar from "../../Components/SideBar/index.jsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {Button} from "@material-tailwind/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";


const SaleHistory = () => {
    function createData(name, calories, fat, carbs, protein,a) {
        return { name, calories, fat, carbs, protein,a };
    }

    const navigate = useNavigate()

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0,1),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3,2),
        createData('Eclair', 262, 16.0, 24, 6.0,5),
        createData('Cupcake', 305, 3.7, 67, 4.3,3),
        createData('Gingerbread', 356, 16.0, 49, 3.9,3),
    ];
    return(
        <>
            <div className="wrapper">
                <SideBar/>
                <div className="home-right">
                    <div className="text-left px-5 pt-3 pb-3 text-xl font-semibold text-neutral-600  bg-white">
                        Lịch Sử Bán</div>
                    <div className="border-b border-neutral-300 "></div>
                    <div className="bg-white p-3 m-7 h-28 text-sm gap-7 justify-around flex">
                        <div className="font-medium text-xs p-3 ">Tìm kiếm ngày :</div>
                        <div className="flex-col ">
                                <LocalizationProvider dateFormats="fullDate" dateAdapter={AdapterDayjs}>
                                    <DatePicker  defaultValue={dayjs('2022-04-17')}
                                                 sx={{margin:3, '& .MuiInputBase-input':{width:150,fontSize:12}}}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateFormats="fullDate" dateAdapter={AdapterDayjs}>
                                    <DatePicker  defaultValue={dayjs('2022-04-17')}
                                                 sx={{margin:3, '& .MuiInputBase-input':{width:150,fontSize:12}}}
                                    />
                                </LocalizationProvider>
                        </div>
                        <Button
                            size="md"
                            className="bg-blue-800 ml-auto h-9 py-2 rounded m-2 mt-5 px-4"
                        >
                            Search
                        </Button>
                    </div>
                    <div className="bg-white p-2 m-7 text-xs h-32">
                        <table style={{width:'100%'}}>
                            <thead  >
                            <tr style={{borderBottom: '1px solid #e5e7eb', height: 40}}>
                                <th>Tổng</th>
                                <th>Tổng đơn </th>
                                <th>Đã hoàn thành</th>
                                <th>Hủy</th>
                            </tr>
                            </thead>
                            <tbody className="font-light">
                            <tr style={{height: 40, fontSize: 12,borderBottom: '1px solid #e5e7eb'}}>
                                <td> Số lượng </td>
                                {[6, 5, 1].map((item) => (
                                 <td key={item}>{item}</td>
                                ))}

                            </tr>
                            <tr style={{height: 40, fontSize: 12}}>
                                <td className="text-xs"> Tổng tiền</td>
                                <td>1.189.000</td>
                                <td>2</td>
                                <td>2</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white p-3 m-7 ">
                        <TableContainer>
                            <Table sx={{minWidth: 650 , '& .MuiTableCell-root':{fontSize:12, cursor:'pointer'},
                                '& .MuiTableRow-root': {
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    '&:not(.MuiTableRow-head):hover': {
                                        backgroundColor: 'rgb(209, 213, 219)',
                                    },
                                }}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow className="font-bold">
                                        <TableCell sx={{fontWeight:700}} align="center">Mã yêu cầu </TableCell>
                                        <TableCell align="center">Mã sản phẩm</TableCell>
                                        <TableCell align="center">Tên sản phẩm</TableCell>
                                        <TableCell align="center">Thành tiền </TableCell>
                                        <TableCell align="center">Ngày hoàn thành</TableCell>
                                        <TableCell align="center">Trạng thái </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            onClick={() => navigate(`/reqOrderDetail?state=8`)}
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
                                            <TableCell align="center">{row.carbs}</TableCell>
                                            <TableCell align="center">{row.protein}</TableCell>
                                            <TableCell align="center">{row.a}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SaleHistory;

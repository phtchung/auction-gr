import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const TableDataHistory = ({cols, rows,path}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{maxHeight: 800, backgroundColor: "#fff"}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {cols.map((column) => (
                                <TableCell
                                    align={"center"}
                                    style={{
                                        backgroundColor: "#f5f5f5",
                                        color: "dimgray",
                                        fontWeight: "550",
                                        fontSize: "14px",
                                        lineHeight: "17px",
                                    }}
                                    key={column.id}
                                >
                                    {column.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        key={row.id}
                                        style={{cursor: "pointer"}}

                                        onClick={() =>
                                            navigate(
                                                `${path}/${row.id}?status=${row.status}`,
                                            )
                                        }
                                    >
                                        {cols &&
                                            cols.map((column) => {
                                                let value = row[column.id];
                                                if (Number.isInteger(value) && column.id === 'status') {
                                                    value = value === 1
                                                        ? "Đang duyệt"
                                                        : row.status === 2
                                                            ? "Đã duyệt"
                                                            : "Từ chối";
                                                }
                                                return (
                                                    <TableCell
                                                        sx={{
                                                            width: "150px",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            fontSize: "13px",
                                                            "&:last-child": {
                                                                color: "red",
                                                            },

                                                        }}
                                                        style={{
                                                            color:'rgb(38 38 38)',
                                                            minWidth: "128px",
                                                            maxWidth: "240px",
                                                        }}
                                                        size="small"
                                                        align={"center"}

                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                    </TableRow>
                                );
                            })}
                        {rows.length === 0 && (
                            <>
                                <tr>
                                    <TableCell
                                        align="center"
                                        colSpan={cols.length}
                                        style={{
                                            color: "dimgray",
                                            fontWeight: "550",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Không có dữ liệu
                                    </TableCell>
                                </tr>
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
          <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              sx={{fontSize:'12px'}}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </>
    );
};

export default TableDataHistory;

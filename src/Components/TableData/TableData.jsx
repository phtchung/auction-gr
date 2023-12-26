import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

const TableData = ({cols , rows}) => {

    const navigate = useNavigate()
    // const [rowperpage, rowperpagechange] = useState(10);
    // const handlechangepage = (event, newpage) => {
    //     pagechange(newpage)
    // }
    // const handleRowsPerPage = (event) => {
    //     rowperpagechange(+event.target.value)
    //     pagechange(0);
    // }
    // const [page, pagechange] = useState(0);

  return(
      <>
          <TableContainer sx={{maxHeight: 800, backgroundColor:'#fff'}}>
              <Table  stickyHeader>
                  <TableHead >
                      <TableRow >
                          {cols.map((column) => (
                              <TableCell align={"center"}
                                         style={{
                                             backgroundColor: '#f5f5f5',
                                             color: 'dimgray',
                                             fontWeight: '550',
                                             fontSize: '12px',
                                             lineHeight: '16px',
                                         }}
                                         key={column.id}>{column.name}
                              </TableCell>
                          ))}
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows && rows
                          .map((row) => {
                              return (
                                  <TableRow hover key={row.id}
                                            style={{cursor:'pointer'}}
                                            onClick={() => navigate(`/reqOrderDetail?state=${row.status}`)}

                                  >
                                      {cols && cols.map((column) => {
                                          let value = row[column.id];
                                          return (
                                              <TableCell
                                                  sx={{
                                                      width:'150px',
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap',
                                                      fontSize:'12px'
                                                  }}
                                                  style={{
                                                      minWidth: '128px',
                                                      maxWidth:'240px'
                                                  }}
                                                  size="small" align={"center"}  key={value}>
                                                  {value}
                                              </TableCell>
                                          )
                                      })}
                                  </TableRow>
                              )
                          })}
                  </TableBody>
              </Table>
          </TableContainer>
          {/*<TablePagination*/}
          {/*    rowsPerPageOptions={[5, 10, 15]}*/}
          {/*    rowsPerPage={rowperpage}*/}
          {/*    page={page}*/}
          {/*    count={rowsSuccess.length}*/}
          {/*    component="div"*/}
          {/*    sx={{fontSize:'12px'}}*/}
          {/*    onPageChange={handlechangepage}*/}
          {/*    onRowsPerPageChange={handleRowsPerPage}*/}
          {/*>*/}
          {/*</TablePagination>*/}
      </>
  )
}

export default TableData

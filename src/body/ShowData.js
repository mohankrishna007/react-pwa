import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
  { label: 'SID', minWidth: 100 },
  { label: 'FNAME', minWidth: 100 },
  { label: 'LNAME', minWidth: 100 },
  { label: 'DOB', minWidth: 100 },
  { label: 'Residentstatus', minWidth: 100 },
  { label: 'Country', minWidth: 100 },
  { label: 'STAdress', minWidth: 100 },
  { label: 'City', minWidth: 100 },
  { label: 'State', minWidth: 100 },
  { label: 'Residencystatus', minWidth: 100 },
  { label: 'Zipcode', minWidth: 100 },
  { label: 'ETHE.ORG', minWidth: 100 },
  { label: 'GENDER', minWidth: 100 },
];

var rows = '';

export default function ShowData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    axios.get('https://collegeportfoliobackendnode.azurewebsites.net/student/getData').then((resp) => rows=resp)
  })

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Demographic Info
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Academic Info
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Financial Info
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Preferences Info
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Admissibility() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogs = () => {
    navigate("/admissibilitylogs", {
      state: {
        colleges: location.state.colleges,
      },
    });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ width: "90%", marginLeft: "4%" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">INSTITUTE NAME</StyledTableCell>
              <StyledTableCell align="center">
                ADMISSIBILITY 1
              </StyledTableCell>
              <StyledTableCell align="center">ADMISSIBILITY 2</StyledTableCell>
              <StyledTableCell align="center">ADMISSIBILITY 3</StyledTableCell>
              <StyledTableCell align="center">
              ADMISSIBILITY 4
              </StyledTableCell>
              <StyledTableCell align="center">ADMISSIBILITY 5</StyledTableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {data.map((inst) => (
              <StyledTableRow key={inst.NAME}>
                <StyledTableCell align="center">{inst.NAME}</StyledTableCell>
                <StyledTableCell align="center">
                  {inst.StudentPreference}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.WeatherGrade}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.CrimeGrade}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.TransportGrade}
                </StyledTableCell>
                <StyledTableCell align="center">{inst.Overall}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
      <Button onClick={handleLogs}> click to show Logs </Button>
    </div>
  );
}

export default Admissibility;

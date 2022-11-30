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
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Affordability() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleLogs = () => {
    navigate("/admissibilitylogs", {
      state: {
        colleges: location.state.colleges,
      },
    });
  };

  useEffect(() => {
    setData(location.state.data)
  }, [location]);


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
        <Button onClick={() => navigate(-1)}> <ArrowBackIcon /> BACK</Button>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">INSTITUTE NAME</StyledTableCell>
              <StyledTableCell align="center">EXPECTED FAMILY CONTRIBUTION</StyledTableCell>
              <StyledTableCell align="center">EXPECTED FAMILY CONTRIBUTION</StyledTableCell>
              <StyledTableCell align="center">AVERAGE INFLATION FEE</StyledTableCell>
              <StyledTableCell align="center">EXPECTED INCOME POSTGRADUATION</StyledTableCell>
              <StyledTableCell align="center">3 YEARS ROI</StyledTableCell>
              <StyledTableCell align="center">OVERALL GRADE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inst) => (
              <StyledTableRow key={inst.NAME}>
                <StyledTableCell align="center">{inst.NAME}</StyledTableCell>
                <StyledTableCell align="center">
                  {parseFloat(parseFloat(inst.ADMRATE)*100).toFixed(2)}%
                </StyledTableCell>
                <StyledTableCell align="center">
                {parseFloat(parseFloat(inst.ProbabilityOfAdmission)*100).toFixed(2)}%
                </StyledTableCell>
                <StyledTableCell align="center">
                 <b style={{ color: 'blue'}}>
                  {inst.MeanGrade}
                  </b>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleLogs}> click to show Logs </Button>
    </div>
  );
}

export default Affordability;
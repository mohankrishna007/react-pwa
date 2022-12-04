import { Button, IconButton, Tooltip } from "@mui/material";
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
import InfoIcon from "@mui/icons-material/Info";



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
    console.log(location.state.data);
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
              <StyledTableCell align="center">
                <Tooltip title={'EXPECTED FAMILY CONTRIBUTION'}>
                  <IconButton>
                    <span style={{color: 'white', fontSize: '0.6em'}}>EFC ENROLLMENT YEAR</span>
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Tooltip title={'EXPECTED FAMILY CONTRIBUTION'}>
                  <IconButton>
                    <span style={{color: 'white', fontSize: '0.6em'}}>EFC FULL UNDERGRADUATE PROGRAME</span>
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell align="center">AVERAGE FEE INFLATION</StyledTableCell>
              <StyledTableCell align="center">EXPECTED INCOME POSTGRADUATION</StyledTableCell>
              <StyledTableCell align="center">3 YEAR ROI</StyledTableCell>
              <StyledTableCell align="center">OVERALL GRADE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inst) => (
              <StyledTableRow key={inst.college.INSTNM}>
                 <StyledTableCell align="center">
                  <h6>
                    {inst.college.INSTNM}
                    <div style={{ fontSize: "0.5em" }}>
                      {inst.college.CITY}
                      {", "}
                      {inst.college.STATE_NAME}
                    </div>
                  </h6>
                </StyledTableCell>
                <StyledTableCell align="center">
                  ${inst.affordability.EFCENROLLMENTYEAR}
                </StyledTableCell>
                <StyledTableCell align="center">
                  ${inst.affordability.EFCFULLUNDERGRADUATE}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {parseFloat(parseFloat(inst.affordability.AVERAGEINFLATIONFEE) * 100).toFixed(2)}%
                </StyledTableCell>
                <StyledTableCell align="center">
                  ${inst.affordability.EXPECTEDINCOME}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title={inst.affordability.ROIPERCENT}>
                    <IconButton>
                      <span style={{color: 'black', fontSize: '0.6em'}}>{inst.affordability.ROIGRADE}</span>
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="center">
                 <b style={{ color: 'blue'}}>
                  {inst.affordability.OVERALLGRADE}
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

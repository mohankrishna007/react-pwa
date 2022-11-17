import { React, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';





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



function Affinitty() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    var token = JSON.parse(localStorage.getItem("token"));
    var col = location.state.colleges
    var req = {
      "userid": token.data,
      "colleges":col
    }

    axios
      .post("https://collegeportfoliobackendnode.azurewebsites.net/college/affinity", req)
      .then((resp) => setData(resp.data));

  }, [location.state.colleges]);

  return (
    <div>
      <div>
        <TableContainer
          component={Paper}
          style={{ width: "90%", marginLeft: "4%" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>INSTITUTE NAME</StyledTableCell>
                <StyledTableCell align="center">
                  STUDENT PREFRENCE GRADE
                </StyledTableCell>
                <StyledTableCell align="center">WEATHER GRADE</StyledTableCell>
                <StyledTableCell align="center">CRIME GRADE</StyledTableCell>
                <StyledTableCell align="center">
                  TRANPORTATION GRADE
                </StyledTableCell>
                <StyledTableCell align="center">OVERALL GRADE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((inst) => (
                <StyledTableRow key={inst.NAME}>
                  <StyledTableCell align="center">
                    {inst.NAME}
                  </StyledTableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
      <div>
        <TableContainer
          component={Paper}
          style={{ width: "90%", marginLeft: "4%" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>INSTITUTE NAME</StyledTableCell>
                <StyledTableCell align="center">
                  College Chorot
                </StyledTableCell>
                <StyledTableCell align="center">Grade Competitiveness</StyledTableCell>
                <StyledTableCell align="center">Student Testing Competitiveness</StyledTableCell>
                <StyledTableCell align="center">
                </StyledTableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((inst) => (
                <StyledTableRow key={inst.NAME}>
                  <StyledTableCell align="center">
                    {inst.NAME}
                  </StyledTableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
      </div>
        </div>
    </div>
  );
}

export default Affinitty;

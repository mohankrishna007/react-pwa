import { React, useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

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
  const location = useLocation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(location.state.data);
  }, [location]);

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ width: "90%", marginLeft: "4%" }}
      >
        <Button onClick={() => navigate(-1)}>
          {" "}
          <ArrowBackIcon /> BACK
        </Button>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">INSTITUTE NAME</StyledTableCell>
              <StyledTableCell align="center">
                STUDENT PREFRENCE GRADE
              </StyledTableCell>
              <StyledTableCell align="center">WEATHER GRADE</StyledTableCell>
              <StyledTableCell align="center">SAFETY GRADE</StyledTableCell>
              <StyledTableCell align="center">
                TRANPORTATION GRADE
              </StyledTableCell>
              <StyledTableCell align="center">OVERALL GRADE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inst) => (
              <StyledTableRow key={inst.college.UNITD}>
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
                  {inst.affinity.StudentPreference}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.affinity.WeatherGrade}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.affinity.CrimeGrade}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.affinity.TransportGrade}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b style={{ color: "blue" }}>{inst.affinity.Overall}</b>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Affinitty;

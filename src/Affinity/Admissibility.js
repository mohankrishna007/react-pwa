import * as Names from '../Constants/ReactQueryConsts';
import * as Functions from '../Queries/3AScores';

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
import { useQuery } from "react-query";
import { useState } from 'react';

function Admissibility() {
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

  useQuery(
    Names.Admissibility,
    () => Functions.getAdmissibilityScore(location.state.colleges),
    {
      onSuccess: (data) => {
        setData(data?.data);
      },
      onError: (error) => console.log("ERROR: " + error),
    }
  );

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
                COLLEGE COHORTS
              </StyledTableCell>
              <StyledTableCell align="center">STUDENT COMPETETITVE</StyledTableCell>
              <StyledTableCell align="center">MEAN GRADE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inst) => (
              <StyledTableRow key={inst.NAME}>
                <StyledTableCell align="center">{inst.NAME}</StyledTableCell>
                <StyledTableCell align="center">
                  {inst.CollegeCohorts}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.OverallCompetitive}
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

export default Admissibility;

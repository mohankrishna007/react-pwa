import { React, useState } from "react";

import * as Names from "../Constants/ReactQueryConsts";
import * as Functions from "../Queries/3AScores";

import * as PreloadNames from "../Constants/ReactQueryConsts";
import * as PreloadFunctions from "../PrefetchData/DataLoadFunctions";

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
import { useNavigate } from "react-router";
import { Button } from "@material-ui/core";
import { useQueries, useQuery, useQueryClient } from "react-query";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LinearProgress from "@mui/material/LinearProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCellOverAll = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
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

const token = localStorage.getItem("token");
axios.defaults.headers.common["auth-token"] = token;

function Threea() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [affinity, setAffinity] = useState([]);
  const [admissibility, setAdmissibility] = useState([]);
  const [affordability, setAffordability] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);

  const location = useLocation();
  const queryClient = useQueryClient();

  useQueries([
    {
      queryKey: Names.Affinity,
      queryFn: () => Functions.getAffinityScore(location.state.colleges),
      onSuccess: (data) => setAffinity(data?.data),
    },
    {
      queryKey: Names.Admissibility,
      queryFn: () => Functions.getAdmissibilityScore(location.state.colleges),
      onSuccess: (data) => setAdmissibility(data?.data),
    },
  ]);

  useQuery(PreloadNames.COLLEGES, PreloadFunctions.fetchColleges, {
    initialData: () => {
      var colleges = queryClient.getQueriesData(Names.COLLEGES)?.data;
      return { data: colleges };
    },
    onSuccess: (data) => {
      setColleges(data?.data);
    },
    onError: () => {
      console.log("Failed to Load Colleges Data");
    },
  });

  useEffect(() => {
    if (affinity.length !== 0 && admissibility.length !== 0) {
      var gradeData = [];
      for (let index = 0; index < location.state.colleges.length; index++) {
        gradeData.push({
          Name: filteredColleges[index].INSTNM,
          City: filteredColleges[index].CITY,
          State: filteredColleges[index].STATE_NAME,
          affinityTotal: affinity[index].Overall,
          admissibilityTotal: admissibility[index].MeanGrade,
          affordabilityTotal: "",
          Total: "",
        });
      }

      setData(gradeData);
    }
  }, [
    affinity,
    admissibility,
    location.state.colleges.length,
    filteredColleges,
  ]);

  useEffect(() => {
    var filtered = colleges.filter((array) =>
      location.state.colleges.some((filter) => filter.unitID === array.UNITID)
    );
    setFilteredColleges(filtered);
  }, [colleges, location.state.colleges]);

  const showAffinity = () => {
    if (affinity.length !== 0) {
      navigate("/affinity", {
        state: {
          data: affinity,
        },
      });
    }
  };

  const showAdmissibility = () => {
    if (admissibility.length !== 0) {
      navigate("/admissibility", {
        state: {
          data: admissibility,
        },
      });
    }
  };

  const showAffordability = () => {
    if (affordability.length !== 0) {
      navigate("/affordability", {
        state: {
          data: affordability,
        },
      });
    }
  };

  const handleAdmssibilityLogs = () => {
    navigate("/admissibilitylogs", {
      state: {
        colleges: location.state.colleges,
      },
    });
  };

  return (
    <div>
      <br />
      <TableContainer
        component={Paper}
        style={{ width: "90%", marginLeft: "4%" }}
      >
        {data.length === 0 ? <LinearProgress style={{ width: "100%" }} /> : ""}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> INSTITUTE NAME</StyledTableCell>
              <StyledTableCell align="center">
                <Button style={{ color: "white" }} onClick={showAffordability}>
                  AFFORDABILITY GRADE
                  <ArrowDownwardIcon fontSize="small" />
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button style={{ color: "white" }} onClick={showAdmissibility}>
                  ADMISSABILITY GRADE
                  <ArrowDownwardIcon fontSize="small" />
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button style={{ color: "white" }} onClick={showAffinity}>
                  AFFINITY GRADE
                  <ArrowDownwardIcon fontSize="small" />
                </Button>
              </StyledTableCell>
              <StyledTableCellOverAll align="center">
                OVER ALL GRADE
              </StyledTableCellOverAll>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inst) => (
              <StyledTableRow key={inst.Name}>
                <StyledTableCell align="center">
                  <h6>
                    {inst.Name}
                    <div style={{ fontSize: "0.5em" }}>
                      {inst.City}{" - "}{inst.State}
                    </div>
                  </h6>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.affordabilityTotal}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.admissibilityTotal}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.affinityTotal}
                </StyledTableCell>
                <StyledTableCellOverAll align="center">
                  <b style={{ color: "red" }}>{inst.Total}</b>
                </StyledTableCellOverAll>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleAdmssibilityLogs}>
        {" "}
        click to show Admissability Logs{" "}
      </Button>
    </div>
  );
}

export default Threea;

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
    {
      queryKey: Names.Affordability,
      queryFn: () => Functions.getAffordability(location.state.colleges),
      onSuccess: (data) => setAffordability(data?.data),
    }
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
    if (affordability.length !== 0 && affinity.length !== 0 && admissibility.length !== 0 && filteredColleges.length !== 0) {

      console.log(affordability)

      var data = [];
      var colleges = location.state.colleges;
      for (let index = 0; index < colleges.length; index++) {
         var college = filteredColleges.find(inst => inst.UNITID === colleges[index].unitID);
         var collegeAffinity = affinity.find(inst => inst.UNITID === colleges[index].unitID);
         var collegeAdmissibility = admissibility.find(inst => inst.UNITID === colleges[index].unitID);
         var collegeAffordability = affordability.find(inst => inst.UNITID === colleges[index].unitID);

        data.push({
          college: college,
          affinity: collegeAffinity,
          admissibility: collegeAdmissibility,
          affordability: collegeAffordability,
          Total: "",
        });
      }
      setData(data);
    }
  }, [affinity, admissibility, location.state.colleges.length, filteredColleges, location.state.colleges, affordability]);

  useEffect(() => {
    var filtered = colleges.filter((array) =>
      location.state.colleges.some((filter) => filter.unitID === array.UNITID)
    );
    setFilteredColleges(filtered);
  }, [colleges, location.state.colleges]);

  const showAffinity = () => {
    if (data.length !== 0) {
      navigate("/affinity", {
        state: {
          data: data,
        },
      });
    }
  };

  const showAdmissibility = () => {
    if (data.length !== 0) {
      navigate("/admissibility", {
        state: {
          data: data,
        },
      });
    }
  };

  const showAffordability = () => {
    if (data.length !== 0) {
      navigate("/affordability", {
        state: {
          data: data,
        },
      });
    }
  };

  const handleLogs = () => {
    navigate("/logs", {
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
                 <u> AFFORDABILITY GRADE</u>
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button style={{ color: "white" }} onClick={showAdmissibility}>
                  <u> ADMISSABILITY GRADE</u>
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button style={{ color: "white" }} onClick={showAffinity}>
                  <u> AFFINITY GRADE </u>
                </Button>
              </StyledTableCell>
              <StyledTableCellOverAll align="center">
                OVER ALL GRADE
              </StyledTableCellOverAll>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inst) => (
              <StyledTableRow key={inst.college.UNITD}>
                <StyledTableCell align="center">
                  <h6>
                    {inst.college.INSTNM}
                    <div style={{ fontSize: "0.5em" }}>
                      {inst.college.CITY}{", "}{inst.college.STATE_NAME}
                    </div>
                  </h6>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.affordability.OVERALLGRADE}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.admissibility.MeanGrade}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {inst.affinity.Overall}
                </StyledTableCell>
                <StyledTableCellOverAll align="center">
                  <b style={{ color: "red" }}>{".."}</b>
                </StyledTableCellOverAll>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleLogs}>
        click to show Logs
      </Button>
    </div>
  );
}

export default Threea;

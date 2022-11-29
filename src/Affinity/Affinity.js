import { React, useState } from "react";

import * as Names from '../Constants/ReactQueryConsts';
import * as Functions from '../Queries/3AScores';

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useLocation } from "react-router";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Drilldown from "highcharts/modules/drilldown";
import { useQuery } from "react-query";

if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
  Drilldown(Highcharts);
}
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

// var gradeLable = {
//   6: "A",
//   5: "A+",
//   4: "B",
//   3: "B+",
//   2: "C",
//   1: "C+",
// };

// const options = {
//   chart: {
//     type: "column",
//   },
//   title: {
//     align: "left",
//     text: "DATA GRADE FOR STUDENT",
//   },
//   xAxis: {
//     type: "category",
//   },
//   yAxis: {
//     title: {
//       useHTML: true,
//       text: "GRADES",
//     },
//     labels: {
//       formatter: function () {
//         var value = gradeLable[this.value];
//         return value !== "undefined" ? value : this.value;
//       },
//     },
//   },

//   series: [
//     {
//       name: "Score",
//       colorByPoint: true,
//       data: [
//         {
//           name: "AFFINITY",
//           y: 6,
//           drilldown: "affinity",
//         },
//         {
//           name: "ADIMISSIBILITY",
//           y: 6,
//           drilldown: "admissibilty",
//         },
//         {
//           name: "AFFORDABILITY",
//           y: 3,
//           drilldown: "affordability",
//         },
//       ],
//     },
//   ],
//   drilldown: {
//     breadcrumbs: {
//       position: {
//         align: "right",
//       },
//     },
//     series: [
//       {
//         name: "AFFINITY",
//         id: "affinity",
//         data: [
//           ["STUDENT PREFERENCE GRADE", 2],
//           ["TRANSPORTATION GRADE", 3],
//           ["WEATHER GRADE", 6],
//           ["CRIME GRADE", 5],
//         ],
//       },
//       {
//         name: "ADMISSIBILITY",
//         id: "admissibility",
//         data: [
//           ["STUDENT GRADE COMPETETITVE", 3],
//           ["STUDENT TESTING COMPETITVE", 6],
//           ["STUDENT ETHINIC AND ECONOMIC GRADE", 5],
//         ],
//       },
//       {
//         name: "AFFORDABILITY",
//         id: "affordabiliby",
//         data: [
//           ["Data1", 6],
//           ["Data2", 4],
//           ["data3", 5],
//         ],
//       },
//     ],
//   },
// };

const token = localStorage.getItem("token");
axios.defaults.headers.common["auth-token"] = token;

function Affinitty() {
  const location = useLocation();
  const [data, setData] = useState([]);

  useQuery(
    Names.Affinity,
    () => Functions.getAffinityScore(location.state.colleges),
    {
      onSuccess: (data) => {
        setData(data?.data);
      },
      onError: (error) => console.log("ERROR: " + error),
    }
  );

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
                  <StyledTableCell align="center"><b style={{ color: 'blue'}}>{inst.Overall}</b></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div> */}
    </div>
  );
}

export default Affinitty;

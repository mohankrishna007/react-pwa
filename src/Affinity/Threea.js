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
import { useLocation, useNavigate } from "react-router";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Drilldown from 'highcharts/modules/drilldown';
import { Button } from "bootstrap";

if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
    Drilldown(Highcharts);
}

const options = {
    chart: {
      type: "column"
    },
    title: {
      text: "CollegePortfolio"
    },
    yAxis: {
      yAxis: 0,
      categories: ['C', 'B-', 'B', 'B+', 'B','A+', 'A']
    },
    series: [
      {
        name: "DATA GRADES",
        colorByPoint: true,
        data: [
          {
            name: "AFFINITY",
            y: 5,
            drilldown: "affinity"
          },
          {
            name: "ADMISSABILITY",
            y: 2,
            drilldown: "admissability"
          },
          {
            name: "AFFORADABILITY",
            y: 4,
            drilldown: "afforadability"
          },
          {
            name: "COMPOSITE OF 3",
            y: 4,
            drilldown: "afforadability"
          }
        ]
      }
    ],
    drilldown: {
      series: [
        {
          id: "affinity",
          data: [["Student Preference", 4], ["Weather Grade", 2], ["Crime Grade", 1], ["Transportation Grade", 2]]
        },
        {
          id: "admissability",
          data: [
            {
              name: "Apples",
              y: 4,
              drilldown: "apple_id"
            },
            {
              name: "Oranges",
              y: 2
            }
           
          ]
        },
        {
          id: "apple_id",
          data: [
            {
              name: "Nested Apples",
              y: 5
            }
          ]
        },
        {
          id: "afforadability",
          data: [["Data1", 4], ["Data2", 2], ["Data3", 2]]
        }
      ]
    }
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

function Threea() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const location = useLocation();
  var req = null

  useEffect(() => {
    var token = JSON.parse(localStorage.getItem("token"));
    var col = location.state.colleges
    req = {
      "userid": token.data,
      "colleges":col
    }

    axios
      .post("https://collegeportfoliobackendnode.azurewebsites.net/college/affinity", req)
      .then((resp) => setData(resp.data));

  }, [location.state.colleges]);
 
 
  // Create the chart
// const options={
//     chart: {
//         type: 'column'
//     },
//     title: {
//         text: 'Basic drilldown'
//     },
//     xAxis: {
//         type: 'category'
//     },

//     legend: {
//         enabled: false
//     },

//     plotOptions: {
//         series: {
//             borderWidth: 0,
//             dataLabels: {
//                 enabled: true
//             }
//         }
//     }, 
//     series: [{
//         name: 'Things',
//         colorByPoint: true,
//         data: [{
//             name: 'Animals',
//             y: 5,
//             drilldown: 'animals'
//         }, {
//             name: 'Fruits',
//             y: 2,
//             drilldown: 'fruits'
//         }, {
//             name: 'Cars',
//             y: 4,
//             drilldown: 'cars'
//         }]
// }],
//     drilldown: {
//         series: [{
//             id: 'animals',
//             data: [
//                 ['Cats', 4],
//                 ['Dogs', 2],
//                 ['Cows', 1],
//                 ['Sheep', 2],
//                 ['Pigs', 1]
//             ]
//         }, {
//             id: 'fruits',
//             data: [
//                 ['Apples', 4],
//                 ['Oranges', 2]
//             ]
//         }, {
//             id: 'cars',
//             data: [
//                 ['Toyota', 4],
//                 ['Opel', 2],
//                 ['Volkswagen', 2]
//             ]
//         }]
//     }
// };


  return (
    <div>
      <div>
        <TableContainer
          component={Paper}
          style={{ width: "90%", marginLeft: "4%" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow onClick={() => navigate("/affinity", { state: { colleges: req.colleges}})}>
                <StyledTableCell align="center">INSTITUTE NAME</StyledTableCell>
                <StyledTableCell align="center">AFFINITY GRADE</StyledTableCell>
                <StyledTableCell align="center">ADMISSABILITY GRADE</StyledTableCell>
                <StyledTableCell align="center">AFFORDABILITY GRADE</StyledTableCell>
                <StyledTableCell align="center">COMPOSITE OF 3A GRADE</StyledTableCell>
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
                  
                  <StyledTableCell align="center">{inst.Overall}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
        <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
        </div>
      </div>
    </div>
  );
}

export default Threea;

import {
  Autocomplete,
  Checkbox,
  createTheme,
  IconButton,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit";
import RegisterTheme from "../Themes/RegisterTheme";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function DashBoard() {
  // var fileDownload = require("js-file-download");

  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [collegeName, setCollegeName] = useState([]);

  // const getStudentData = () => {
  //   axios
  //     .get(
  //       "https://collegeportfoliobackendnode.azurewebsites.net/student/getStudent/" +
  //         String(state.id)
  //     )
  //     .then((resp) => {
  //       for (let obj in resp.data) {
  //         fileDownload(JSON.stringify(resp.data[obj]), state.id + ".json");
  //       }
  //     });
  // };

  const showAffinity = () => {
    var colleges = [];
    collegeName.map((option) => colleges.push({ unitID: option.UNITID }));

    navigate("/affinity", {
      state: {
        colleges: colleges,
      },
    });
  };

  
  const showThreea = () => {
    var colleges = [];
    collegeName.map((option) => colleges.push({ unitID: option.UNITID }));

    navigate("/Threea", {
      state: {
        colleges: colleges,
      },
    });
  };

  
  React.useEffect(() => {
    axios
      .get(
        "https://collegeportfoliobackendnode.azurewebsites.net/student/colleges"
      )
      .then((resp) => setColleges(resp.data));
  }, []);

  return (
    <div>
      <ThemeProvider theme={createTheme(RegisterTheme)}>
        <MDBCard style={{ width: "80%", margin: "0 auto" }}>
          <MDBCardBody className="CardBody">
            <MDBRow>
              <MDBCol md="8">
                <Autocomplete
                  multiple
                  options={colleges}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.INSTNM}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.INSTNM}
                    </li>
                  )}
                  onChange={(event, value) => setCollegeName(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a College"
                      placeholder="Choose Colleges"
                    />
                  )}
                />
              </MDBCol>
              <MDBCol md="2">
                <IconButton onClick={() => showAffinity()}>
                  <SearchIcon />
                </IconButton>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="8">
                <Autocomplete
                  multiple
                  options={colleges}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.INSTNM}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.INSTNM}
                    </li>
                  )}
                  onChange={(event, value) => setCollegeName(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a College"
                      placeholder="Choose Colleges"
                    />
                  )}
                />
              </MDBCol>
              <MDBCol md="2">
                <IconButton onClick={() => showThreea()}>
                  <SearchIcon />
                </IconButton>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </ThemeProvider>
    </div>
  );
}

export default DashBoard;

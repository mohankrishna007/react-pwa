import {
  Autocomplete,
  Checkbox,
  createTheme,
  IconButton,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

import * as Functions from '../PrefetchData/DataLoadFunctions';
import * as Names from '../Constants/ReactQueryConsts';

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit";
import RegisterTheme from "../Themes/RegisterTheme";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useQuery } from "react-query";
import ListofColleges from "./ListofColleges";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function DashBoard() {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [collegeName, setCollegeName] = useState([]);
  
  const showThreea = () => {
    var colleges = [];
    collegeName.map((option) => colleges.push({ unitID: option.UNITID }));

    navigate("/Threea", {
      state: {
        colleges: colleges,
      },
    });
  };

  const handleLoadColleges = () => {
    var colleges = localStorage.getItem("colleges");
    setColleges(JSON.parse(colleges));
  }
  
  React.useEffect(() => {
    handleLoadColleges();
  }, []);

  return (
    <div>
      <ThemeProvider theme={createTheme(RegisterTheme)}>
        <MDBCard style={{ width: "80%", margin: "0 auto" }}>
          <MDBCardBody className="CardBody">
            <ListofColleges />
          </MDBCardBody>
        </MDBCard>
      </ThemeProvider>
    </div>
  );
}

export default DashBoard;

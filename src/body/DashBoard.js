import {
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

import React from "react";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import RegisterTheme from "../Themes/RegisterTheme";
import ListofColleges from "./ListofColleges";


function DashBoard() {
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

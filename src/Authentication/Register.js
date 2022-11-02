import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import {
  TextField,
  createTheme,
  ThemeProvider,
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";

import RegisterTheme from "../Themes/RegisterTheme";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = (props, ref) => {
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");

  const handleSubmit = async () => {
      setMessage("Please wait, we are creating account for you");
      setVariant("info")
      setShowAlert(false);

    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      var resp = await axios.post("http://localhost:5000/auth/register", data);
      console.log(JSON.stringify(resp.data));
      setMessage(resp.data.message);
      setVariant("success")
      setShowAlert(false);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        setVariant("error")
        setShowAlert(false);
      }
    }
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        style={{ width: "50%", margin: "0  auto" }}
      >
        <ThemeProvider theme={createTheme(RegisterTheme)}>
          <MDBCard>
            <MDBCardTitle>
              <Typography style={{ textAlign: "center", margin: "10px" }}>
                {" "}
                Create Account{" "}
              </Typography>
            </MDBCardTitle>
            <MDBCardBody className="px-4 CardBody">
              <MDBRow>
                <MDBCol md="12">
                  <TextField
                    label="Username"
                    value={username}
                    type="text"
                    variant="outlined"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <TextField
                    label="Email"
                    value={email}
                    type="email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <TextField
                    label="Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </MDBCol>
              </MDBRow>
              <Alert variant="filled" severity={variant} hidden={showAlert}>
                {message}
              </Alert>
            </MDBCardBody>
            <MDBCardFooter>
              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: "green", color: "white" }}
                fullWidth
              >
                Register{" "}
              </Button>
              <p>
                <Link to="/login">Already signed?</Link>
              </p>
            </MDBCardFooter>
          </MDBCard>
        </ThemeProvider>
      </Box>
    </div>
  );
};

export default Register;

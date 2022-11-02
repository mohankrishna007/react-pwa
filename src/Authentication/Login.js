import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter } from "mdb-react-ui-kit";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");


  const navigate = useNavigate();

  const handleSubmit = async () => {

    const credentials = {
        email: email,
        password: password,
    }

    try {
        var resp = await axios.post("http://localhost:5000/auth/login", credentials);
			  localStorage.setItem("token", JSON.stringify(resp.data));
        console.log(JSON.stringify(resp.data));
        navigate("/");
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
          setVariant("info")
          setShowAlert(false);
        }
      }
  };

  return (
    <div>
      <Box component="form" noValidate autoComplete="off" style={{width: '50%', margin:'0  auto'}}>
        <ThemeProvider theme={createTheme(RegisterTheme)}>
          <MDBCard>
            <MDBCardTitle>
                <Typography style={{textAlign: 'center', margin: '10px'}}> Sign In</Typography>
            </MDBCardTitle>
            <MDBCardBody className="px-4 CardBody">
              <MDBRow>
                <MDBCol md="12">
                  <TextField
                    label="Email"
                    value={email}
                    type="text"
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
                <Button onClick={handleSubmit} style={{backgroundColor: 'green', color: 'white'}} fullWidth> Login In</Button>
                <p><Link to='/register'>New user? SignUp here</Link></p>
            </MDBCardFooter>
          </MDBCard>
        </ThemeProvider>
      </Box>
    </div>
  );
};

export default Login;

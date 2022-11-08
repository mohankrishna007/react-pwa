import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterTheme from "../Themes/RegisterTheme";
import {
  Alert,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { ValidationGroup, Validate, AutoDisabler } from "mui-validate";

export default function Register() {
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [hideAlert, setHideAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");
  const [resetted, setResetted] = React.useState(false);

  const param = useParams();
  const navigate = useNavigate();

  const [clickSubmit, setClickSubmit] = React.useState(false);

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var form = {
      password: data.get("password"),
    };

    setClickSubmit(true);

     try {
      const url = `https://collegeportfoliobackendnode.azurewebsites.net/auth/reset/${param.id}/${param.token}`;
      var resp = await axios.post(url, form);
      console.log(resp)
      setMessage('Password Updated Succesfully')
      setHideAlert(false);
      setVariant('success');
      setResetted(true)
    } catch (error) {
      console.log(error.response)
      setMessage(error.response.data.message)
      setHideAlert(false);
      setVariant('error');
      setClickSubmit(false);
    }
  };

  return (
    <ThemeProvider theme={createTheme(RegisterTheme)}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Passowrd
          </Typography>
          <ValidationGroup>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Validate
                name="password"
                required={[true, "Password is required"]}
                regex={[
                  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  "Enter strong password",
                ]}
              >
                <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password1"
                    id="password1"
                    type={showPassword1 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Validate>

              <Validate
                name="passoword"
                required={[true, "Password is required"]}
                regex={[
                  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  "Enter strong password",
                ]}
              >
                <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    id="password"
                    type={showPassword2 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Validate>
              <br /><br/>
              <Alert severity={variant} hidden={hideAlert}>
                {message}
                <span
                  style={resetted ? { display: "block" } : { display: "none" }}
                  onClick={() => navigate('/login')}
                >Login
                </span>
              </Alert>
              <AutoDisabler>
                <Button
                  type="submit"
                  fullWidth
                  disabled={clickSubmit}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </AutoDisabler>
            </Box>
          </ValidationGroup>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

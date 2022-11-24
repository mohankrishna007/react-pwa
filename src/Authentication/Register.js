import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
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
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { ValidationGroup, Validate, AutoDisabler } from "mui-validate";

export default function Register() {
  const [message, setMessage] = React.useState("");
  const [hideAlert, setHideAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");


  const navigate = useNavigate();

  const [clickSubmit, setClickSubmit] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var form = {
      email: data.get("email"),
      password: data.get("password"),
    };

    setClickSubmit(true);
    try {
      var resp = await axios.post(
        "https://collegeportfoliobackendnode.azurewebsites.net/auth/register",
        form
      );
      console.log(JSON.stringify(resp.data));
      setMessage(resp.data.message);
      setVariant("success");
      setHideAlert(false);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        setVariant("error");
        setHideAlert(false);
        console.log(JSON.stringify(error.response.data));
        setClickSubmit(false);
      }
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
            Sign up
          </Typography>
          <ValidationGroup>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Validate
                name="Email"
                required={[true, "Email is required"]}
                regex={[
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  "Invalid Email",
                ]}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  autoFocus
                />
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
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Validate>
              <br /> <br/>
              <Alert severity={variant} hidden={hideAlert}>
                {message}
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
              <Grid container>
                <Grid item>
                  <span onClick={() => navigate('/login')} style={{cursor: "pointer", color: 'blue'}}>{"Already have an account? Login"}</span>
                </Grid>
              </Grid>
            </Box>
          </ValidationGroup>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

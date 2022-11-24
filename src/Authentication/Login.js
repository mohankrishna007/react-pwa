import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterTheme from "../Themes/RegisterTheme";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

export default function Login() {
  const [message, setMessage] = React.useState("");
  const [hideAlert, setHideAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");

  const [userMail, setUserMail] = React.useState("");
  const [sentMail, setSentMail] = React.useState(false);

  const navigate = useNavigate();

  const [clickSubmit, setClickSubmit] = React.useState(false);
  const [resetMessage, setResetMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSentMail(false);
    setUserMail("");
    setResetMessage("");
  };

  const handleResetMail = async () => {
    if (sentMail) {
      handleClose();
    } else {
      try {
        var data = {
          email: userMail,
        };
        var resp = await axios.post(
          "https://collegeportfoliobackendnode.azurewebsites.net/auth/resetpassword",
          data
        );
        setResetMessage("Password reset link sent.");
        console.log(resp);
      } catch (error) {
        if (error.response.status === 500) {
          setResetMessage("Reset Link sent already.");
        } else {
          setResetMessage("Password reset link sent.");
        }
        console.log(error.response);
      }
      setSentMail(true);
    }
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
        "https://collegeportfoliobackendnode.azurewebsites.net/auth/login",
        form
      );

      localStorage.setItem("token", resp.data.data.token);
      console.log(resp);
      localStorage.setItem("profile-filled", resp.data.data.profile);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
      setVariant("info");
      setHideAlert(false);
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
            Sign in
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <br />
              <Alert severity={variant} hidden={hideAlert}>
                {message}
              </Alert>
              <AutoDisabler>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={clickSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              </AutoDisabler>
              <Grid container>
                <Grid item xs>
                  <span
                    onClick={() => handleClickOpen()}
                    style={{ cursor: "pointer",color:'blue'}}
                  >
                    {"Forgot your info?"}
                  </span>
                </Grid>
                <Grid item>
                  <span onClick={() => navigate('/register')} style={{cursor: "pointer", color: 'blue'}}>{"Don't have an account? Register here"}</span>
                </Grid>
              </Grid>
            </Box>
          </ValidationGroup>
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <b>Please enter your registered email address</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If what you entered matches our records, we’ll send you an email soon to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
            variant="standard"
          />
          <br />
          <br />
          <Alert severity="info" hidden={!sentMail}>
            {resetMessage}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleResetMail}>
            {!sentMail ? "Send email" : "OK"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

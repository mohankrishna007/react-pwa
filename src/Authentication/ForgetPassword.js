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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
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
  const [userMail, setUserMail] = React.useState("");
  const [sentMail, setSentMail] = React.useState(false);
  const [resetMessage, setResetMessage] = React.useState("");


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
      password: data.get("password"),
    };

    setClickSubmit(true);

     try {
      const url = `https://collegeportfoliobackendnode.azurewebsites.net/auth/reset/${param.id}/${param.token}`;
      var resp = await axios.post(url, form);
      console.log(resp)
      setMessage('Password updated succesfully')
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
            Reset Password
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
                {(resetted)?(<Button onClick={() => navigate('/login')}>Login</Button>):(<Button onClick={() => handleClickOpen()}>Resend Link</Button>)}
              </Alert>
              <AutoDisabler>
                <Button
                  type="submit"
                  fullWidth
                  disabled={clickSubmit}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset
                </Button>
              </AutoDisabler>
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

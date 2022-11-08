import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterTheme from "../Themes/RegisterTheme";
import { MDBCard } from "mdbreact";
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";


export default function Login() {
  const [message, setMessage] = React.useState("");
  const [hideAlert, setHideAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");

  const [userMail, setUserMail] = React.useState("");
  const [sentMail, setSentMail] = React.useState(false);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState();
  const [clickSubmit, setClickSubmit] = React.useState(false);
  const [resetMessage, setResetMessage] = React.useState("");


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
    if(sentMail){
      handleClose();
    }else{
      try {
        var data = {
          email: userMail
        }
        var resp = await axios.post("https://collegeportfoliobackendnode.azurewebsites.net/auth/resetpassword", data);
        setResetMessage("Password reset link sent successfully");
        console.log(resp);
      } catch (error) {
        if(error.response.status === 500){
          setResetMessage("Reset Link sent already")
        }else{
          setResetMessage("Password reset link sent successfully")
        }
        console.log(error.response);
      }
      setSentMail(true);
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var form={
      email: data.get("email"),
      password: data.get("password"),
    };

    setClickSubmit(true);

    try {
      var resp = await axios.post(
        "https://collegeportfoliobackendnode.azurewebsites.net/auth/login",
        form
      );
      localStorage.setItem("token", JSON.stringify(resp.data));
      localStorage.setItem("remember", JSON.stringify(form.remember))
      console.log(JSON.stringify(resp.data));
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
      <MDBCard>
        <MDBCard>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
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
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <br/>
                <Alert severity={variant} hidden={hideAlert}>
                  {message}
                </Alert>
                <br/>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                     <span onClick={() => handleClickOpen()} style={{cursor: 'pointer'}}>{"Forget Password"}</span>
                  </Grid>
                  <Grid item>
                    <Link to='/login'>{"Don't have an account? Sign Up"}</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </MDBCard>
      </MDBCard>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><b>Please Enter Your Email</b></DialogTitle>
        <DialogContent>
          <DialogContentText>
              Password reset link will be sent to your email address.
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
          <br/><br/>
          <Alert severity="info" hidden={!sentMail}>{resetMessage}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleResetMail}>{(!sentMail)?"Send email": "OK"}</Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  );
}

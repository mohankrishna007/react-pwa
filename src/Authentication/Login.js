import React, { useRef, useState } from "react";
import { get, isEmpty, set } from "lodash-es";
import { FormBuilder } from "@jeremyling/react-material-ui-form-builder";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  ThemeProvider,
  createTheme,
  TextField
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { indigo, red } from "@mui/material/colors";
import axios from "axios";
import { useNavigate } from "react-router";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import RegisterTheme from "../Themes/RegisterTheme";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

async function validate(refs, form) {
  for (const [attribute, ref] of Object.entries(refs.current)) {
    var errors;
    if (ref.validate) {
      errors = await ref.validate(get(form, attribute));
    }
    if (!isEmpty(errors)) {
      console.log(errors);
      return false;
    }
  }
  return true;
}

export default function Login() {
  const [message, setMessage] = React.useState("");
  const [hideAlert, setHideAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");

  const [userMail, setUserMail] = React.useState("");
  const [sentMail, setSentMail] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState();
  const [clickSubmit, setClickSubmit] = React.useState(false);
  const [resetMessage, setResetMessage] = React.useState("");


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refs = useRef({});

  const updateForm = (updates) => {
    const copy = { ...form };
    for (const [key, value] of Object.entries(updates)) {
      set(copy, key, value);
    }
    setForm(copy);
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
        setResetMessage("Password reset link sent successfully ");
        console.log(resp);
      } catch (error) {
        setResetMessage("User Not Found");
        if(error.response.status === 500){
          setResetMessage("Reset Link sent already")
        }else{
          setResetMessage("User Not Found")
        }
        console.log(error.response);
      }
      setSentMail(true);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }

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
    console.log(form);
  };

  const fields = [
    {
      component: "custom",
      customComponent: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar style={{ backgroundColor: red[500], color: "white" }}>
            <LockOutlined />
          </Avatar>
        </div>
      ),
    },
    {
      component: "display-text",
      title: "Log In",
      titleProps: {
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      titleContainerProps: {
        style: {
          justifyContent: "center",
        },
      },
    },
    {
      attribute: "email",
      component: "text-field",
      label: "Email",
      props: {
        required: true,
      },
      validations: {
        required: true,
        email: true,
      },
    },
    {
      attribute: "password",
      component: "text-field",
      label: "Password",
      props: {
        type: showPassword ? "text" : "password",
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          style: {
            paddingRight: 0,
          },
        },
        required: true,
      },
      validations: {
        required: true,
        min: 8,
        matches: ["/[a-z]/i", "At least 1 lowercase or uppercase letter"],
        test: {
          name: "specialChar",
          test: (value) =>
            /[0-9~!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]/.test(value),
          message: "At least 1 number or special character",
        },
      },
    },
    {
      attribute: "remember",
      component: "checkbox-group",
      options: [
        {
          label: "Remember Me",
          value: true,
        },
      ],
      optionConfig: {
        key: "label",
        label: "label",
        value: "value",
      },
    },
  ];

  return (
    <ThemeProvider theme={createTheme(RegisterTheme)}>
      <MDBCard style={{ width: "80%", margin: "0 auto" }}>
        <MDBCardBody className="CardBody">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "60%" }}>
              <form onSubmit={handleSubmit}>
                <FormBuilder
                  fields={fields}
                  form={form}
                  updateForm={updateForm}
                  refs={refs}
                />
                <Alert severity={variant} hidden={hideAlert}>
                  {message}
                </Alert>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "8px" }}
                  disabled={clickSubmit}
                >
                  Log In
                </Button>
              </form>
              <div>
                <Button
                  onClick={() => handleClickOpen()}
                  style={{
                    textTransform: "initial",
                    marginTop: "16px",
                    color: indigo[500],
                  }}
                >
                  Forgot Password?
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => navigate("/register")}
                  style={{
                    textTransform: "initial",
                    color: indigo[500],
                  }}
                >
                  Don't have an account?
                </Button>
              </div>
            </div>
          </div>
        </MDBCardBody>
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
          <Button onClick={handleResetMail}>{(!sentMail)?"Send Mail": "OK"}</Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  );
}

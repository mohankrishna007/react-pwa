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
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { indigo, red } from "@mui/material/colors";
import axios from "axios";
import { useNavigate } from "react-router";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import RegisterTheme from "../Themes/RegisterTheme";

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

  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState();

  const refs = useRef({});

  const updateForm = (updates) => {
    const copy = { ...form };
    for (const [key, value] of Object.entries(updates)) {
      set(copy, key, value);
    }
    setForm(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }

    setMessage("Please wait, we are looking your account");
    setVariant("info");
    setHideAlert(false);

    try {
      var resp = await axios.post(
        "https://collegeportfoliobackendnode.azurewebsites.net/auth/login",
        form
      );
      localStorage.setItem("token", JSON.stringify(resp.data));
      console.log(JSON.stringify(resp.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
      setVariant("info");
      setHideAlert(false);
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
                >
                  Log In
                </Button>
              </form>
              <div>
                <Button
                  onClick={() => navigate('/forgetpassword')}
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
    </ThemeProvider>
  );
}

import React, { useRef, useState } from "react";
import { get, isEmpty, set } from "lodash-es";
import { FormBuilder } from "@jeremyling/react-material-ui-form-builder";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Alert,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useParams } from "react-router";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import RegisterTheme from "../Themes/RegisterTheme";
import { Link } from "react-router-dom";

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

export default function ForgetPassword() {

  const param = useParams();

  const [form, setForm] = useState({});
  const [showPassword1, setShowPassword1] = useState();
  const [showPassword2, setShowPassword2] = useState();
  const [clickSubmit, setClickSubmit] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [hideAlert, setHideAlert] = React.useState(true);
  const [variant, setVariant] = React.useState("info");
  const [resetted, setResetted] = React.useState(false);

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
    if (!ok || !(form.password1 === form.password2)) {
      return;
    }

    setClickSubmit(true);

    var data = {
      password: form.password1
    }
     try {
      const url = `https://collegeportfoliobackendnode.azurewebsites.net/auth/reset/${param.id}/${param.token}`;
      var resp = await axios.post(url, data);
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
      attribute: "password1",
      component: "text-field",
      label: "Enter New Password",
      props: {
        type: showPassword1 ? "text" : "password",
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <Visibility /> : <VisibilityOff />}
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
        attribute: "password2",
        component: "text-field",
        label: "Enter New Password Again",
        props: {
          type: showPassword2 ? "text" : "password",
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <Visibility /> : <VisibilityOff />}
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
          test:[
            {
              name: "Password matching",
              test: (value) => form.password1.match(value),
              message: "Passwords does not match",
            },
          ]
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
                <br/>
                <Alert severity={variant} hidden={hideAlert}>
                  {message}
                  <span style={resetted?{display: 'block'}: {display: 'none'}}><Link to='/login'>Login</Link></span>
                </Alert>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "8px" }}
                  disabled={clickSubmit}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </ThemeProvider>
  );
}
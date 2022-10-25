import React, { forwardRef, useImperativeHandle } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  Radio,
  MenuItem,
  RadioGroup,
  TextField,
  createTheme,
  ThemeProvider,
  Autocomplete,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Country, State } from "country-state-city";
import { MobileDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import RegisterTheme from "../../Themes/RegisterTheme";

const DemographicInformation = (props, ref) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dob, setDob] = React.useState(null);
  const [residencyStatus, setResidencyStatus] = React.useState("");
  const [country, setCountry] = React.useState("US");
  const [streetAddress, setStreetAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [stateName, setStateName] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [ethenicOrigin, setEthenicOrigin] = React.useState("");
  const [gender, setGender] = React.useState("");

  const [firstNameClicked, setFirstNameClicked] = React.useState(false);
  const [lastNameClicked, setLastNameClicked] = React.useState(false);
  const [dobClicked, setDobClicked] = React.useState(false);
  const [residencyStatusClicked, setResidencyStatusClicked] =
    React.useState(false);
  const [cityClicked, setCityClicked] = React.useState(false);
  const [zipCodeClicked, setZipCodeClicked] = React.useState(false);
  const [ethenicOriginClicked, setEthenicOriginClicked] = React.useState(false);
  const [genderClicked, setGenderClicked] = React.useState(false);

  useImperativeHandle(ref, () => ({
    postAboutStudent,
  }));

  const postAboutStudent = () => {
    const AboutStudent = {
      userId: props.UserId,
      FirstName: firstName,
      LastName: lastName,
      Dob: dob.$d,
      ResidentialStatus: residencyStatus,
      Country: country,
      StreetAddress: streetAddress,
      City: city,
      State: stateName,
      Zipcode: zipCode,
      EthenicOrigin: ethenicOrigin,
      Gender: gender,
    };

    console.log(AboutStudent);

    axios
      .post(
        "https://collegeportfoliobackendnode.azurewebsites.net/student/about",
        AboutStudent
      )
      .then((resp) => console.log(resp));
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
    setFirstNameClicked(true);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
    setLastNameClicked(true);
  };

  const handleResidencyStatus = (event) => {
    setResidencyStatus(event.target.value);
    if (event.target.value === 2) {
      document.getElementById("citenship_status").style.display = "block";
    } else {
      document.getElementById("citenship_status").style.display = "none";
      setCountry("US");
    }
    setResidencyStatusClicked(true);
  };

  const handleStreetAdress = (event) => {
    setStreetAddress(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
    setCityClicked(true);
  };

  const handleZipCode = (event) => {
    setZipCode(event.target.value);
    setZipCodeClicked(true);
  };

  const handleEthincOrigin = (event) => {
    setEthenicOrigin(event.target.value);
    setEthenicOriginClicked(true);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
    setGenderClicked(true);
  };

  const ethincOriginOptions = [
    { title: "Caucassian", value: 1 },
    { title: "African American", value: 2 },
    { title: "Hispanic", value: 3 },
    { title: "Two Or More Races", value: 4 },
    { title: "Unknown", value: 5 },
    { title: "Non Resident Alien/International", value: 6 },
    { title: "Asian", value: 7 },
    { title: "American Indian/Alaska Native", value: 8 },
    { title: "Native Hawaiian/Pacific Islander", value: 9 },
  ];

  React.useEffect(() => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      dob === null ||
      residencyStatus.length === 0 ||
      city.length === 0 ||
      state.length === 0 ||
      zipCode.length === 0 ||
      ethenicOrigin.length === 0 ||
      gender.length === 0
    ) {
      props.handleError(true);
    } else {
      props.handleError(false);
    }
  });

  

  return (
    <Box component="form" noValidate autoComplete="off">
      <ThemeProvider theme={createTheme(RegisterTheme)}>
        <MDBCard>
          <MDBCardBody className="px-4">
            <MDBRow>
              <MDBCol md="6">
                <TextField
                  error={((firstName.length === 0) & firstNameClicked)?true: false}
                  id="student-first-name"
                  label="Student's First Name"
                  value={firstName}
                  type="text"
                  variant="outlined"
                  onChange={handleFirstName}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </MDBCol>
              <MDBCol md="6">
                <TextField
                  error={((lastName.length === 0) & lastNameClicked)?true: false}
                  id="student-last-name"
                  label="Student's Last Name"
                  value={lastName}
                  onChange={handleLastName}
                  variant="outlined"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                      setDobClicked(true);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={((dob === null) & dobClicked)?true: false}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md={residencyStatus === 2 ? "5" : "12"}>
                <FormControl fullWidth>
                  <InputLabel id="residency-status-select-label" required>
                    Residency Status
                  </InputLabel>
                  <Select
                    error={((residencyStatus === null) & residencyStatusClicked)?true: false}
                    labelId="residency-status-select-label"
                    id="resideny-status-select"
                    label="residency Status"
                    value={residencyStatus}
                    onChange={handleResidencyStatus}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value={1}>
                      US Citizen or Permanent Resident
                    </MenuItem>
                    <MenuItem value={2}>International</MenuItem>
                  </Select>
                </FormControl>
              </MDBCol>
              <MDBCol md="7" style={{ display: "none" }} id="citenship_status">
                <Autocomplete
                  options={Country.getAllCountries()}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setCountry(value.isoCode);
                    setCityClicked(true);
                    setCity("");
                    setStreetAddress("");
                  }}
                  filterSelectedOptions
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <TextField
                  id="student-address-line1"
                  label="Residential Street Address"
                  value={streetAddress}
                  onChange={handleStreetAdress}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="4">
                <TextField
                  error={((city.length === 0) & cityClicked)?true: false}
                  value={city}
                  onChange={handleCity}
                  label="City"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </MDBCol>
              <MDBCol md="5">
                <Autocomplete
                  id="student-address-line1"
                  options={State.getStatesOfCountry(country)}
                  getOptionLabel={(option) =>
                    (option.name === "Entire US")?"" :option.name
                  }
                  onChange={(event, value) => {
                    setState(value.isoCode);
                    setStateName(value.name);
                  }}
                  filterSelectedOptions
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField 
                    {...params} 
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                    required label="State" />
                  )}
                />
              </MDBCol>
              <MDBCol md="3">
                <TextField
                  error={((zipCode.length === 0) & zipCodeClicked)?true: false}
                  label={residencyStatus === 2 ? "Postal Code" : "Zip Code"}
                  value={zipCode}
                  onChange={handleZipCode}
                  variant="outlined"
                  type="number"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="student-ethinic-origin-label" required>
                    Student's Ethinic Origin
                  </InputLabel>
                  <Select
                    error={((ethenicOrigin.length === 0) & ethenicOriginClicked)?true: false}
                    labelId="student-ethinic-origin-label"
                    value={ethenicOrigin}
                    label="StudentsEthinicOrigin"
                    onChange={handleEthincOrigin}
                    required
                    sx={{ mb: 2 }}
                  >
                    {ethincOriginOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl>
                  <FormLabel
                    id="gender-label"
                    required
                    error={((gender.length === 0) & genderClicked)?true: false}
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender-label"
                    name="row-radio-buttons-group"
                    value={gender}
                    onChange={handleGender}
                    sx={{ mb: 2 }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Not binary"
                      control={<Radio />}
                      label="Not Binary"
                    />
                    <FormControlLabel
                      value="Prefer Not to say"
                      control={<Radio />}
                      label="Prefer Not to Say"
                    />
                  </RadioGroup>
                </FormControl>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </ThemeProvider>
    </Box>
  );
};

export default forwardRef(DemographicInformation);

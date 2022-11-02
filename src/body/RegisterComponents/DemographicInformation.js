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
import { DesktopDatePicker } from "@mui/x-date-pickers";
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

  const [dobError, setDobError] = React.useState(false);
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
      Dob: dob,
      ResidentialStatus: residencyStatus,
      Country: country,
      StreetAddress: streetAddress,
      City: city,
      State: stateName,
      StateISO: state,
      Zipcode: zipCode,
      EthenicOrigin: ethenicOrigin,
      Gender: gender,
    };

    localStorage.setItem("about_student", JSON.stringify(AboutStudent));
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
    setResidencyStatusClicked(true);

    clearAddress();
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

  const clearAddress = () => {
    setCity("");
    setStreetAddress("");
    setState("");
    setZipCode("");
  };

  const ethincOriginOptions = [
    { title: "African or African American", value: 1 },
    { title: "American Indian or Alaska Native", value: 2 },
    { title: "Asian or Asian American", value: 3 },
    { title: "Caucasian / White", value: 4 },
    { title: "Hispanic", value: 5 },
    { title: "Pacific Islander", value: 6 },
    { title: "Multi-racial", value: 7 },
    { title: "Middle Eastern or Middle Eastern American", value: 8 },
    { title: "Two or more races", value: 9},
    { title: "Unknown", value: 10},
    { title: "Other", value: 11},
    { title: "Prefer not to state", value: 9 },
  ];

  const getCountries =  () => {
    var countries = Country.getAllCountries().filter((country) => 
    country.name !== 'Puerto Rico' &
    country.name !== 'Guam' &
    country.name !== 'Northern Mariana Islands' &
    country.name !== 'American Samoa' &
    country.name !== 'United States');

    return countries;

  };

  const getStates = (countryCode) => {
    var states = State.getStatesOfCountry(countryCode);
    if(states.length === 0){
      states.push({name: 'Not Applicable', isoCode: 'NAL', countryCode: 'NAL', latitude: '0', longitude: '0'});
    }
   
    return states;
  }

  React.useEffect(() => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      dob === null ||
      dobError === true ||
      residencyStatus.length === 0 ||
      state.length === 0 ||
      zipCode.length === 0 ||
      ethenicOrigin.length === 0 ||
      gender.length === 0
    ) {
      props.handleError(true);
    } else {
      props.handleError(false);
    }

    var restored = localStorage.getItem("about_student");

    if (restored != null) {
      var data = JSON.parse(restored);
      setFirstName(data.FirstName);
      setLastName(data.LastName);
      setDob(data.Dob);
      setResidencyStatus(data.ResidentialStatus);
      setCountry(data.Country);
      setStreetAddress(data.StreetAddress);
      setCity(data.City);
      setState(data.StateISO);
      setStateName(data.State);
      setZipCode(data.Zipcode);
      setEthenicOrigin(data.EthenicOrigin);
      setGender(data.Gender);

      localStorage.removeItem("about_student");
    }
  }, [
    firstName.length,
    lastName.length,
    dob,
    dobError,
    residencyStatus.length,
    city.length,
    state.length,
    zipCode.length,
    ethenicOrigin.length,
    gender.length,
    props,
  ]);

  return (
    <div>
      <Box component="form" noValidate autoComplete="off">
        <ThemeProvider theme={createTheme(RegisterTheme)}>
          <MDBCard>
            <MDBCardBody className="px-4 CardBody">
              <MDBRow>
                <MDBCol md="6">
                  <TextField
                    error={
                      (firstName.length === 0) & firstNameClicked ? true : false
                    }
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
                    error={
                      (lastName.length === 0) & lastNameClicked ? true : false
                    }
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
                    <DesktopDatePicker
                      label="Date of Birth"
                      value={dob}
                      onChange={(newValue) => {
                        setDob(newValue);
                        setDobClicked(true);
                      }}
                      onError={(err) =>
                        err === null ? setDobError(false) : setDobError(true)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          fullWidth
                          helperText={
                            dobClicked ? params?.inputProps?.placeholder : ""
                          }
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
                      error={
                        (residencyStatus === null) & residencyStatusClicked
                          ? true
                          : false
                      }
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
                <MDBCol
                  md="7"
                  style={
                    residencyStatus === 2
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <Autocomplete
                    value={(getCountries().find(
                      (option) => option.isoCode === country
                    ))||null}
                    options={getCountries()}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      setCountry(value.isoCode);
                      clearAddress();
                    }}
                    filterSelectedOptions
                    sx={{ mb: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
                        }}
                        label="Country"
                      />
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
                    error={(city.length === 0) & cityClicked ? true : false}
                    value={city}
                    onChange={handleCity}
                    label="City"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </MDBCol>
                <MDBCol md="5">
                  <Autocomplete
                    value={
                      getStates(country).find(
                        (option) => option.isoCode === state
                      ) || null
                    }
                    options={
                      residencyStatus === 2
                        ? getStates(country)
                        : getStates("US")
                    }
                    getOptionLabel={(option) => option.name}
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
                          autoComplete: "new-password",
                        }}
                        label="State"
                        required
                      />
                    )}
                  />
                </MDBCol>
                <MDBCol md="3">
                  <TextField
                    error={
                      (zipCode.length === 0) & zipCodeClicked ? true : false
                    }
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
                      error={
                        (ethenicOrigin.length === 0) & ethenicOriginClicked
                          ? true
                          : false
                      }
                      labelId="student-ethinic-origin-label"
                      value={ethenicOrigin}
                      label="StudentsEthinicOrigin"
                      onChange={handleEthincOrigin}
                      required
                      sx={{ mb: 2 }}
                    >
                      {ethincOriginOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
                        </MenuItem>
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
                      error={
                        (gender.length === 0) & genderClicked ? true : false
                      }
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
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Not Binary"
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
    </div>
  );
};

export default forwardRef(DemographicInformation);

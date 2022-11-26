import React, { useState, forwardRef, useImperativeHandle } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  TextField,
  Tooltip,
  IconButton,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
  createTheme,
  ThemeProvider,
  Input,
  InputAdornment,
  Snackbar,
  Alert,
  responsiveFontSizes,
} from "@mui/material";

import * as Names from '../../Constants/ReactQueryConsts';
import * as Functions from '../../PrefetchData/DataLoadFunctions';

import InfoIcon from "@mui/icons-material/Info";
import PercentIcon from "@mui/icons-material/Percent";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RegisterTheme from "../../Themes/RegisterTheme";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

var affor1 = 0;
var affi1 = 0;
var admm1 = 0;

const States = [
  "Entire US",
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Lowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgina",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const PreferenceMotivation = (props, ref) => {
  const [collegeType, setCollegeType] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [regiliousAffliations, setReligiousAffliations] = useState("");
  const [specializedMission, setSpecializedMission] = useState("");
  const [location, setLocation] = useState([]);
  const [schoolSize, setSchoolSize] = useState({});
  const [urbanicity, setUrbanicity] = useState({});
  const [reasonsToAttendCollege, setReasonsToAttendCollege] = useState({});
  const [keyConsiderations, setKeyConsiderations] = useState({});
  const [affinityScore, setAffinityScore] = useState(0);
  const [affordabilityScore, setAffordalibityScore] = useState(0);
  const [admissibilityScore, setAdmissibilityScore] = useState(0);
  const [scoreError, setScoreError] = useState(false);
  const [scoreClicked, setScoreClicked] = useState(false);
  const [streams, setStreams] = useState([]);

  useImperativeHandle(ref, () => ({
    postPreference,
  }));

  const queryClient = useQueryClient();

  useQuery(Names.STREAMS, Functions.fetchStreams, {
    initialData: () => {
      const streams = queryClient.getQueriesData(Names.STREAMS)?.data
      return {data: streams};
    },
    onSuccess: (data) => {setStreams(data?.data)},
    onError: () => {console.log("Failed to Load Streams Data")}
  });

  const postPreference = () => {
    var selectedSchoolSize = [];
    var selectedUrbanicity = [];
    var selectedReasonstoAttend = [];
    var selectedKeyConsiderations = [];

    for (const [key, value] of Object.entries(schoolSize)) {
      if (value === true) {
        selectedSchoolSize.push(key);
      }
    }
    for (const [key, value] of Object.entries(urbanicity)) {
      if (value === true) {
        selectedUrbanicity.push(key);
      }
    }
    for (const [key, value] of Object.entries(reasonsToAttendCollege)) {
      if (value === true) {
        selectedReasonstoAttend.push(key);
      }
    }
    for (const [key, value] of Object.entries(keyConsiderations)) {
      if (value === true) {
        selectedKeyConsiderations.push(key);
      }
    }

    var PreferenceMotivation = {
      CollegeType: collegeType,
      FieldOfStudy: fieldOfStudy,
      ReligiousAffliation: regiliousAffliations,
      SpecializedMission: specializedMission,
      Location: location,
      SchoolSize: selectedSchoolSize,
      Urbanicity: selectedUrbanicity,
      ReasonsToAttendCollege: selectedReasonstoAttend,
      KeyConsiderations: selectedKeyConsiderations,
      AffinityScore: affinityScore,
      AffordabilityScore: affordabilityScore,
      AdmissibilityScore: admissibilityScore,
    };

    return PreferenceMotivation;
  };

  const handleReligiousAffliations = (event) => {
    setReligiousAffliations(event.target.value);
  };

  const handleSpecializedMission = (event) => {
    setSpecializedMission(event.target.value);
  };

  const handleSchoolSize = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setSchoolSize((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const handleUrbanicity = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setUrbanicity((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const handleReasonsToAttendCollege = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setReasonsToAttendCollege((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const handleKeyConsiderations = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setKeyConsiderations((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const validate = () => {
    var total = affor1 + affi1 + admm1;
    if (total === 100 || total === 99) {
      setScoreError(false);
    } else {
      setScoreError(true);
    }
  };

  const handleCollegeType = (value) => {
    setCollegeType(String(value));
  };

  const handleLocation = (value) => {
    setLocation(String(value));
  };

  const handleAffinityScore = (event) => {
    var val = parseInt(event.target.value);
    affi1 = val >= 0 ? (val > 100 ? 100 : val) : 0;
    validate();
    setAffinityScore(affi1);
    setScoreClicked(true);
  };

  const handleAdmissibilityScore = (event) => {
    var val = parseInt(event.target.value);
    admm1 = val >= 0 ? (val > 100 ? 100 : val) : 0;
    validate();
    setAdmissibilityScore(admm1);
    setScoreClicked(true);
  };

  const handleAffordabilityScore = (event) => {
    var val = parseInt(event.target.value);
    affor1 = val >= 0 ? (val > 100 ? 100 : val) : 0;
    validate();
    setAffordalibityScore(affor1);
    setScoreClicked(true);
  };

  const collegePreferenceOptions = ["Public", "Private Non-Profit", "Private Profit"];

  const religiousAffliationOptions = [
    { title: "None", value: 0 },
    { title: "African Methodist Episcopal", value: 1 },
    { title: "African Methodist Episcopal Zion Church", value: 2 },
    { title: "American Bapist", value: 3 },
    { title: "American Lutheran", value: 4 },
    { title: "Assemblies of God Church", value: 5 },
  ];

  const specializedMissionsOptions = [
    { title: "None", value: 0 },
    { title: "Women Only", value: 1 },
    { title: "Men Only", value: 2 },
    { title: "Asian American", value: 3 },
    { title: "Alaska Native", value: 4 },
    { title: "Hispanic-Serving", value: 5 },
    { title: "Historically Black College", value: 6 },
  ];

  const schoolSizesOption = [
    { title: "Small", value: 1 },
    { title: "Medium", value: 2 },
    { title: "Large", value: 3 },
  ];

  const urbanicityOption = [
    { title: "City", value: 1 },
    { title: "Suburban", value: 2 },
    { title: "Town", value: 3 },
    { title: "Rural", value: 4 },
  ];

  const reasonsToAttendCollegeOptions = [
    {
      title: "Career prospects",
      value: 1,
      info: "Finding a good job upon graduation measured by income and advancement potential",
    },
    {
      title: "Kinship",
      value: 2,
      info: "Making friends and developing life long bonds",
    },
    {
      title: "Pursue Grad School",
      value: 3,
      info: "Leveraging one's undergraduate degree to pursue graduate school",
    },
  ];

  const prevPreference = useSelector((state) => state.profile.preference);

  React.useEffect(() => {
    if(prevPreference != null){
      setCollegeType(prevPreference.CollegeType);
      setFieldOfStudy(prevPreference.FieldOfStudy);
      setReligiousAffliations(prevPreference.ReligiousAffliation);
      setSpecializedMission(prevPreference.SpecializedMission);
      setAffinityScore(prevPreference.AffinityScore)
      setAffordalibityScore(prevPreference.AffordabilityScore);
      setAdmissibilityScore(prevPreference.AdmissibilityScore);


      
    }
  }, [prevPreference])

  React.useEffect(() => {
    if (collegeType == null || fieldOfStudy == null || scoreError) {
      props.handleError(true);
    } else {
      props.handleError(false);
    }

    if (!keyConsiderations[1]) {
      affi1 = 0;
      setAffinityScore(affi1);
      validate();
    } else if (!keyConsiderations[2]) {
      affor1 = 0;
      setAffordalibityScore(affor1);
      validate();
    } else if (!keyConsiderations[3]) {
      admm1 = 0;
      setAdmissibilityScore(admm1);
      validate();
    }
  }, [collegeType, fieldOfStudy, scoreError, keyConsiderations, props]);

  return (
    <div>
      <ThemeProvider theme={responsiveFontSizes(createTheme(RegisterTheme))}>
        <MDBCard>
          <MDBCardBody className="px-4 CardBody">
            <MDBRow>
              <MDBCol md="12">
                <Autocomplete
                  multiple
                  options={collegePreferenceOptions}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  sx={{mb: 2}}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  onChange={(event, value) => handleCollegeType(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="CollegeType"
                      placeholder="Choose College Type"
                    />
                  )}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Autocomplete
                  id="field-of-study"
                  options={streams}
                  getOptionLabel={(option) => option.NAME}
                  filterSelectedOptions
                  value={streams.find((stream) => stream.NAME === String(fieldOfStudy)) || null}
                  onChange={(event, value) => setFieldOfStudy(value.NAME)}
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField {...params} required label="Primary Field of Study" />
                  )}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="religious-affiliation-select-label">
                    Religious Affliations
                  </InputLabel>
                  <Select
                    labelId="religious-affiliation-select-label"
                    value={regiliousAffliations}
                    label="Religious Affliations"
                    sx={{ mb: 2 }}
                    onChange={handleReligiousAffliations}
                    fullWidth
                  >
                    {religiousAffliationOptions.map((option) => (
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
                <FormControl fullWidth>
                  <InputLabel id="specialized-mission-select-label">
                    Specialized Mission
                  </InputLabel>
                  <Select
                    labelId="specialized-mission-select-label"
                    id="specialized-mission-select"
                    value={specializedMission}
                    label="Specialized Mission"
                    sx={{ mb: 2 }}
                    onChange={handleSpecializedMission}
                  >
                    {specializedMissionsOptions.map((option) => (
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
                <Autocomplete
                  multiple
                  options={States}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  getOptionDisabled={(option) => {
                    if (location.indexOf("Entire US") !== -1) {
                      return true;
                    }
                    return false;
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  onChange={(event, value) => handleLocation(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location preference"
                      placeholder="Choose States"
                    />
                  )}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl component="fieldset" sx={{ mb: 2, mt: 2 }}>
                  <FormLabel component="legend">School Size</FormLabel>
                  <FormGroup aria-label="position" row>
                    {schoolSizesOption.map((option) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={option.value}
                            onChange={handleSchoolSize}
                          />
                        }
                        key={option.value}
                        label={option.title}
                        labelPlacement="end"
                        onChange={handleSchoolSize}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormLabel component="legend">Urbanicity</FormLabel>
                <FormGroup aria-label="position" row>
                  {urbanicityOption.map((option) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={option.value}
                          onChange={handleUrbanicity}
                        />
                      }
                      key={option.value}
                      label={option.title}
                      labelPlacement="end"
                      sx={{ mb: 2 }}
                      onChange={handleUrbanicity}
                    />
                  ))}
                </FormGroup>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <FormLabel component="legend" required>
                  Your reasons to attend college
                </FormLabel>
                <FormGroup aria-label="position">
                  {reasonsToAttendCollegeOptions.map((option) => (
                    <Grid container direction="row" key={option.value}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={option.value}
                            onChange={handleReasonsToAttendCollege}
                          />
                        }
                        key={option.value}
                        label={option.title}
                        labelPlacement="end"
                        onChange={handleReasonsToAttendCollege}
                      />
                      <Tooltip
                        style={{ marginLeft: "-20px" }}
                        title={option.info}
                      >
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  ))}
                </FormGroup>
              </MDBCol>
              <MDBCol md="6" sx={{ mb: 2 }}>
                <FormLabel component="legend" required>
                  Key selection considerations and importance
                </FormLabel>
                <FormGroup aria-label="position">
                  <Grid container direction="row">
                    <Grid item xs={10}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="1"
                            onChange={handleKeyConsiderations}
                          />
                        }
                        key={"1"}
                        label={"Affinity"}
                        labelPlacement="end"
                        onChange={handleKeyConsiderations}
                      />
                      <Tooltip
                        style={{ marginLeft: "-20px" }}
                        title={
                          "Takes into account factors such as college's reputation, ranking, campus safety, transporation access, weather, and perceived cultural fit"
                        }
                      >
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Input
                        error={scoreError & keyConsiderations[1] ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <PercentIcon style={{ fontSize: "1em" }} />
                          </InputAdornment>
                        }
                        style={{
                          width: "150%",
                        }}
                        value={affinityScore}
                        onChange={handleAffinityScore}
                        disabled={!keyConsiderations[1]}
                      />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" key={"2"}>
                    <Grid item xs={10}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="2"
                            onChange={handleKeyConsiderations}
                          />
                        }
                        key={"2"}
                        label="Affordability"
                        labelPlacement="end"
                        onChange={handleKeyConsiderations}
                      />
                      <Tooltip
                        style={{ marginLeft: "-20px" }}
                        title={"Whether I/we can afford it "}
                      >
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Input
                        error={scoreError & keyConsiderations[2] ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <PercentIcon style={{ fontSize: "1em" }} />
                          </InputAdornment>
                        }
                        style={{
                          width: "150%",
                        }}
                        value={affordabilityScore}
                        onChange={handleAffordabilityScore}
                        disabled={!keyConsiderations[2]}
                      />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" key={"3"}>
                    <Grid item xs={10}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="3"
                            onChange={handleKeyConsiderations}
                          />
                        }
                        key={"3"}
                        label="Admissibility"
                        labelPlacement="end"
                        onChange={handleKeyConsiderations}
                      />
                      <Tooltip
                        style={{ marginLeft: "-20px" }}
                        title={"Student's chances of getting admitted."}
                      >
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Input
                        error={scoreError & keyConsiderations[3] ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <PercentIcon style={{ fontSize: "1em" }} />
                          </InputAdornment>
                        }
                        style={{
                          width: "150%",
                        }}
                        value={admissibilityScore}
                        onChange={handleAdmissibilityScore}
                        disabled={!keyConsiderations[3]}
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </MDBCol>
            </MDBRow>

            <Snackbar
              open={scoreError & scoreClicked ? true : false}
              autoHideDuration={3000}
            >
              <Alert severity="error" sx={{ width: "100%" }}>
                Sum of Percentages should be 100%
              </Alert>
            </Snackbar>
          </MDBCardBody>
        </MDBCard>
      </ThemeProvider>
    </div>
  );
};
export default forwardRef(PreferenceMotivation);

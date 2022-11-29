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

import * as Names from "../../Constants/ReactQueryConsts";
import * as Functions from "../../PrefetchData/DataLoadFunctions";

import InfoIcon from "@mui/icons-material/Info";
import PercentIcon from "@mui/icons-material/Percent";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RegisterTheme from "../../Themes/RegisterTheme";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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

  const [schoolSize, setSchoolSize] = useState([
    { title: "Small", value: 1, checked: false },
    { title: "Medium", value: 2, checked: false },
    { title: "Large", value: 3, checked: false },
  ]);

  const [urbanicity, setUrbanicity] = useState([
    { title: "City", value: 1, checked: false },
    { title: "Suburban", value: 2, checked: false },
    { title: "Town", value: 3, checked: false },
    { title: "Rural", value: 4, checked: false },
  ]);

  const [reasonsToAttendCollege, setReasonsToAttendCollege] = useState([
    {
      title: "Career prospects",
      value: 1,
      info: "Finding a good job upon graduation measured by income and advancement potential",
      checked: false,
    },
    {
      title: "Kinship",
      value: 2,
      info: "Making friends and developing life long bonds",
      checked: false,
    },
    {
      title: "Pursue Grad School",
      value: 3,
      info: "Leveraging one's undergraduate degree to pursue graduate school.",
      checked: false,
    },
  ]);

  const [keyConsiderations, setKeyConsiderations] = useState([
    {
      title: "Affinity",
      value: 1,
      info: "Takes into account factors such as college's reputation, ranking, campus safety, transporation access, weather, and perceived cultural fit.",
      checked: false,
      score: "",
    },
    {
      title: "Affordability",
      value: 2,
      info: "Whether I/we can afford it ",
      checked: false,
      score: "",
    },
    {
      title: "Admissibility",
      value: 3,
      info: "Student's chances of getting admitted.",
      checked: false,
      score: "",
    },
  ]);
  const [disable, setDisableScore] = useState([true, true, true, true]);
  const [scoreError, setScoreError] = useState(false);
  const [scoreClicked, setScoreClicked] = useState(false);
  const [streams, setStreams] = useState([]);

  useImperativeHandle(ref, () => ({
    postPreference,
  }));

  const queryClient = useQueryClient();

  useQuery(Names.STREAMS, Functions.fetchStreams, {
    initialData: () => {
      const streams = queryClient.getQueriesData(Names.STREAMS)?.data;
      return { data: streams };
    },
    onSuccess: (data) => {
      setStreams(data?.data);
    },
    onError: () => {
      console.log("Failed to Load Streams Data");
    },
  });

  const postPreference = () => {
    var selectedSchoolSize = [];
    var selectedUrbanicity = [];
    var selectedReasonstoAttend = [];
    var selectedKeyConsiderations = [];

    schoolSize.forEach((ele) => {
      if (ele.checked === true) {
        selectedSchoolSize.push(ele.value);
      }
    });
    urbanicity.forEach((ele) => {
      if (ele.checked === true) {
        selectedUrbanicity.push(ele.value);
      }
    });
    reasonsToAttendCollege.forEach((ele) => {
      if (ele.checked === true) {
        selectedReasonstoAttend.push(ele.value);
      }
    });
    keyConsiderations.forEach((ele) => {
      if (ele.checked === true) {
        selectedKeyConsiderations.push(ele.value);
      }
    });

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
      AffinityScore: keyConsiderations[0].score,
      AffordabilityScore: keyConsiderations[1].score,
      AdmissibilityScore: keyConsiderations[2].score,
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
    var newSchoolSize = [...schoolSize];
    newSchoolSize[val - 1].checked = checked;
    setSchoolSize(newSchoolSize);
  };

  const handleUrbanicity = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;
    var newUrabanicity = [...urbanicity];
    newUrabanicity[val - 1].checked = checked;
    setUrbanicity(newUrabanicity);
  };

  const handleReasonsToAttendCollege = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;
    var newReasonstoAttend = [...reasonsToAttendCollege];
    newReasonstoAttend[val - 1].checked = checked;
    setReasonsToAttendCollege(newReasonstoAttend);
  };

  const handleKeyConsiderations = (event) => {
    var name = event.target.name;
    var val = event.target.value;

    if(name === 'check'){
      var checked = event.target.checked;
      var keyConsiderationsCheck = [...keyConsiderations];
      keyConsiderationsCheck[val - 1].checked = checked;
      if(checked === false){
        keyConsiderations[val -1].score = "";
        if(scoreClicked) validateScore();
      }
      setKeyConsiderations(keyConsiderationsCheck);
    }else{
      setScoreClicked(true)
      var keyConsiderationsScore = [...keyConsiderations];
      keyConsiderationsScore[name - 1].score = val;
      setKeyConsiderations(keyConsiderationsScore);
      validateScore();
    }
  };

  React.useEffect(() => {
    var newDisable = [...disable];
    keyConsiderations.forEach((ele) => {
      if(ele.checked === true){
        newDisable[ele.value] = false;
        setDisableScore(newDisable)
      }else{
        newDisable[ele.value] = true;
        setDisableScore(newDisable)
      }
    })
  }, [disable, keyConsiderations])

  const validateScore = () => {
    var total = 0;
    keyConsiderations.forEach((ele) => {
      var score;
      if(ele.score === ""){
        score = 0;
      }else{
        score = parseInt(ele.score);
      }
      total += score;
    })
    if(total === 100 || total === 0){
      setScoreError(false)
    }else{
      setScoreError(true)
    }
  };

  const handleCollegeType = (value) => {
    setCollegeType(String(value));
  };

  const handleLocation = (value) => {
    setLocation(String(value));
  };

  const collegePreferenceOptions = [
    "Public",
    "Private Non-Profit",
    "Private Profit",
  ];

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

  const prevPreference = useSelector((state) => state.profile.preference);


  React.useEffect(() => {

    if(fieldOfStudy.length === 0){
      props.handleError(true);
    }else{
      props.handleError(false);
    }
  }, [fieldOfStudy, props])

  React.useEffect(() => {
    if (prevPreference != null) {
      setCollegeType(prevPreference.CollegeType);
      setFieldOfStudy(prevPreference.FieldOfStudy);
      setReligiousAffliations(prevPreference.ReligiousAffliation);
      setSpecializedMission(prevPreference.SpecializedMission);

      var newSchoolSize = [...schoolSize];
      String(prevPreference.SchoolSize)
        .split(",")
        .forEach((ele) => {
          var val = parseInt(ele);
          if (isNaN(val)) return;
          newSchoolSize[val - 1].checked = true;
        });
      setSchoolSize(newSchoolSize);

      var newUrbanicity = [...urbanicity];
      String(prevPreference.Urbanicity)
        .split(",")
        .forEach((ele) => {
          var val = parseInt(ele);
          if (isNaN(val)) return;
          newUrbanicity[val - 1].checked = true;
        });
      setUrbanicity(newUrbanicity);

      var newReasonstoAttend = [...reasonsToAttendCollege];
      String(prevPreference.ReasonsToAttendCollege)
        .split(",")
        .forEach((ele) => {
          var val = parseInt(ele);
          if (isNaN(val)) return;
          newReasonstoAttend[val - 1].checked = true;
        });
      setReasonsToAttendCollege(newReasonstoAttend);

      var newKeyConsiderations = [...keyConsiderations];
      String(prevPreference.KeyConsiderations)
        .split(",")
        .forEach((ele) => {
          var val = parseInt(ele);
          if (isNaN(val)) return;
          newKeyConsiderations[val - 1].checked = true;
          if(val === 1){
            newKeyConsiderations[val -1].score = prevPreference.AffinityScore;
          }else if(val === 2){
            newKeyConsiderations[val -1].score = prevPreference.AffordabilityScore;
          }else if(val === 3){
            newKeyConsiderations[val -1].score = prevPreference.AdmissibilityScore;
          }
        });
      setKeyConsiderations(newKeyConsiderations);
    }
  }, [prevPreference]);

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
                  sx={{ mb: 2 }}
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
                  value={
                    streams.find(
                      (stream) => stream.NAME === String(fieldOfStudy)
                    ) || null
                  }
                  onChange={(event, value) => setFieldOfStudy(value.NAME)}
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Primary Field of Study"
                    />
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
                    {schoolSize.map((option) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={option.checked}
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
                  {urbanicity.map((option) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={option.checked}
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
                  {reasonsToAttendCollege.map((option) => (
                    <Grid container direction="row" key={option.value}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={option.checked}
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
                  {keyConsiderations.map((ele) => (
                    <Grid
                    container
                    direction="row"
                    key={ele.value}
                  >
                    <Grid item xs={10}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={ele.checked}
                            value={ele.value}
                            onChange={handleKeyConsiderations}
                            name={'check'}
                          />
                        }
                        key={ele.value}
                        label={ele.title}
                        labelPlacement="end"
                        onChange={handleKeyConsiderations}
                        name={'check'}
                      />
                      <Tooltip
                        style={{ marginLeft: "-20px" }}
                        title={ele.info}
                      >
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Input
                        error={scoreError}
                        endAdornment={
                          <InputAdornment position="end">
                            <PercentIcon style={{ fontSize: "1em" }} />
                          </InputAdornment>
                        }
                        style={{
                          width: "150%",
                        }}
                        name={ele.value}
                        value={ele.score}
                        onChange={handleKeyConsiderations}
                        hidden={disable[ele.value]}
                      />
                    </Grid>
                  </Grid>
                  ))}
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

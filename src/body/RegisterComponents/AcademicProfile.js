import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  TextField,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import NameofHighSchool from "./NameofHighSchool";
import RegisterTheme from "../../Themes/RegisterTheme";
import dayjs from "dayjs";

const AcademicProfile = (props, ref) => {
  useImperativeHandle(ref, () => ({
    postAcademicProfile,
  }));

  const postAcademicProfile = () => {
    const AcademicProfile = {
      userId: props.UserId,
      NameofHighSchool: nameOfSchool,
      HighSchoolGraduation: highSchoolGraduation,
      LookingtoEnrollIn: enrolIn,
      IncomingStatus: enrolAs,
      TypeOfDegree: typeofDegree,
      TransferAs: tranferAs,
      StudentClassRank: studentPercentile,
      GpaType: gpaType,
      ScoredGpa: scoredGpa,
      TotalGpa: totalGpa,
      IB: haveIB,
      IBScore: ibScore,
      PSatMath: psatMath,
      PsatReading: psatReading,
      SatMath: satMath,
      SatReading: satReading,
      ActCompostite: actComposite,
    };

    localStorage.setItem("academic_profile", JSON.stringify(AcademicProfile));

    axios
      .post(
        "https://collegeportfoliobackendnode.azurewebsites.net/student/academics",
        AcademicProfile
      )
      .then((resp) => console.log(resp));
  };

  const [nameOfSchool, setNameOfSchool] = React.useState("");
  const [highSchoolGraduation, sethighSchoolGraduation] = React.useState(null);
  const [enrolIn, setEnrolIn] = React.useState("");
  const [enrolAs, setEnrolAs] = React.useState("");
  const [typeofDegree, setTypeOfDegree] = React.useState("");
  const [tranferAs, settransferAs] = React.useState("");
  const [studentPercentile, setStudentPercentile] = React.useState("");
  const [gpaType, setGpaType] = React.useState("");
  const [scoredGpa, setScoredGpa] = React.useState("");
  const [totalGpa, setTotalGpa] = React.useState("");
  const [haveIB, setHaveIB] = React.useState("");
  const [ibScore, setIBscore] = React.useState("");
  const [psatMath, setPsatMath] = React.useState("");
  const [psatReading, setpsatReading] = React.useState("");
  const [satMath, setSatMath] = React.useState("");
  const [satReading, setSatReading] = React.useState("");
  const [actComposite, setActComposite] = React.useState("");

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [highSchoolGraduationClicked, sethighSchoolGraduationClicked] =
    React.useState(false);
  const [scoredGpaClicked, setScoredGpaClicked] = React.useState(false);
  const [totalGpaClicked, setTotalGpaClicked] = React.useState(false);
  const [seasons, setSeasons] = React.useState([]);

  const handleNameOfSchool = (value) => {
    setNameOfSchool(value);
  };

  const handleEnrolIn = (event) => {
    setEnrolIn(event.target.value);
  };

  const handleEnrolAs = (event) => {
    setEnrolAs(event.target.value);
  };

  const type_of_degreechange = (event) => {
    setTypeOfDegree(event.target.value);
    settransferAs("");
  };

  const handleTransferAs = (event) => {
    settransferAs(event.target.value);
  };

  const handleStudentpercentile = (event) => {
    setStudentPercentile(event.target.value);
  };

  const handleGpaType = (event) => {
    setGpaType(event.target.value);
  };

  const handleScoreGpa = (event) => {
    setScoredGpa(event.target.value);
    setScoredGpaClicked(true);
  };

  const handleTotalGpa = (event) => {
    setTotalGpa(event.target.value);
    setTotalGpaClicked(true);
  };

  const handleIBscore = (event) => {
    setIBscore(event.target.value);
  };

  const handlesatMath = (event) => {
    setSatMath(event.target.value);
  };

  const handlesatReading = (event) => {
    setSatReading(event.target.value);
  };

  const handlepsatMath = (event) => {
    setPsatMath(event.target.value);
  };

  const handlepsatReading = (event) => {
    setpsatReading(event.target.value);
  };

  const handleActComposite = (event) => {
    setActComposite(event.target.value);
  };

  const updateSeasons = useCallback(() => {
    var seasonsTemp = [];
    var month = new Date(highSchoolGraduation).getMonth();
    var year = new Date(highSchoolGraduation).getFullYear();
    let i = 1;

    if (month < 7) {
      seasonsTemp.push("Fall " + year);
    }
    for (; i <= 5; i++) {
      seasonsTemp.push("Spring " + (year + i));
      seasonsTemp.push("Fall " + (year + i));
    }
    setSeasons(seasonsTemp);
  },[highSchoolGraduation])
  

  const studentPercentileoptions = [
    { title: "Top 10%", value: "1" },
    { title: "Top Quarter", value: "2" },
    { title: "Top Half", value: "3" },
    { title: "Bottom Half", value: "4" },
    { title: "Bottom Quarter", value: "5" },
  ];

  const typeofDegreeoptions = [
    { title: "Certificate", value: "1" },
    { title: "Associate's Degree", value: "2" },
    { title: "Bachelor's Degree", value: "3" },
  ];

  React.useEffect(() => {
    if (
      nameOfSchool.length === 0 ||
      highSchoolGraduation === null ||
      enrolIn.length === 0 ||
      enrolAs.length === 0 ||
      typeofDegree.length === 0 ||
      gpaType.length === 0 ||
      scoredGpa.length === 0 ||
      totalGpa.length === 0
    ) {
      props.handleError(true);
    } else {
      props.handleError(false);
    }

    var restored = localStorage.getItem("academic_profile");


    if (restored != null) {

      console.log(restored)

      var data = JSON.parse(restored);
      sethighSchoolGraduation(data.HighSchoolGraduation);
      setEnrolIn(data.LookingtoEnrollIn);
      setEnrolAs(data.IncomingStatus);
      setTypeOfDegree(data.TypeOfDegree);
      settransferAs(data.TransferAs);
      setStudentPercentile(data.StudentClassRank);
      setGpaType(data.GpaType);
      setScoredGpa(data.ScoredGpa);
      setTotalGpa(data.TotalGpa);
      setHaveIB(data.IB);
      setIBscore(data.IBScore);
      setpsatReading(data.PsatReading);
      setPsatMath(data.psatMath);
      setSatMath(data.SatMath);
      setSatReading(data.SatReading);
      setActComposite(data.ActCompostite);

      localStorage.removeItem('academic_profile')
    }
    updateSeasons();
  }, [
    enrolAs.length,
    enrolIn.length,
    gpaType.length,
    highSchoolGraduation,
    nameOfSchool.length,
    scoredGpa.length,
    totalGpa.length,
    typeofDegree.length,
    updateSeasons,
    props,
  ]);

  return (
    <div>
      <ThemeProvider theme={createTheme(RegisterTheme)}>
        <MDBCard>
          <MDBCardBody className="px-4">
            <MDBRow>
              <MDBCol md="12">
                <NameofHighSchool NameOfSchool={handleNameOfSchool} />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    views={["year", "month"]}
                    minDate={dayjs(new Date())}
                    maxDate={new Date(new Date().getFullYear() + 7, 12, 0)}
                    label="High School Graduation"
                    value={highSchoolGraduation}
                    onChange={(newValue) => {
                      sethighSchoolGraduation(newValue);
                      sethighSchoolGraduationClicked(true);
                    }}
                    inputFormat="MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        helperText={
                          highSchoolGraduationClicked
                            ? params?.inputProps?.placeholder
                            : ""
                        }
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </MDBCol>
              <MDBCol md="6">
                <FormControl fullWidth>
                  <InputLabel id="looking-to-enroll-in" required>
                    Looking to enroll in
                  </InputLabel>
                  <Select
                    labelId="looking-to-enroll-in"
                    value={enrolIn}
                    required
                    label="Looking to enrol in"
                    sx={{ mb: 2 }}
                    onChange={handleEnrolIn}
                  >
                    {seasons.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <FormControl fullWidth>
                  <InputLabel id="enrolled-as-select-label" required>
                    Incoming status
                  </InputLabel>
                  <Select
                    labelId="enrol-as-select-label"
                    id="enrolled-as-select"
                    value={enrolAs}
                    required
                    label="Incoming status"
                    sx={{ mb: 2 }}
                    onChange={handleEnrolAs}
                  >
                    <MenuItem key={1} value={1}>
                      First Year
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                      Transfer
                    </MenuItem>
                  </Select>
                </FormControl>
              </MDBCol>
              <MDBCol md="6">
                <FormControl fullWidth>
                  <InputLabel id="type-of-degree-label" required>
                    Type of Degree
                  </InputLabel>
                  <Select
                    labelId="type-of-degree-label"
                    id="type-of-degree"
                    required
                    value={typeofDegree}
                    sx={{ mb: 2 }}
                    onChange={type_of_degreechange}
                    label="Type of Degree"
                  >
                    {typeofDegreeoptions.map((options) => (
                      <MenuItem key={options.value} value={options.value}>
                        {options.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol
                md="6"
                style={
                  enrolAs === 2 ? { display: "block" } : { display: "none" }
                }
              >
                <FormControl fullWidth>
                  <InputLabel id="transfer-year-select-label" required>
                    Transfer as
                  </InputLabel>
                  <Select
                    labelId="transfer-as-select-label"
                    id="transfer-as-select"
                    value={tranferAs}
                    onChange={handleTransferAs}
                    label="Transfer as"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem key={'1'} value={'1'} disabled={(typeofDegree==='1'||typeofDegree==='2')?true: false}>Sophmore</MenuItem>
                    <MenuItem key={'2'} value={'2'} disabled={(typeofDegree==='1'||typeofDegree==='2')?true: false}>Junior</MenuItem>
                    <MenuItem key={'3'} value={'3'}>Senior</MenuItem>
                  </Select>
                </FormControl>
              </MDBCol>
              <MDBCol md={enrolAs === 2 ? "6" : "12"}>
                <FormControl fullWidth>
                  <InputLabel id="student-class-rank-select-label">
                    Student Class Rank (Percentile)
                  </InputLabel>
                  <Select
                    labelId="student-class-rank-select-label"
                    value={studentPercentile}
                    label="Student Class Rank (percentile)"
                    sx={{ mb: 2 }}
                    onChange={handleStudentpercentile}
                  >
                    {studentPercentileoptions.map((options) => (
                      <MenuItem key={options.value} value={options.value}>
                        {options.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <FormControl fullWidth>
                  <InputLabel id="gpa-type-label" required>
                    GPA Type
                  </InputLabel>
                  <Select
                    labelId="gpa-type-label"
                    id="gpa-type"
                    value={gpaType}
                    label="GPA Type"
                    required
                    sx={{ mb: 2 }}
                    onChange={handleGpaType}
                  >
                    <MenuItem value={1}>Weighted</MenuItem>
                    <MenuItem value={2}>Unweighted</MenuItem>
                  </Select>
                </FormControl>
              </MDBCol>
              <MDBCol md="6">
                <TextField
                  error={
                    (scoredGpa.length === 0) & scoredGpaClicked ? true : false
                  }
                  label="Actual GPA"
                  variant="standard"
                  value={scoredGpa}
                  onChange={handleScoreGpa}
                  style={{ width: "45%", marginRight: "10%" }}
                  required
                />
                <TextField
                  error={
                    ((totalGpa.length === 0) & totalGpaClicked) |
                    (parseInt(scoredGpa) > parseInt(totalGpa))
                      ? true
                      : false
                  }
                  type="number"
                  label="Total GPA"
                  variant="standard"
                  value={totalGpa}
                  onChange={handleTotalGpa}
                  helperText={`>=${scoredGpa}`}
                  style={{ width: "45%" }}
                  required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="8">
                <FormControl fullWidth>
                  <p>
                    International Baccalauerate (IB)
                    <Switch
                      sx={{ mb: 2, mt: 2 }}
                      onChange={(event) => setHaveIB(event.target.checked)}
                    />
                  </p>
                </FormControl>
              </MDBCol>
              <MDBCol md="4">
                <TextField
                  id="predicted-ib-score"
                  error={ibScore > 45 || ibScore < 0 ? true : false}
                  helperText={"Out of 45"}
                  type="number"
                  label="Predicted IB Score"
                  value={ibScore}
                  onChange={handleIBscore}
                  variant="standard"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      variant="scrollable"
                    >
                      <Tab label="Psat" value="1" />
                      <Tab label="Sat" value="2" />
                      <Tab label="Act" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <MDBRow>
                      <MDBCol md="6">
                        <TextField
                          id="psat-score-math"
                          error={
                            (psatMath > 760) | (psatMath < 0) ? true : false
                          }
                          helperText={"0 - 760"}
                          type="number"
                          value={psatMath}
                          onChange={handlepsatMath}
                          label="PSAT MATH"
                          variant="standard"
                          sx={{ mb: 2 }}
                          fullWidth
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <TextField
                          id="psat-score-verbal"
                          error={
                            (psatReading > 760) | (psatReading < 0)
                              ? true
                              : false
                          }
                          helperText={"0 - 760"}
                          type="number"
                          label="PSAT READING"
                          value={psatReading}
                          onChange={handlepsatReading}
                          variant="standard"
                          sx={{ mb: 2 }}
                          fullWidth
                        />
                      </MDBCol>
                    </MDBRow>
                  </TabPanel>
                  <TabPanel value="2">
                    <MDBRow>
                      <MDBCol md="6">
                        <TextField
                          error={(satMath > 800) | (satMath < 0) ? true : false}
                          helperText={"0 - 800"}
                          id="sat-score-math"
                          type="number"
                          label="SAT MATH"
                          value={satMath}
                          onChange={handlesatMath}
                          variant="standard"
                          sx={{ mb: 2 }}
                          fullWidth
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <TextField
                          error={
                            (satReading > 800) | (satReading < 0) ? true : false
                          }
                          helperText={"0 - 800"}
                          id="sat-score-verbal"
                          type="number"
                          label="SAT READING"
                          value={satReading}
                          onChange={handlesatReading}
                          variant="standard"
                          sx={{ mb: 2 }}
                          fullWidth
                        />
                      </MDBCol>
                    </MDBRow>
                  </TabPanel>
                  <TabPanel value="3">
                    <MDBRow>
                      <MDBCol md="12">
                        <TextField
                          id="act-score-composite"
                          error={
                            (actComposite > 36) | (actComposite < 0)
                              ? true
                              : false
                          }
                          helperText={"0 - 36"}
                          type="number"
                          value={actComposite}
                          onChange={handleActComposite}
                          label="ACT Composite"
                          variant="standard"
                          sx={{ mb: 2 }}
                          fullWidth
                        />
                      </MDBCol>
                    </MDBRow>
                  </TabPanel>
                </TabContext>
              </Box>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </ThemeProvider>
    </div>
  );
};
export default forwardRef(AcademicProfile);

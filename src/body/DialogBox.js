import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { MDBCard, MDBCardBody, MDBRow } from "mdb-react-ui-kit";
import { useNavigate } from "react-router";
import DemographicInformation from "./RegisterComponents/DemographicInformation";
import AcademicProfile from "./RegisterComponents/AcademicProfile";
import FinancialInformation from "./RegisterComponents/FinancialInformation";
import PreferenceMotivation from "./RegisterComponents/PreferencesAndMotivation";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const student = [
  "",
  "Tell us about yourself",
  "Tell us about your academic profile",
  "How do you plan to finance college?",
  "What are some of your preferences?",
];

const parent = [
  "",
  "Tell us about your student",
  "Tell us about your student's academic profile",
  "How do you plan to finance college?",
  "What are some of your student's preferences?",
];

export default function DialogBox(props) {
  const ChildRef = React.useRef();
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const [who, setWho] = React.useState(null);
  const [haveError, setHaveError] = React.useState(true);

  const handleHaveError = (val) => {
    setHaveError(val);
  };

  const navigate = useNavigate();

  const gotoDashBoard = () => {
      const about = JSON.parse(localStorage.getItem("about_student"));
      const academics = localStorage.getItem("academic_profile");
      const finance = localStorage.getItem("financial_info");
      const preference = localStorage.getItem("preference_motivation");

      axios
        .post(
          "https://collegeportfoliobackendnode.azurewebsites.net/student/about",
          about
        )
        .then((resp) => console.log(resp));

      axios
        .post(
          "https://collegeportfoliobackendnode.azurewebsites.net/student/academics",
          JSON.parse(academics)
        )
        .then((resp) => console.log(resp));

      axios
        .post(
          "https://collegeportfoliobackendnode.azurewebsites.net/student/financial",
          JSON.parse(finance)
        )
        .then((resp) => console.log(resp));

      axios
        .post(
          "https://collegeportfoliobackendnode.azurewebsites.net/student/preference",
          JSON.parse(preference)
        )
        .then((resp) => console.log(resp));

    navigate("/dashboard", {
      state: {
        id: props.UserId,
        filled: true,
      },
    });
  };

  const handleNext = () => {
    if (activeStep === 1) {
      ChildRef.current.postAboutStudent();
    } else if (activeStep === 2) {
      ChildRef.current.postAcademicProfile();
    } else if (activeStep === 3) {
      ChildRef.current.postFinancial();
    } else if (activeStep === 4) {
      ChildRef.current.postPreference();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setHaveError(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setHaveError(false);
  };

  const handleWho = (event) => {
    setWho(event.target.value);
    handleHaveError(false);
  };

  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  React.useState(() => {

    var schools = localStorage.getItem('schoolsData');
    if(schools == null){
      localStorage.setItem('schoolsData', JSON.stringify([]))
    }
    axios
    .get("https://collegeportfoliobackendnode.azurewebsites.net/student/highschools")
    .then((resp) => localStorage.setItem('schoolsData', JSON.stringify(resp.data)));

    var streams = localStorage.getItem('streamsData');
    if(streams == null){
      localStorage.setItem('streamsData', JSON.stringify([]))
    }
    axios
    .get("https://collegeportfoliobackendnode.azurewebsites.net/student/streams")
    .then((resp) => localStorage.setItem('streamsData', JSON.stringify(resp.data)));


  }, open)

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {who === "1" ? student[activeStep] : parent[activeStep]}
        </DialogTitle>
        <DialogContent>
          <div>
            <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
              {activeStep === 0 ? (
                <div>
                  <MDBCard>
                    <MDBCardBody>
                      <MDBRow>
                        <FormLabel
                          id="demo-row-radio-buttons-group-label"
                          style={{ marginLeft: "10px" }}
                        >
                          I am a
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={who}
                          onChange={handleWho}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Student"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Parent"
                          />
                        </RadioGroup>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              ) : activeStep === 1 ? (
                <DemographicInformation
                  ref={ChildRef}
                  handleError={handleHaveError}
                  UserId={props.UserId}
                />
              ) : activeStep === 2 ? (
                <AcademicProfile
                  ref={ChildRef}
                  handleError={handleHaveError}
                  UserId={props.UserId}
                />
              ) : activeStep === 3 ? (
                <FinancialInformation
                  ref={ChildRef}
                  handleError={handleHaveError}
                  UserId={props.UserId}
                />
              ) : activeStep === 4 ? (
                <PreferenceMotivation
                  ref={ChildRef}
                  handleError={handleHaveError}
                  UserId={props.UserId}
                />
              ) : activeStep === 5 ? (
                gotoDashBoard()
              ) : (
                console.log("Dialog Closed")
              )}
            </Box>
            <MobileStepper
              variant="dots"
              steps={5}
              position="static"
              activeStep={activeStep}
              sx={{ maxWidth: "100%", flexGrow: 1 }}
              nextButton={
                <Button
                  type="submit"
                  size="small"
                  onClick={handleNext}
                  disabled={haveError}
                >
                  {activeStep < 4 ? "Next" : "Submit"}
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

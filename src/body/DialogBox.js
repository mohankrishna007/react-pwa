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
  Typography,
} from "@mui/material";
import { actions } from "../store/ProfileSlice";
import { useDispatch } from "react-redux";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow } from "mdb-react-ui-kit";
import DemographicInformation from "./RegisterComponents/DemographicInformation";
import AcademicProfile from "./RegisterComponents/AcademicProfile";
import FinancialInformation from "./RegisterComponents/FinancialInformation";
import PreferenceMotivation from "./RegisterComponents/PreferencesAndMotivation";
import axios from "axios";
import "../styles/body/DialogBox.css";
import PrefetchDropdownData from '../PrefetchData/PrefetchDropdownData';
import ProfileCompletionGreeting from "./ProfileCompletionGreeting";

const student = [
  "Who is this?",
  "Tell us about yourself",
  "Tell us about your academic profile",
  "How do you plan to finance college?",
  "What are some of your preferences?",
];

const parent = [
  "Who is this?",
  "Tell us about your student",
  "Tell us about your student's academic profile",
  "How do you plan to finance college?",
  "What are some of your student's preferences?",
];

const token = localStorage.getItem("token");
axios.defaults.headers.common["auth-token"] = token;

export default function DialogBox() {
  const ChildRef = React.useRef();
  const dispatch = useDispatch();

  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const [who, setWho] = React.useState(null);
  const [haveError, setHaveError] = React.useState(true);

  const handleHaveError = (val) => {
    setHaveError(val);
  };
  
  const handleNext = () => {
    if (activeStep === 0) {
      localStorage.setItem("whoData", who);
    }
    if (activeStep === 1) {
     const about =  ChildRef.current.postAboutStudent();
     dispatch(actions.addAboutData(about))
    } else if (activeStep === 2) {
     const academics =  ChildRef.current.postAcademicProfile();
     dispatch(actions.addAcademicsData(academics))
    } else if (activeStep === 3) {
     const financial =  ChildRef.current.postFinancial();
     dispatch(actions.addFinanceData(financial));
    } else if (activeStep === 4) {
     const preference = ChildRef.current.postPreference();
     dispatch(actions.addPreferenceData(preference))
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setHaveError(true);
    scrollToTop();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setHaveError(false);
    scrollToTop();
  };

  const handleWho = (event) => {
    setWho(event.target.value);
    handleHaveError(false);
  };

  React.useEffect(() => {
    console.log(localStorage.getItem("remember"));

    var restored = localStorage.getItem("whoData");
    if (restored != null) {
      setWho(restored);
      handleHaveError(false);
    }
  }, []);

  const scrollToTop = () => {
    document.getElementById("dialog-content").scrollTop = 0;
  };

  return (
    <div id="body-dialog">
      <PrefetchDropdownData />
      <MDBCard style={{ width: "90%", margin: "0 auto" }}>
        <MDBCardTitle className="dialog-title">
          <Typography>
            {who === "1" ? student[activeStep] : parent[activeStep]}
          </Typography>
        </MDBCardTitle>
        <MDBCardBody>
          <div>
            <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
              {activeStep === 0 ? (
                <div>
                  <MDBCard>
                    <MDBCardBody className="CardBody">
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
                />
              ) : activeStep === 2 ? (
                <AcademicProfile
                  ref={ChildRef}
                  handleError={handleHaveError}
                />
              ) : activeStep === 3 ? (
                <FinancialInformation
                  ref={ChildRef}
                  handleError={handleHaveError}
                />
              ) : activeStep === 4 ? (
                <PreferenceMotivation
                  ref={ChildRef}
                  handleError={handleHaveError}
                />
              ) : (
                <ProfileCompletionGreeting />
              )}
            </Box>
            <br />
            <MobileStepper
              variant="progress"
              steps={5}
              position="static"
              activeStep={activeStep}
              sx={{ maxWidth: "100%", flexGrow: 1 }}
              hidden={activeStep === 5? true: false}
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
        </MDBCardBody>
      </MDBCard>
      <br />
      <br />
    </div>
  );
}

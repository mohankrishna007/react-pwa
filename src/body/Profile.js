import * as React from 'react';
import * as Names from '../Constants/ReactQueryConsts';
import * as Functions from '../Queries/ProfileHttpRequests';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DemographicInformation from './RegisterComponents/DemographicInformation';
import AcademicProfile from './RegisterComponents/AcademicProfile';
import FinancialInformation from './RegisterComponents/FinancialInformation';
import PreferencesAndMotivation from './RegisterComponents/PreferencesAndMotivation';
import { useDispatch } from 'react-redux';
import { actions } from '../store/ProfileSlice';
import { useQuery } from 'react-query';
import { Alert, Button } from '@mui/material';
import axios from 'axios';

const drawerWidth = 240;

const APP_URL = 'https://collegeportfoliobackendnode.azurewebsites.net';

export default function Profile() {
    const filled = localStorage.getItem('profile-filled')

    const [item, setItem] = React.useState(-1);
    const [haveError, setHaveError] = React.useState(true);
    const [showAlert, setShowAlert] = React.useState(true);
    const [alertData, setAlertData] = React.useState("");

    const ChildRef = React.useRef();
    const dispatch = useDispatch();
    const { isLoading, data, refetch, isError } = useQuery(Names.GETPROFILEDATA, Functions.getUserProfile);

    if(filled === '0'){
      return <div><center>Please fill profile !!</center></div>
    }

    if(isError){
      return <div>Please fill profile</div>
    }

    if(isLoading){
      return <div> <center> Loading ...</center></div>
    }

    const updateItemData = () => {
      if (item === 0) {
        const about =  ChildRef.current.postAboutStudent();
        axios.post(APP_URL+'/student/about', about).then((resp) => {
          if(resp.status === 200){
            setAlertData("About data updated successfully");
            setShowAlert(false);
          }
        })
       } else if (item === 1) {
        const academics =  ChildRef.current.postAcademicProfile();
        axios.post(APP_URL+'/student/academics', academics).then((resp) => {
          if(resp.status === 200){
            setAlertData("Academics data updated successfully");
            setShowAlert(false);
          }
        })
       } else if (item === 2) {
        const financial =  ChildRef.current.postFinancial();
        axios.post(APP_URL+'/student/financial', financial).then((resp) => {
          if(resp.status === 200){
            setAlertData("Financial data updated successfully");
            setShowAlert(false);
          }
        })
       } else if (item === 3) {
        const preference = ChildRef.current.postPreference();
        axios.post(APP_URL+'/student/preference', preference).then((resp) => {
          if(resp.status === 200){
            setAlertData("Preferences data updated successfully");
            setShowAlert(false);
          }
        })
       }

       refetch();
    }

    const profile = data.data;
    const email = profile.email;
    const about = profile.about;
    const academics = profile.academics;
    const finance = profile.finance;
    const preferences = profile.preference;

    if(about === null || academics === null || finance === null || preferences === null){
      return <div>Something Went Wrong !!</div>
    }

    const AboutStudentData = {
      FirstName: about.firstname,
      LastName: about.lastname,
      Dob: about.dob,
      ResidentialStatus: about.residencystatus,
      Country: about.country,
      StreetAddress: about.streetaddress,
      City: about.city,
      State: about.state,
      StateISO: "",
      Zipcode: about.zip,
      EthenicOrigin: about.ethenicorigin,
      Gender: about.gender,
    };

    const AcademicProfileData = {
      NameofHighSchool: academics.nameofschool,
      HighSchoolGraduation: academics.graduationyear,
      LookingtoEnrollIn: academics.lookingtoenrollin,
      IncomingStatus: academics.incomingstatus,
      TypeOfDegree: academics.typeofdegree,
      TransferAs: academics.transferas,
      StudentClassRank: academics.studentclassrank,
      GpaType: academics.gpatype,
      ScoredGpa: academics.actualgpa,
      TotalGpa: academics.totalgpa,
      IB: academics.ib,
      IBScore: academics.ibscore,
      PsatMath: academics.psatmath,
      PsatReading: academics.psatread,
      SatMath: academics.satmath,
      SatReading: academics.satread,
      ActCompostite: academics.act,
    };

    const FinancialData = {
      ApplyingFinancialAid: finance.financialaid,
      MeritScholarShip: finance.meritbasedscholarship,
      WhoWillPayForCollege: finance.whowillpay,
      StudentExpectedIncome: finance.studentexpectedincome,
      GrossFamilyAnnualIncome: finance.grossfamilyincome,
      TotalFamilyNetWorth: finance.totalnetworth,
      AmountSaved: finance.amountsaved,
      MonthlyContribution: finance.plannedmonthly,
    };

    var PreferenceMotivationData = {
      CollegeType: preferences.collegetype,
      FieldOfStudy: preferences.fieldofstudy,
      ReligiousAffliation: preferences.religiousaffliations,
      SpecializedMission: preferences.specializedmission,
      Location: preferences.prefferedstates,
      SchoolSize: preferences.schoolsize,
      Urbanicity: preferences.urbancity,
      ReasonsToAttendCollege: preferences.reasonstoattend,
      KeyConsiderations: preferences.keyconsiderations,
      AffinityScore: preferences.affinityscore,
      AffordabilityScore: preferences.affordabilityscore,
      AdmissibilityScore: preferences.admissibilityscore,
    };

    const handleShowItem = (index) => {
      setShowAlert(true);
      if(index === 0){
        dispatch(actions.addAboutData(AboutStudentData))
      }else if(index === 1){
        dispatch(actions.addAcademicsData(AcademicProfileData))
      }else if(index === 2){
        dispatch(actions.addFinanceData(FinancialData))
      }else if(index === 3){
        dispatch(actions.addPreferenceData(PreferenceMotivationData))
      }
      setItem(index);
    }
    const handleHaveErrorProfile = (val) => {
      setHaveError(val);
    };
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <br/>
          <List>
            {['About', 'Academics', 'Finance', 'Preference'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => handleShowItem(index)}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }} >
         <div  style={item === -1 ? { display: "block" }: { display: "none" }}>
          <h3> Hello, {AboutStudentData.FirstName} {AboutStudentData.LastName} <span style={{float: 'right', fontSize: '0.4em'}}>{email.email}</span></h3>
        </div>
        <div  style={item === 0 ? { display: "block" }: { display: "none" }}>
          <DemographicInformation ref={ChildRef} handleError={handleHaveErrorProfile}/>
        </div>
        <div  style={item === 1 ? { display: "block" }: { display: "none" }}>
          <AcademicProfile ref={ChildRef} handleError={handleHaveErrorProfile}/>
        </div>
        <div  style={item === 2 ? { display: "block" }: { display: "none" }}>
          <FinancialInformation ref={ChildRef} handleError={handleHaveErrorProfile}/>
        </div>
        <div  style={item === 3 ? { display: "block" }: { display: "none" }}>
          <PreferencesAndMotivation ref={ChildRef} handleError={handleHaveErrorProfile}/>
        </div>
        <br/>
        <Alert variant='standard' severity='success' hidden={showAlert}>{alertData}</Alert> <br/>
        <Button style={{float: 'right'}} disabled={haveError === 'true'?true: false} hidden={item === -1? true: false} variant='contained' onClick={updateItemData}>Save</Button>
      </Box>
    </Box>
  );
}
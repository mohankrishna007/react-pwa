import * as Names from '../Constants/ReactQueryConsts';
import * as Functions from '../Queries/ProfileHttpRequests';

import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function ProfileCompletionGreeting(){

    const profile = useSelector((state) => state.profile);

    const FirstName  = profile.about.FirstName;
    const LastName  = profile.about.LastName;

    useQueries([
        {queryKey: Names.ABOUT, queryFn: () => Functions.postStudentAbout(profile.about)},
        {queryKey: Names.ACADEMICS, queryFn: () => Functions.postStudentAcademics(profile.academics)},
        {queryKey: Names.FINANCE, queryFn: () => Functions.postStudentFinance(profile.finance)},
        {queryKey: Names.PREFERENCE, queryFn: () => Functions.postStudentPreference(profile.preference)},
        {queryKey: Names.UPDATEPROFILE, queryFn: Functions.updateProfileCompletetion},
    ])

    localStorage.setItem("profile-filled", 1);

    return(
        <div>
            <center>Hey {FirstName} {LastName}, Thank you for completing profile.</center>
            <center> <Link to ='dashboard'>Goto DashBoard </Link></center>
        </div>
    )
}

export default ProfileCompletionGreeting;
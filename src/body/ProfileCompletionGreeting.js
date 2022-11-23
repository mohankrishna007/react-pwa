import * as Names from '../Constants/ReactQueryConsts';
import * as Functions from '../Queries/ProfileHttpRequests';

import { useQueries } from "react-query";
import { Link } from "react-router-dom";

function ProfileCompletionGreeting(){
    const about = JSON.parse(localStorage.getItem("about_student"));
    const academics = JSON.parse(localStorage.getItem("academic_profile"));
    const finance = JSON.parse(localStorage.getItem("financial_info"));
    const preference = JSON.parse(localStorage.getItem("preference_motivation"));

    useQueries([
        {queryKey: Names.ABOUT, queryFn: () => Functions.postStudentAbout(about)},
        {queryKey: Names.ACADEMICS, queryFn: () => Functions.postStudentAcademics(academics)},
        {queryKey: Names.FINANCE, queryFn: () => Functions.postStudentFinance(finance)},
        {queryKey: Names.PREFERENCE, queryFn: () => Functions.postStudentPreference(preference)},
    ])

    localStorage.setItem("profile-filled", true)

    return(
        <div>
            <center> Thanks for filling profile !!</center>
            <center> <Link to ='dashboard'>Goto DashBoard </Link></center>
        </div>
    )
}

export default ProfileCompletionGreeting;
import { Link } from "react-router-dom";

function ProfileCompletionGreeting(){
    return(
        <div>
            <center> Thanks for filling profile !!</center>
            <center> <Link to ='dashboard'>Goto DashBoard </Link></center>
        </div>
    )
}

export default ProfileCompletionGreeting;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function EmailVerify() {
    const param = useParams();

    const [data, setData] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(param.id + " "+ param.token)
        const verifyEmailUrl = async () => {
			try {
				const url = `https://collegeportfoliobackendnode.azurewebsites.net/auth/users/${param.id}/verify/${param.token}`;
				const resp =  await axios.post(url, {});
                console.log(resp)
                setData(resp);
			} catch (error) {
				setData(error.response);
			}
		};
		verifyEmailUrl();
    }, [param.id, param.token, navigate])

    return(
        <div>
            {(data===null)?(
                <div>
                    <center><p>Activating...</p></center>
                </div>
            ):(
               <center> 
                {data.data.message} 
                <br/>
                {(data.status === 201)?(<Link to={'/login'}>Please click here to Login</Link>):("")}
               </center>
            )}
        </div>
    )
}

export default EmailVerify;

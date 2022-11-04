import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LinearProgress from '@mui/material/LinearProgress';


function EmailVerify() {
    const param = useParams();

    const [data, setData] = useState(null);
    
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
    }, [param.id, param.token])

    return(
        <div>
            {(data===null)?(
                <div>
                    <LinearProgress />
                    <h1> Please Wait we are activating your Acount...</h1>
                </div>
            ):(
                JSON.stringify(data.data)
            )}
        </div>
    )
}

export default EmailVerify;
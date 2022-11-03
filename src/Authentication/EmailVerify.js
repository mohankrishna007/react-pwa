import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LinearProgress from '@mui/material/LinearProgress';
import { Image } from "react-bootstrap";


function EmailVerify() {
    const param = useParams();

    const [data, setData] = useState(null);
    
    useEffect(() => {
        const verifyEmailUrl = async () => {
			try {
				const url = `https://collegeportfoliobackendnode.azurewebsites.net/auth/users/${param.id}/verify/${param.token}`;
				const resp =  await axios.get(url);
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
                (data.status === 201)?(
                    <Image style={{maxWidth: '90%', margin: '0 auto'}} src="https://cdn.dribbble.com/users/6659664/screenshots/15750262/group_13064_4x.png"></Image>
                ):(
                    <Image style={{maxWidth: '90%', margin: '0 auto'}} src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"></Image>
                )
            )}
        </div>
    )
}

export default EmailVerify;
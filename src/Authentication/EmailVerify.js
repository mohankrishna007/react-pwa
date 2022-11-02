import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function EmailVerify() {
    const param = useParams();

    const [data, setData] = useState("");
    
    useEffect(() => {
        const verifyEmailUrl = async () => {
			try {
				const url = `https://collegeportfoliobackendnode.azurewebsites.net/auth/users/${param.id}/verify/${param.token}`;
				const resp =  await axios.get(url);
                setData(JSON.stringify(resp.data));
			} catch (error) {
				setData(JSON.stringify(error.response.data));
			}
		};
		verifyEmailUrl();
    }, [param])

    return(
        <div>
            {data === ""?"Loading...": data}
        </div>
    )
}

export default EmailVerify;
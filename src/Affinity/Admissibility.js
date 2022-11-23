import * as Names from '../Constants/ReactQueryConsts';
import * as Functions from '../Queries/3AScores';

import { useQuery } from "react-query"
import { useLocation } from 'react-router';
import { useState } from 'react';

function Admissibility() {

    const location = useLocation();
    const [data, setData] = useState([]);

    useQuery(Names.Admissibility, () => Functions.getAdmissibilityScore(location.state.colleges),
        {
            onSuccess: ((data) => {setData(data?.data.data)}),
            onError: ((error) => console.log("ERROR: "+error))
        })

    return (
    <div>
        {data.map((ele) => (
            <b>{ele}<br/></b>
        ))}
    </div>
    )
}

export default Admissibility;
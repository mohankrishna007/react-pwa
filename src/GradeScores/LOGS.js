import * as Names from '../Constants/ReactQueryConsts';
import * as Functions from '../Queries/3AScores';

import { useQuery } from "react-query"
import { useLocation } from 'react-router';
import { useState } from 'react';

function LOGS() {

    const location = useLocation();
    const [affinity, setAffinity] = useState([]);
    const [admissibility, setAdmissibility] = useState([]);
    const [affordability, setAffordability] = useState([]);

    useQuery(Names.Admissibilitylogs, () => Functions.getAdmissibilityLogs(location.state.colleges),
        {
            onSuccess: ((data) => {setAdmissibility(data?.data)}),
            onError: ((error) => console.log("ERROR: "+error))
        }) 
    useQuery(Names.affinityogs, () => Functions.getAffinityLogs(location.state.colleges),
        {
            onSuccess: ((data) => {setAffinity(data?.data)}),
            onError: ((error) => console.log("ERROR: "+error))
        })

    useQuery(Names.Affordabilitylogs, () => Functions.getAffordabilityLogs(location.state.colleges), 
    {
        onSuccess: ((data) => setAffordability(data?.data)),
        onError: () => console.log("ERROR ON GETTING AFFODABILITY LOGS")
    })

    return (
    <div>
        <h1>AFFORDABILITY</h1>
        {affordability.map((ele) => (
            <b>{ele}<br/></b>
        ))}

        <br /><br/>
        <h1>AFFINITY</h1>
        {affinity.map((ele) => (
            <b>{ele}<br/></b>
        ))}

        <br /><br/>
        <h1>ADMISSABILITY</h1>
        {admissibility.map((ele) => (
            <b>{ele}<br/></b>
        ))}
    </div>
    )
}

export default LOGS;
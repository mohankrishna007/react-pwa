import { useState } from "react";

export default function(props){
    const [About, setAbout] = useState(null)
    const [AcademicProfile, setAcademicProfile] = useState(null);
    const [Finance, setFinance] = useState(null);
    const [Preferece, setPreference] = useState(null);

    const handleSetAbout = (value) => {
        setAbout(value);
    }

    const handleSetAcademicProfile = (value) => {
        setAcademicProfile(value);
    }

    const handleSetFinance = (value) => {
        setAbout(value);
    }

    const handlesetAbout = (value) => {
        setAbout(value);
    }
}
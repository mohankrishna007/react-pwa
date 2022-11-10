import { LinearProgress } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { Button } from "react-bootstrap";




function NearbyAirports(){

    const[counter, setCounter] = useState(0);
    const[clicked, setClicked] = useState(false);

    const normalise = (value) => ((value - 0) * 100) / (6662 - 0);

    const handleGetAirports = async () => {
        setClicked(true);

        var count = 0;

        var resp = await axios.get('http://localhost:5000/college/getcollegelocation');
        var data = resp.data;
        var result = [];

        for (let index = 3500; index < data.length; index++) {
            const element = data[index];
            var airport = await handleGetAirportByLongLat(element.LATITUDE, element.LONGITUDE);
            var item ={
                "UNITID": element.UNITID,
                "Airport": airport
            }
            result.push(item);

            if(count%500 === 0){
                fileDownload(JSON.stringify(result), "NearbyAirports"+count+".json");
            }

            ++count;
            setCounter(count)
        }

        fileDownload(JSON.stringify(result), "NearbyAirports.json");
        console.log(result)
    }

    const handleGetAirportByLongLat = async (lat, lon) => {
        if(lat === 'NULL' || lon === 'NULL'){
            lat = 0;
            lon = 0;
        }
        var url = "https://atlas.microsoft.com/search/poi/category/json?subscription-key=GcktHETY0ASkAYYFSg5WKG29wdpsaffsvruoQvYOUFk&api-version=1.0&query=AIRPORT&limit=1&lat="+lat+"&lon="+lon;
        var resp = await axios.get(url);

        var Result = {
            name: "",
            distance: ""
        }

        var actualGeo = lat+","+lon;
        var targetGeo = "";

        if(resp.status === 200){
            var data = resp.data.results[0];
            var name = data.poi.name;
            var airportlat = data.position.lat;
            var airportlon = data.position.lon;

            targetGeo = airportlat+","+airportlon;
            var distance = await handleFindDistance(actualGeo, targetGeo);

            Result.name = name;
            Result.distance = distance;
        }

        return Result;
    }

    const handleFindDistance = async (actualGeo, targetGeo) => {
        var url = "https://us.atlas.microsoft.com/spatial/greatCircleDistance/json?subscription-key=GcktHETY0ASkAYYFSg5WKG29wdpsaffsvruoQvYOUFk&api-version=1.0&limit=1&query="+actualGeo+":"+targetGeo;
        var distance = 0;
        var resp = await axios.get(url);
        if(resp.status === 200){
            var data = resp.data.result.distanceInMeters;
            distance = data;
        }

        return distance;
    }

    return(
        <div>
            <h1> Nearby Airports</h1>
            <h2> I can smartly find nearby airports of institutes</h2>

            <Button onClick={handleGetAirports} disabled={clicked}> Wanna see Click Me</Button>
            <br/><br/>
            {counter} Processing...

            <LinearProgress variant="determinate" value={normalise(counter)} />
        </div>
    )
}

export default NearbyAirports;
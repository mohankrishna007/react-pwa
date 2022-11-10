import { LinearProgress } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { Button } from "react-bootstrap";


import Airports from './Nearby.json'



function NearbyAirports(){

    const[counter, setCounter] = useState(0);
    const[clicked, setClicked] = useState(false);

    const normalise = (value) => ((value - 0) * 100) / (6662 - 0);

    const handleGetAirports = async () => {
        setClicked(true);

        var result = [];
        var count = 0;

        var data = localStorage.getItem("loc");
        if(data === null){
             var resp = await axios.get('https://collegeportfoliobackendnode.azurewebsites.net/college/getcollegelocation');
            data = resp.data;
            localStorage.setItem("loc", data);
        }

        data = JSON.parse(data)

        for (let index = 0; index < data.length; index++) {
            ++count;
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
        var url = "https://atlas.microsoft.com/search/poi/category/json?subscription-key=GcktHETY0ASkAYYFSg5WKG29wdpsaffsvruoQvYOUFk&api-version=1.0&query=AIRPORT&categorySet=7383002,7383003,7383005&radius=241402&lat="+lat+"&lon="+lon;
        var resp = await axios.get(url);

        var Airports =[];

        if(resp.status === 200){
            var data = resp.data;
            data.results.map((opt) => {
                var Result = {
                    name: "",
                    category: "",
                    local: "",
                    distance: "",
                    lat: "",
                    lon: "",
                }

                Result.name = opt.poi.name;
                Result.category = opt.poi.categorySet[0].id;
                Result.local = opt.address.localName;
                Result.distance = opt.dist;
                Result.lat = opt.position.lat;
                Result.lon = opt.position.lon;
                
                Airports.push(Result)
            })
        }

        return Airports;
    }

    const jsontocsv = () =>{

        var txt = "";

        for(let i =0; i<Airports.length; i++){

            var option = Airports[i];

             option.Airport.map((airport) => {
                txt += option.UNITID+","
                txt += airport.name+","
                txt += airport.category+","
                txt += airport.distance+","
                txt += airport.local+","
                txt += airport.lat+","
                txt += airport.lon

                txt += "\n";
             })
        }

        console.log(txt);

        fileDownload(txt, "Airports.csv");

    }

    return(
        <div>
            <h1> Nearby Airports</h1>
            <h2> I can smartly find nearby airports of institutes</h2>

            {/* <Button onClick={handleGetAirports} disabled={clicked}> Wanna see Click Me</Button>
            <br/><br/>
            {counter} Processing...

            <LinearProgress variant="determinate" value={normalise(counter)} /> */}

            <Button onClick={jsontocsv}>Convert</Button>
        </div>
    )
}

export default NearbyAirports;
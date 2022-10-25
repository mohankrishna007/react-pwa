import axios from "axios";
import React from "react";
import { useLocation } from "react-router";

function DashBoard() {
  var fileDownload = require('js-file-download');

  const { state } = useLocation();

  const getStudentData = () =>{
    axios.get('https://collegeportfoliobackendnode.azurewebsites.net/student/getStudent/'+String(state.id))
    .then((resp) => {
        for (let obj in resp.data){
            fileDownload(JSON.stringify(resp.data[obj]), state.id+'.json');
        }
    });
  }

  return (
    <div>
      {state === null ? (
        <h2>Something went wrong</h2>
      ) : (
        <div>
          <h1>Hey Hello ,</h1>
          <h2>CollegePortFolio Welcomes You !!</h2> <br/>
          <p>
            <span onClick={getStudentData}>Click Here to download data</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default DashBoard;

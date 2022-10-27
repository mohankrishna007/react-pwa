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

  const about = JSON.parse(localStorage.getItem('about_student'))
  const academics = localStorage.getItem('academic_profile')
  const finance = localStorage.getItem('financial_info')
  const preference = localStorage.getItem('preference_motivation')

  return (
    <div>
      {state === null|about == null ? (
        <h2>Something went wrong</h2>
      ) : (
        <div>
          <h1>Hey Hello , {about.FirstName} {about.LastName}</h1>
          <h2>CollegePortFolio Welcomes You !!</h2> <br/>
          <h4>You Data is here : </h4>
          <p>{JSON.stringify(about)}</p><br/>
          <p>{academics}</p> <br/>
          <p>{finance}</p><br/>
          <p>{preference}</p>

          <h4> Sent data to DB</h4>
          <p>
            <span onClick={getStudentData}>Click Here to download data</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default DashBoard;

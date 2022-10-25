import React from "react";
import DialogBox from "./body/DialogBox";

const uuid = require('uuid');
const newId = uuid.v4();

class Home extends React.Component{

    render(){
        return(
            <div>
                <h1> WEB PAGE CONTENT HERE </h1>
                <DialogBox UserId={newId}/>
            </div>
        );
    }
}

export default Home;
import React from "react";
import DialogBox from "./body/DialogBox";
import PrefetchDropdownData from "./PrefetchData/PrefetchDropdownData";

class Home extends React.Component{
    render(){
        return(
            <div>
                <PrefetchDropdownData /> 
                <DialogBox/>
            </div>
        );
    }
}

export default Home;
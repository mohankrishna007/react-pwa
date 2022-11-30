import { Button } from "@material-ui/core";

function ScheduleAppointment() {

    const navigateToShedule =() => {
        window.open('https://mytestdemo.godaddysites.com/appointment', '_blank').focus();
    }
    return(
        <div>
            <Button onClick={navigateToShedule}>Book appointment</Button>
        </div>
    )
}


export default ScheduleAppointment;
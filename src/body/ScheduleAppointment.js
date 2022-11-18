import { Button } from "@material-ui/core";

function ScheduleAppointment() {

    const navigateToShedule =() => {
        window.open('https://mytestdemo.godaddysites.com/appointment', '_blank').focus();
    }
    return(
        <div>
            <h1> Schedule an appointment now !!</h1>
            <Button onClick={navigateToShedule}>Book appointment</Button>
            <BookAppointment src={"https://mytestdemo.godaddysites.com/appointment"}/>
        </div>
    )
}

function BookAppointment(props) {
    return(
        <iframe src={props.src} height={500} width={500}></iframe>
    )
}

export default ScheduleAppointment;
import React from "react";
import "./App.css";
import Home from "./Home";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Header/Header";
import DashBoard from "./body/DashBoard";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import EmailVerify from "./Authentication/EmailVerify";
import ForgetPassword from "./Authentication/ForgetPassword";
import Affinitty from "./Affinity/Affinity";
import NearbyAirports from "./NearbyAirports/NearbyAirports";
import Threea from "./Affinity/Threea";
import PageNotFound from "./PageNotFound";
import ScheduleAppointment from "./body/ScheduleAppointment";
import AccessDenied from './AccessDenied';

class App extends React.Component {
  render() {
    const user = localStorage.getItem("token");

    return (
        <div className="App">
          <Header />
          <br />
          <div className="content">
            <Routes>
              <Route path="/" element={user? <Home />: <Navigate replace to="/login" />} />
              <Route
                path="dashboard"
                element={
                  user ? <DashBoard /> : <Navigate replace to="/login" />
                }
              />
              <Route
                path="login"
                element={user ? <Navigate replace to="/" /> : <Login />}
              />
              <Route
                path="register"
                element={user ? <Navigate replace to="/" /> : <Register />}
              />
              <Route path="reset/:id/:token" element={<ForgetPassword />} />
              <Route path="users/:id/verify/:token" element={<EmailVerify />} />
              <Route
                path="affinity"
                element={user ? <Affinitty /> : <Navigate replace to="/" />}
              />
              <Route path='schedule' element={<ScheduleAppointment />} />
              <Route path="nearbyairports" element={<NearbyAirports />} />
              <Route path="threea" element={<Threea />} />
              <Route path="accessdenied" element={<AccessDenied />}/>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
    );
  }
}

export default App;

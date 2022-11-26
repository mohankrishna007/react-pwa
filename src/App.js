import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import Header from "./Header/Header";
import DashBoard from "./body/DashBoard";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import EmailVerify from "./Authentication/EmailVerify";
import ForgetPassword from "./Authentication/ForgetPassword";
import Affinitty from "./Affinity/Affinity";
import NearbyAirports from "./NearbyAirports/NearbyAirports";
import Threea from "./Affinity/Threea";
import PageNotFound from "./Utils/PageNotFound";
import ScheduleAppointment from "./body/ScheduleAppointment";
import AccessDenied from "./Utils/AccessDenied";
import Admissibility from "./Affinity/Admissibility";
import DialogBox from './body/DialogBox'
import AdmissibilityLogs from "./Affinity/AdmissibilityLogs";
import Profile from "./body/Profile";
import PATable from "./Admin/PATable";

class App extends React.Component {
  render() {
    const user = localStorage.getItem("token");
    const profile_filled = localStorage.getItem("profile-filled")

    const queryClient = new QueryClient()
    return (
      <div className="App">
        <Header />
        <br />
        <div className="content">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route
                path="/"
                element={user ? (String(profile_filled) === '1'?
                <Navigate replace to="/dashboard"/>: <DialogBox />):
                <Navigate replace to="/login" />}
              />
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
              <Route
                path="admissibility"
                element={user ? <Admissibility /> : <Navigate replace to="/" />}
              />
              <Route
                path="admissibilitylogs"
                element={user ? <AdmissibilityLogs /> : <Navigate replace to="/" />}
              />
              <Route
                path="profile"
                element={user ? <Profile /> : <Navigate replace to="/" />}
              />
              <Route
                path="patable"
                element={user ? <PATable /> : <Navigate replace to="/" />}
              />
              <Route path="schedule" element={<ScheduleAppointment />} />
              <Route path="nearbyairports" element={<NearbyAirports />} />
              <Route path="threea" element={<Threea />} />
              <Route path="accessdenied" element={<AccessDenied />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
          </QueryClientProvider>
        </div>
      </div>
    );
  }
}

export default App;

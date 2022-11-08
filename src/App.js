import React from "react";
import "./App.css";
import Home from "./Home";
import {
  BrowserRouter as Router,
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

class App extends React.Component {

  render() {
    const user = localStorage.getItem("token");

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header />
          <br />
          <div className="content">
            <Routes>
              {user && <Route path="/" exact element={<Home />} />}
              <Route path="/" element={<Navigate replace to="/login" />} />
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
              <Route path="/affinity" element={<Affinitty />}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import '../styles/Header/Header.css'
import { Link } from "react-router-dom";
import LOGO from '../logo.svg';
import { Image } from "react-bootstrap";

export default function Header() {
	const user = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	}

return (
	<AppBar position="sticky">
		<Toolbar>
		<Image src={LOGO} width={(window.innerWidth<768)?"50%": "20%"} height={"80%"}></Image>
		<div style={{flexGrow:1}}></div>
		{
			user?<Link onClick={handleLogout}  className="btn btn-primary" style={{marginRight: '20px'}}>Logout</Link>:
			<Link to="/register" className="btn btn-primary" style={{marginRight: '20px'}}>Register</Link>
		}
		</Toolbar>
	</AppBar>
);
}

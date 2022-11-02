import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import '../styles/Header/Header.css'
import { Link } from "react-router-dom";

export default function Header() {
	const user = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	}

return (
	<AppBar position="sticky">
		<Toolbar>
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2 }}>
			<MenuIcon />
		</IconButton>
		<Typography variant="h6"
			component="div" sx={{ flexGrow: 1 }}>
			Collegeportfolio
		</Typography>
			{
			user?<Link onClick={handleLogout}  className="btn btn-primary" style={{marginRight: '20px'}}>Profile</Link>:
			<Link to="/register" className="btn btn-primary" style={{marginRight: '20px'}}>Logout</Link>
			}
		</Toolbar>
	</AppBar>
);
}

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/Header/Header.css'
import { useNavigate } from "react-router-dom";
import LOGO from '../logo.svg';
import { Image } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';

const drawerWidth = 240;
const navItems = ['Home', 'Schedule', 'Profile', 'Register'];

const user = localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem('profile-filled')
  window.location.href = '/';
}

function Header(props) {
  const { window } = props;
  const navigate = useNavigate();

  
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useState(() => {
    if(user){
      navItems[navItems.length-1] = 'Logout';
    }else{
      navItems[navItems.length-1] = 'Register';
    }
  }, user)

  const handleNavbarOption = (index) => {
    if(index === 0){
      navigate("/");
    }else if(index === 1){
      navigate('/schedule');
    }else if(index === 2){
      navigate('/profile')
    }else if(index === navItems.length-1){
      if(navItems[navItems.length-1] === 'Register'){
        navigate('register');
      }else{
        handleLogout();
      }
    }
  }


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CollegePortfolio
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item}  onClick={() => handleNavbarOption(navItems.indexOf(item))}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
		  	<Image src={LOGO} width={"20%"} style={{display: { xs: 'none', sm: 'block' } }}></Image>
			  <div style={{flexGrow:1}}></div>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => handleNavbarOption(navItems.indexOf(item))}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
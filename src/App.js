import './App.css';
import Customerdetails from './components/customerDetails'
import ExistingCustomerDetails from './components/ExistingCustomerDetails';
import React, { useCallback, useState } from 'react';
import {
  Container, Box, Button, Typography, AppBar, Toolbar,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  CssBaseline, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import B2B from './components/B2B';
import CustomerShipmentItemsBillRUD from './components/customerShipmentItemsBillRUD'
// import Editcustomershipitembill from '../src/screens/Editcustomershipitembill'

const minDrawerWidth = 200;
const maxDrawerWidth = 400;

function App() {
  const [view, setView] = useState('menu');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setMobileOpen(false);
  };
  const handleMouseDown = useCallback((e) => {
    document.addEventListener('mouseup', handleMouseUp, true)
    document.addEventListener('mousemove', handleMouseMove, true)
  }, []);
  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  };
  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  const drawer = (
    <Box sx={{ backgroundColor: 'white', height: '100%' }}>
      <Toolbar />
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, view: 'menu' },
          { text: 'Create New Customer', icon: <AddIcon />, view: 'create' },
          { text: 'Edit/Delete Customer', icon: <EditIcon />, view: 'edit' },
          { text: 'B2B', icon: <BusinessIcon />, view: 'b2b' },
          { text: 'Edit/delete Existing details', icon: <BusinessIcon />, view: 'EDED' },
        ].map((item) => (
          <ListItem button key={item.text} onClick={() => handleViewChange(item.view)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderContent = () => {
    switch (view) {
      case 'create':
        return <Customerdetails />;
      case 'edit':
        return <ExistingCustomerDetails />;
      case 'b2b':
        return <B2B />;
      case 'EDED':
        return <CustomerShipmentItemsBillRUD />;
      default:
        return (
          <Typography variant="h6" sx={{ mt: 30, textAlign: 'center',fontSize:'30px'}}>
            Welcome to Customer Management
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
          <Typography variant="h6" noWrap component="div">
            Customer Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              overflowX: 'hidden',
              transition: 'width 0.3s',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}

        sx={(theme) => ({
          display: { xs: 'none', sm: 'block' }, // Hide on xs screens, show on sm and up

          height: '100vh',
          width: '5px',
          cursor: 'ew-resize',
          position: 'fixed',
          top: 0,
          left: drawerWidth,
          zIndex: theme.zIndex.drawer - 1,
          backgroundColor: isHovering ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
          transition: 'background-color 0.3s',
          '&::before': {
            content: '""',
            display: 'block',
            height: theme.mixins.toolbar.minHeight,
            [theme.breakpoints.up('sm')]: {
              height: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight,
            },
          },
        })}
        onMouseDown={handleMouseDown}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        onMouseEnter={() => {
          if (drawerWidth <= 60) setDrawerWidth(240);
        }}
      >
        <Toolbar />
        <Container>
          {renderContent()}

        </Container>
      </Box>
    </Box>
  );
}

export default App;
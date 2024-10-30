import "./App.css";
import { useCallback, useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptIcon from "@mui/icons-material/Receipt";

// Import components
import Customerdetails from "./components/customerDetails";
import B2B from "./components/B2B";
import CompanyDetails from "./components/MyCompanyDetails";
import Home from "./components/Home";
import ErrorBoundary from './components/ErrorBoundary';  // You'll need to create this

// Constants
const MIN_DRAWER_WIDTH = 200;
const MAX_DRAWER_WIDTH = 400;
const DEFAULT_DRAWER_WIDTH = 240;

// Navigation items configuration
const NAV_ITEMS = [
  { text: "Home", icon: <HomeIcon />, view: "menu" },
  { text: "My Company Details", icon: <BusinessIcon />, view: "companyDetails" },
  { text: "Create Client Details", icon: <AddIcon />, view: "create" },
  { text: "Invoice", icon: <ReceiptIcon />, view: "b2b" },
];

// Drawer component extracted for better organization
const NavigationDrawer = ({ onViewChange, width }) => (
  <Box sx={{ backgroundColor: "white", height: "100%" }}>
    <Toolbar />
    <List>
      {NAV_ITEMS.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => onViewChange(item.view)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  </Box>
);

NavigationDrawer.propTypes = {
  onViewChange: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

function BillingApp() {
  const [view, setView] = useState("menu");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(DEFAULT_DRAWER_WIDTH);
  const [isHovering, setIsHovering] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Event handlers with proper cleanup
  useEffect(() => {
    if (isResizing) {
      const handleMouseMove = (e) => {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth >= MIN_DRAWER_WIDTH && newWidth <= MAX_DRAWER_WIDTH) {
          setDrawerWidth(newWidth);
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleViewChange = useCallback((newView) => {
    setView(newView);
    setMobileOpen(false);
  }, []);

  // Memoized content rendering
  const renderContent = useMemo(() => {
    const components = {
      create: Customerdetails,
      b2b: B2B,
      companyDetails: CompanyDetails,
      menu: Home,
    };
    
    const Component = components[view] || components.menu;
    return <Component />;
  }, [view]);

  // Memoized drawer component
  const drawer = useMemo(() => (
    <NavigationDrawer onViewChange={handleViewChange} width={drawerWidth} />
  ), [handleViewChange, drawerWidth]);

  return (
    <ErrorBoundary>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Invoice Generator
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Navigation Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                overflowX: "hidden",
                transition: "width 0.3s",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Resize Handle */}
        <Box
          role="separator"
          aria-valuenow={drawerWidth}
          aria-valuemin={MIN_DRAWER_WIDTH}
          aria-valuemax={MAX_DRAWER_WIDTH}
          aria-label="Resize drawer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={(theme) => ({
            display: { xs: "none", sm: "block" },
            height: "100vh",
            width: "5px",
            cursor: "ew-resize",
            position: "fixed",
            top: 0,
            left: drawerWidth,
            zIndex: theme.zIndex.drawer - 1,
            backgroundColor: isHovering || isResizing ? "rgba(0, 0, 0, 0.1)" : "transparent",
            transition: "background-color 0.3s",
            "&::before": {
              content: '""',
              display: "block",
              height: theme.mixins.toolbar.minHeight,
              [theme.breakpoints.up("sm")]: {
                height: theme.mixins.toolbar[theme.breakpoints.up("sm")].minHeight,
              },
            },
          })}
          onMouseDown={handleMouseDown}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Container>
            {renderContent}
          </Container>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default BillingApp;
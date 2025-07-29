import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Details from './pages/Details';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setIsAuthenticated(false);
      setUserRole(null);
      navigate('/');
    };
  return (
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 1, color: '#1976d2' }} />
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 700 }}>
            VCET Connect
          </Typography>
          <Button color="primary" component={Link} to="/" sx={{ mx: 1 }}>
            Home
          </Button>
          {/* Show Register and Login only when not authenticated */}
          {!isAuthenticated && (
            <>
          <Button color="primary" component={Link} to="/register" sx={{ mx: 1 }}>
            Register
          </Button>
          <Button color="primary" component={Link} to="/login" sx={{ mx: 1 }}>
            Login
          </Button>
            </>
          )}
          {/* Show Dashboard and Profile only when authenticated and not admin */}
          {isAuthenticated && userRole !== 'admin' && (
            <>
          <Button color="primary" component={Link} to="/dashboard" sx={{ mx: 1 }}>
            Dashboard
          </Button>
          <Button color="primary" component={Link} to="/details" sx={{ mx: 1 }}>
            Profile
          </Button>
              <Button color="primary" onClick={handleLogout} sx={{ mx: 1 }}>
                Logout
              </Button>
            </>
          )}
          {/* Show only Home and Logout for admin */}
          {isAuthenticated && userRole === 'admin' && (
            <>
              <Button color="primary" component={Link} to="/admin" sx={{ mx: 1 }}>
                Admin
              </Button>
              <Button color="primary" onClick={handleLogout} sx={{ mx: 1 }}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Router>
      <NavBar />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;

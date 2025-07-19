import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Details from './pages/Details';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function App() {
  return (
    <Router>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 1, color: '#1976d2' }} />
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 700 }}>
            VCET Connect
          </Typography>
          <Button color="primary" component={Link} to="/" sx={{ mx: 1 }}>
            Home
          </Button>
          <Button color="primary" component={Link} to="/register" sx={{ mx: 1 }}>
            Register
          </Button>
          <Button color="primary" component={Link} to="/login" sx={{ mx: 1 }}>
            Login
          </Button>
          <Button color="primary" component={Link} to="/dashboard" sx={{ mx: 1 }}>
            Dashboard
          </Button>
          <Button color="primary" component={Link} to="/login?admin=true" sx={{ mx: 1 }}>
            Admin
          </Button>
          <Button color="primary" component={Link} to="/details" sx={{ mx: 1 }}>
            Profile
          </Button>
        </Toolbar>
      </AppBar>
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

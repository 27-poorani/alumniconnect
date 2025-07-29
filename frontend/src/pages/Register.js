import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { API_ENDPOINTS } from '../api/config';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Registration failed');
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
      // Reload the page to update navigation
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)' }}>
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="primary" gutterBottom align="center">
            Alumni Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required fullWidth margin="normal" />
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Already have an account?
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth 
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 600 }}
              >
              Login
            </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register; 
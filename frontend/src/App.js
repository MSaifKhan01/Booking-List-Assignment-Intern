















import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Container, Typography, Box, Button } from '@mui/material';
import AdminDashboard from './pages/AdminDashboard';
import GuestDashboard from './pages/GuestDashboard';
import RoleSelection from './components/RoleSelection';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
useEffect(() => {
  const tokenFromUrl = new URLSearchParams(window.location.search).get('token');
  if (tokenFromUrl) {
    console.log("📥 Token received from URL:", tokenFromUrl);
    localStorage.setItem('token', tokenFromUrl);
    const decoded = jwtDecode(tokenFromUrl);
    console.log("🧾 Decoded user:", decoded);
    setUser(decoded);
    navigate('/select-role');
  } else {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      console.log("📦 Token from localStorage:", decoded);
      setUser(decoded);
      if (storedRole) {
        console.log("🎭 Role from localStorage:", storedRole);
        setRole(storedRole);
        navigate('/dashboard');
      } else {
        navigate('/select-role');
      }
    }
  }
}, [navigate]);

const handleRoleSelect = async (selectedRole) => {
  console.log("🎭 Role selected:", selectedRole);
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/auth/set-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ role: selectedRole })
  });
  const result = await response.json();
  console.log("✅ Role API response:", result);

  localStorage.setItem('role', selectedRole);
  setRole(selectedRole);
  navigate('/dashboard');
};


  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome {role ? role : 'User'}
      </Typography>

      <Routes>
        <Route path="/" element={
          !user ? (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button onClick={() => window.location.href = 'http://localhost:5000/auth/google'}>
                Login with Google
              </Button>
            </Box>
          ) : (
            <Navigate to={role ? '/dashboard' : '/select-role'} />
          )
        } />

        <Route path="/select-role" element={<RoleSelection onSelect={handleRoleSelect} />} />
        <Route path="/dashboard" element={
          role === 'admin'
            ? <AdminDashboard onLogout={handleLogout} />
            : <GuestDashboard onLogout={handleLogout} />
        } />
      </Routes>
    </Container>
  );
}

export default App;

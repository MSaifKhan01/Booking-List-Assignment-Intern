import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  const navigate = useNavigate();
  

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt={10}>
      <Typography variant='h5'>Welcome, {name}!</Typography>
      <Typography variant='subtitle1'>You are logged in as <strong>{role}</strong></Typography>
      <Box mt={3}>
        {role === 'admin' ? (
          <Button variant='contained' onClick={() => navigate('/admin')}>Go to Admin Dashboard</Button>
        ) : (
          <Button variant='contained' onClick={() => navigate('/guest')}>Go to Guest Dashboard</Button>
        )}
      </Box>
      <Button onClick={logout} sx={{ mt: 3 }} variant='outlined'>Logout</Button>
    </Box>
  );
};

export default Home;

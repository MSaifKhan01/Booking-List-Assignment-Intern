import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, MenuItem, Select } from '@mui/material';

const SignIn = () => {
  const navigate = useNavigate();
  const [role, setRole] = React.useState("");

  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const token = credentialResponse.credential;

    // Choose role after Google auth
    if (!role) return alert('Please select role');
console.log("======----",role)
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', decoded.name);

    navigate('/home');
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt={10}>
      <Typography variant='h4'>Welcome! Sign in with Google</Typography>
      <Select value={role} onChange={(e) => setRole(e.target.value)} displayEmpty sx={{ mt: 2, width: 200 }}>
        <MenuItem value=''>Select Role</MenuItem>
        <MenuItem value='admin'>Admin</MenuItem>
        <MenuItem value='guest'>Guest</MenuItem>
      </Select>
      <Box mt={2}>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
      </Box>
    </Box>
  );
};

export default SignIn;

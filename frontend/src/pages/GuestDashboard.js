// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Grid, Paper,Button, } from '@mui/material';
// import api from '../services/api';

// const GuestDashboard = ({ onLogout }) => {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const res = await api.get('/forms');
//       console.log("===--====",res.data)
//       setData(res.data);

//     } catch (err) {
      
//       console.error('Fetch error:', err);
//     }
//   };
//   useEffect(() => {
//   fetchData()
//   }, []);

//   return (
//     <Box p={4}>
//       <Typography variant='h5'>Guest View</Typography>
//       <Grid container spacing={2} mt={2}>
//         {data.map((item) => (
//           <Grid item xs={12} md={6} key={item._id}>
//             <Paper elevation={2} sx={{ p: 2 }}>
//               <Typography>Name: {item.name}</Typography>
//               <Typography>Address: {item.address}</Typography>
//               <Typography>PIN: {item.pin}</Typography>
//               <Typography>Phone: {item.phone}</Typography>
//             </Paper>
//           </Grid>

//         ))}
//       </Grid>
//             <Button variant='outlined' onClick={onLogout} sx={{ ml: 'auto' }}>
//                 Logout
//               </Button>
//     </Box>
//   );
// };

// export default GuestDashboard;

















import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';

export default function GuestDashboard({ onLogout }) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const res = await fetch('https://booking-list-assignment-intern.onrender.com/forms', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setData(result.data);
    } catch (error) {
      console.error('❌ Error fetching forms:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Guest Dashboard</Typography>
        <Button onClick={onLogout} variant="outlined">Logout</Button>
      </Box>

      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} key={item._id}>
            <Paper sx={{ p: 2 }}>
              <Typography>Name: {item.name}</Typography>
              <Typography>Address: {item.address}</Typography>
              <Typography>PIN: {item.pin}</Typography>
              <Typography>Phone: {item.phone}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

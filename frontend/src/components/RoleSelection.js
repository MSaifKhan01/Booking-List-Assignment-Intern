// // src/components/RoleSelection.js

// import React from 'react';
// import { Button, Typography, Box } from '@mui/material';

// const RoleSelection = ({ onSelect }) => {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Please select your role
//       </Typography>
//       <Button variant="contained" color="primary" onClick={() => onSelect('admin')}>
//         Admin
//       </Button>
//       <Button variant="contained" color="secondary" onClick={() => onSelect('guest')}>
//         Guest
//       </Button>
//     </Box>
//   );
// };

// export default RoleSelection;




import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export default function RoleSelection({ onSelect }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Select Your Role
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => onSelect('admin')}
        sx={{ mb: 2, width: '100%' }}
      >
        Admin
      </Button>
      <Button 
        variant="contained" 
        onClick={() => onSelect('guest')}
        sx={{ width: '100%' }}
      >
        Guest
      </Button>
    </Box>
  );
}
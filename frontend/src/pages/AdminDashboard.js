import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function AdminDashboard({ onLogout }) {
  const [formData, setFormData] = useState({ name: '', address: '', pin: '', phone: '' });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/forms', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setData(result.data || []);
    } catch (error) {
      console.error('❌ Error fetching forms:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId
        ? `http://localhost:5000/forms/${editId}`
        : 'http://localhost:5000/forms';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.status >= 400) {
        alert(result.msg || 'Error submitting form');
        return;
      }

      if (editId) {
        setData(data.map(item => (item._id === editId ? result.data : item)));
        setEditId(null);
      } else {
        setData([...data, result.data]);
      }

      setFormData({ name: '', address: '', pin: '', phone: '' });
    } catch (error) {
      console.error('❌ Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/forms/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (res.status >= 400) {
        alert(result.msg || 'Failed to delete form');
        return;
      }

      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('❌ Error deleting form:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Admin Dashboard</Typography>
        <Button onClick={onLogout} variant="outlined">Logout</Button>
      </Box>

      {/* Form Fields */}
      <Box sx={{ mb: 3 }}>
        {['name', 'address', 'pin', 'phone'].map(field => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            fullWidth
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            sx={{ mb: 2 }}
          />
        ))}
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          {editId ? 'Update' : 'Submit'}
        </Button>
      </Box>

      {/* Display All Forms */}
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} key={item._id}>
            <Paper sx={{ p: 2 }}>
              <Typography>Name: {item.name}</Typography>
              <Typography>Address: {item.address}</Typography>
              <Typography>PIN: {item.pin}</Typography>
              <Typography>Phone: {item.phone}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => {
                  setFormData({
                    name: item.name,
                    address: item.address,
                    pin: item.pin,
                    phone: item.phone
                  });
                  setEditId(item._id);
                }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(item._id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

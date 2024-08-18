import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import '../componentStyles/customerDetails.css'
const ResponsiveTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '@media (min-width: 600px)': {
    // backgroundColor:'blue',
    width: '70%',
  },
  '@media (min-width: 960px)': {
    // backgroundColor:'red',
    width: '100%',
  },
}));
const CustomerForm = () => {
  const URl = 'https://shiroenterprise.onrender.com/api'
  // const URl='http://localhost:3001/api'
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    customerGst: '',
    phoneNumber: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('url is ', `${URl}/customers`)
    const response = await fetch(`${URl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast.success('Customer data saved');
      console.log('Customer data saved');
    } else {
      toast.error('Error saving customer data');
      console.log('Error saving customer data');
    }
    setFormData({
      name: '',
      address: '',
      customerGst: '',
      phoneNumber: ''
    });
  };
  const customerAttributes = ['name', 'address', 'customerGst', 'phoneNumber']
  return (
    <div className="customerDetailsMain">
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Customer Creation
          </Typography>
          {customerAttributes.map((field) => (
            <ResponsiveTextField
              key={field}
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              margin="normal"
            />
          ))}
          <Button type="submit" variant="contained" sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center', alignItems: 'center'
          }}>
            Submit
          </Button>
          <ToastContainer />
        </Box>
      </Container>
    </div>
  )
}
export default CustomerForm;

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, TextField, Button, Box, Autocomplete } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import ItemsTable from './ItemsTable';
import { styled } from '@mui/system';
import '../componentStyles/B2B.css'
function B2B() {
  const URl = 'https://shiroenterprise.onrender.com/api'
  // const URl='http://localhost:3001/api'
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    address: '',
    customerGst: '',
    phoneNumber: '',
  });
  useEffect(() => {
    // Fetch existing customer details
    axios.get(`${URl}/getExistingCustomerDetails`)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer details:', error);
      });
  }, []);
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleCustomerChange = (event, value) => {
    setSelectedCustomer(value);
    if (value) {
      setCustomerDetails({
        customerName: value.name,
        address: value.address,
        customerGst: value.customerGst,
        phoneNumber: value.phoneNumber,
      });
    } else {
      setCustomerDetails({
        customerName: '',
        address: '',
        customerGst: '',
        phoneNumber: '',
      });
    }
  };
  const handleSubmit = () => {
    // Logic to save the form data
    console.log('Saved data:', {
      date,
      ...customerDetails,
    });
  };
  //shipment functions
  const [shipmentDetails, setShipmentDetails] = useState({
    customerName: '',
    address: '',
    customerGst: '',
    phoneNumber: '',
    date: '',
  });
  const handleInputChange = (field, value) => {
    setShipmentDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  const handleCopyValues = () => {
    setShipmentDetails({
      customerName: customerDetails.customerName,
      address: customerDetails.address,
      customerGst: customerDetails.customerGst,
      phoneNumber: customerDetails.phoneNumber,
      date: date,
    });
  };
  const handleClearValues = () => {
    setShipmentDetails({
      customerName: '', address: '', customerGst: '', phoneNumber: '', date: '',
    });
  };
  return (
    <div className='B2BMain'>
      <Container>
        <Typography textAlign={'center'} variant="h4" component="h2" gutterBottom>
          Customer Details
        </Typography>
        <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={customers}
                getOptionLabel={(option) => option.name}
                value={selectedCustomer}
                onChange={handleCustomerChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer Name"
                    variant="filled"
                    margin="normal"
                    color="success"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="address"
                label="Address"
                variant="standard"
                value={customerDetails.address}
                onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="customerGst"
                label="Customer GST"
                variant="standard"
                value={customerDetails.customerGst}
                onChange={(e) => setCustomerDetails({ ...customerDetails, customerGst: e.target.value })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="standard"
                value={customerDetails.phoneNumber}
                onChange={(e) => setCustomerDetails({ ...customerDetails, phoneNumber: e.target.value })}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="date"
                label="Date"
                type="date"
                value={date}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save
        </Button> */}
          </Grid>
        </Box>
        <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
          <Button variant="contained" onClick={handleCopyValues}
            sx={{ mt: 1, mr: 2, backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}
          >
            Fill with Customer Details
          </Button>
          <Button variant="contained" onClick={handleClearValues}
            sx={{ mt: 1, backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
          >Clear Shipment Details</Button>
          <Typography sx={{ mt: 3, }}
            textAlign="center" variant="h4" component="h2" gutterBottom>
            Shipment Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="customerName"
                label="Shipment Name"
                variant="filled"
                value={shipmentDetails.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="address"
                label="Address"
                variant="standard"
                value={shipmentDetails.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="customerGst"
                label="Customer GST"
                variant="standard"
                value={shipmentDetails.customerGst}
                onChange={(e) => handleInputChange('customerGst', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="standard"
                value={shipmentDetails.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                variant="standard"
                id="date"
                label="Date"
                type="date"
                value={shipmentDetails.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>
        <ItemsTable customerDetails={customerDetails} date={date} shipmentDetails={shipmentDetails} />
      </Container>
    </div>
  );
}

export default B2B;

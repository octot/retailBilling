import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Button, TextField, Box } from '@mui/material';
import './TableStyles.css';
function ExistingCustomerDetails() {
  const URl='https://shiroenterprise.onrender.com/api'
  // const URl='http://localhost:3001/api'
  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    address: '',
    customerGst: '',
    phoneNumber: ''
  });
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`${URl}/getExistingCustomerDetails`);
      const data = await response.json();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);
  const handleEditClick = (customer) => {
    setEditId(customer._id);
    setEditFormData({
      name: customer.name,
      address: customer.address,
      customerGst: customer.customerGst,
      phoneNumber: customer.phoneNumber
    });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  const handleSaveClick = async (id) => {
    const response = await fetch(`${URl}/editExistingCustomerDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    });

    if (response.ok) {
      const updatedCustomers = customers.map((customer) =>
        customer._id === id ? { ...customer, ...editFormData } : customer
      );
      setCustomers(updatedCustomers);
      setEditId(null);
    } else {
      console.log('Error saving customer data');
    }
  };
  const handleDeleteClick = async (id) => {
    const response = await fetch(`${URl}/deleteExistingCustomerDetails/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setCustomers(customers.filter((customer) => customer._id !== id));
    } else {
      console.log('Error deleting customer data');
    }
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TextField
          value={search}
          onChange={handleSearchChange}
          placeholder="SearchName"
          variant="standard"
          sx={{
            width: '200px',
            '& .MuiInput-underline:before': {
              borderBottom: '2px solid rgba(0, 0, 0, 0.42)', // Change the default color and thickness
            },
          }}
        />
        <Table className='Customer-Details-Main-Table'>
          <TableHead>
            <TableRow>
              <TableCell className="customer-details-headers customer-details-Name">Name</TableCell>
              <TableCell className="customer-details-headers customer-details-Address">Address</TableCell>
              <TableCell className="customer-details-headers customer-details-Customer_GST">Customer GST</TableCell>
              <TableCell className="customer-details-headers customer-details-Phone_Number">Phone Number</TableCell>
              <TableCell className="customer-details-headers customer-details-Actions">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer._id} className='CustomerDetailsTableRow'>
                {editId === customer._id ? (
                  <>
                    <TableCell className="customer-details-headers-Values customer-details-Name">
                      <TextField
                        fullWidth
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="customer-details-Address">
                      <TextField
                        fullWidth
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="customer-details-Customer_GST">
                      <TextField
                        fullWidth
                        name="customerGst"
                        value={editFormData.customerGst}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="customer-details-Phone_Number">
                      <TextField
                        fullWidth
                        name="phoneNumber"
                        value={editFormData.phoneNumber}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="customer-details-Actions">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSaveClick(customer._id)}
                      >
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="customer-details-headers-Values customer-details-Name">{customer.name}</TableCell>
                    <TableCell className="customer-details-headers-Values customer-details-Address">{customer.address}</TableCell>
                    <TableCell className="customer-details-headers-Values customer-details-Customer_GST">{customer.customerGst}</TableCell>
                    <TableCell className="customer-details-headers-Values customer-details-Phone_Number">{customer.phoneNumber}</TableCell>
                    <TableCell className='customer-details-headers-Values'>
                      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(customer)}
                          sx={{
                            m: 0.5,
                            width: '82px'
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteClick(customer._id)}
                          sx={{
                            m: .5
                          }}>
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </ThemeProvider>
  );
}
export default ExistingCustomerDetails;

import React, { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExistingCustomerDetails from "./ExistingCustomerDetails";

import {
  TextField,
  Button,
  Container,
  Typography,
  ToggleButton,
  Box,
  ToggleButtonGroup,
  Grid,
} from "@mui/material";
import "../componentStyles/customerDetails.css";
import { URI } from "./CONSTANTS";

// Constants
const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const CustomerForm = () => {
  const [customerType, setCustomerType] = useState("B2B");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    customerGst: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const validateCustomerAttributes = useCallback(
    (data) => {
      const errors = {};
      if (!data.name.trim()) errors.name = "Name is required.";
      if (!data.address.trim()) errors.address = "Address is required.";
      if (customerType === "B2B" && !GST_REGEX.test(data.customerGst)) {
        errors.customerGst = "GST number must be 15 characters long";
      }
      if (!PHONE_REGEX.test(data.phoneNumber)) {
        errors.phoneNumber = "Phone number must be 10 digits long";
      }
      return errors;
    },
    [customerType]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCustomerAttributes(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${URI}/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setRefreshKey(prev => prev + 1);
          toast.success("Customer data saved");
          setFormData({
            name: "",
            address: "",
            customerGst: "",
            phoneNumber: "",
          });
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || "saving customer data"}`);
        }
      } catch (error) {
        toast.error(`Network error: ${error.message}`);
      }
    }
  };

  const handleCustomerTypeChange = (event, newType) => {
    if (newType !== null) {
      setCustomerType(newType);
    }
  };

  return (
    <div>
      <div className="customerDetailsMain">
        <ToggleButtonGroup
          value={customerType}
          exclusive
          onChange={handleCustomerTypeChange}
          aria-label="customer type"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="B2B" aria-label="B2B">
            B2B
          </ToggleButton>
          <ToggleButton value="B2C" aria-label="B2C">
            B2C
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Creation
        </Typography>
        <Container>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              gap: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  margin="normal"
                  InputProps={{
                    sx: {
                      padding: "0 8px", // Controls padding for reduced height
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: "12px", // Font size for input text
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px", // Reduced font size for label
                      marginTop: "-4px", // Adjusts label position for alignment
                    },
                  }}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  margin="normal"
                  InputProps={{
                    sx: {
                      padding: "0 8px",
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                      marginTop: "-4px",
                    },
                  }}
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Customer GST"
                  name="customerGst"
                  value={formData.customerGst}
                  onChange={handleChange}
                  required={customerType === "B2B"}
                  margin="normal"
                  InputProps={{
                    sx: {
                      padding: "0 8px",
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                      marginTop: "-4px",
                    },
                  }}
                />
                {errors.customerGst && (
                  <span className="error-message">{errors.customerGst}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  margin="normal"
                  InputProps={{
                    sx: {
                      padding: "0 8px",
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                      marginTop: "-4px",
                    },
                  }}
                />
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    height: "50px",
                    width: "30%",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            <ToastContainer />
          </Box>
        </Container>
      </div>
      <div className="existing-customer-details">
        <ExistingCustomerDetails refreshKey={refreshKey}/>
      </div>
    </div>
  );
};

export default CustomerForm;

import { useState, useEffect } from "react";
import { Grid, Typography, Container, TextField, Button, Box, Autocomplete } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { format } from "date-fns";
import axios from "axios";
import ItemsTable from "./ItemsTable";
import "../componentStyles/B2B.css";
import { URI } from "./CONSTANTS";
function B2B() {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    address: "",
    customerGst: "",
    phoneNumber: "",
  });
  useEffect(() => {
    // Fetch existing customer details
    axios
      .get(`${URI}/getExistingCustomerDetails`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
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
        customerName: "",
        address: "",
        customerGst: "",
        phoneNumber: "",
      });
    }
  };
 
  const [shipmentDetails, setShipmentDetails] = useState({
    customerName: "",
    address: "",
    customerGst: "",
    phoneNumber: "",
    date: "",
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
      customerName: "",
      address: "",
      customerGst: "",
      phoneNumber: "",
      date: "",
    });
  };
  return (
    <div className="B2BMain">
      <Container>
        <div style={{ display: "flex", flexDirection: "row", gap: "40px" }}>
          <Box
            component="form"
            sx={{ mt: 3, flex: 1 }}
            noValidate
            autoComplete="off"
          >
            <div className="customer-container ">
              <Typography
                textAlign={"center"}
                variant="h4"
                component="h2"
                gutterBottom
                color="primary" // You can use predefined colors like "primary", "secondary", or a specific color code
              >
                Customer Details
              </Typography>
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
                        label="Client Name"
                        variant="filled"
                        margin="normal"
                        color="success"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    value={customerDetails.address}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        address: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="customerGst"
                    label="Customer GST"
                    variant="standard"
                    value={customerDetails.customerGst}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        customerGst: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    variant="standard"
                    value={customerDetails.phoneNumber}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        phoneNumber: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
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
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </div>
          </Box>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              color="primary"
              variant="text"
              size="medium"
              onClick={handleCopyValues}
              disableRipple
              className="transparent-border"
            >
              copy
              <ArrowForwardIcon fontSize="large" />
            </Button>

            <Button
              variant="text"
              onClick={handleClearValues}
              color="secondary"
            >
              Clear
            </Button>
          </Box>
          <Box
            component="form"
            sx={{ mt: 3, flex: 1 }}
            noValidate
            autoComplete="off"
          >
            <div className="shipment-container">
              <Typography
                textAlign="center"
                variant="h4"
                component="h2"
                gutterBottom
                color="primary" // You can use predefined colors like "primary", "secondary", or a specific color code
              >
                Shipment Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="customerName"
                    label="Shipment Name"
                    variant="filled"
                    value={shipmentDetails.customerName}
                    onChange={(e) =>
                      handleInputChange("customerName", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    value={shipmentDetails.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="customerGst"
                    label="Customer GST"
                    variant="standard"
                    value={shipmentDetails.customerGst}
                    onChange={(e) =>
                      handleInputChange("customerGst", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    variant="standard"
                    value={shipmentDetails.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    id="date"
                    label="Date"
                    type="date"
                    value={shipmentDetails.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
        <ItemsTable
          customerDetails={customerDetails}
          date={date}
          shipmentDetails={shipmentDetails}
        />
      </Container>
    </div>
  );
}

export default B2B;

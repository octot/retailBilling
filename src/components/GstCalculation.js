import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
const GstCalculation = ({ item, index, setItems }) => {
  const [gstDetails, setGstDetails] = useState({
    gstType: item.gstType,
    cgstRate: item.cgstRate,
    sgstRate: item.sgstRate,
    igstRate: item.igstRate,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 0,
    gstTotal: 0,
    rateTotal: item.total,
    roundedRateTotal: 0,
    invoiceTotal: 0,
  });
  console.log("gstTypegstDetails ", gstDetails.gstType);
  useEffect(() => {
    calculateGST();
  }, [item.total, gstDetails.cgstRate,
  gstDetails.sgstRate, gstDetails.igstRate]);
  const handleCgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      cgstRate: rate,
    }));
    updateItemDetails({ cgstRate: rate });
  };
  const handleSgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      sgstRate: rate,
    }));
    updateItemDetails({ sgstRate: rate });

  };
  const handleIgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      igstRate: rate,
    }));
    updateItemDetails({ igstRate: rate });

  };
  const updateItemDetails = (details) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], ...details };
      return updatedItems;
    });
  };
  const calculateGST = () => {
    let cgstAmount = (item.total * gstDetails.cgstRate) / 100;
    let sgstAmount = (item.total * gstDetails.sgstRate) / 100;
    let igstAmount = (item.total * gstDetails.igstRate) / 100;
    let rateTotal = item.total;
    let gstType = item.gstType;
    let roundedRateTotal = Math.round(rateTotal);
    let gstTotal = gstType === 'cgstsgst' ? cgstAmount + sgstAmount : igstAmount;
    let invoiceTotal = roundedRateTotal + gstTotal;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      cgstAmount,
      sgstAmount,
      igstAmount,
      rateTotal,
      roundedRateTotal,
      gstTotal,
      invoiceTotal,
      gstType
    }));
  };
  // gstDetails.gstType,
  console.log("gstType ", gstDetails.gstType)
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        GST Calculation
      </Typography>
      <TextField
        label="GST Total"
        value={gstDetails.gstTotal.toFixed(2)}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Rate Total"
        value={gstDetails.rateTotal.toFixed(2)}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
      />
      <TextField
        label="Round Off"
        value={gstDetails.roundedRateTotal.toFixed(2)}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Invoice Total INR"
        value={gstDetails.invoiceTotal.toFixed(2)}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <Grid item xs={6}>
        <TextField
          label="IGST Rate"
          type="number"
          value={gstDetails.igstRate}
          onChange={handleIgstRateChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="IGST Amount"
          type="number"
          value={gstDetails.igstAmount}
          onChange={handleIgstRateChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="GST Total"
          value={gstDetails.gstTotal.toFixed(2)}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Rate Total"
          value={gstDetails.rateTotal.toFixed(2)}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Round Off"
          value={gstDetails.roundedRateTotal.toFixed(2)}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Invoice Total"
          value={gstDetails.invoiceTotal.toFixed(2)}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </Grid>
    </Container>
  );
}
export default GstCalculation;

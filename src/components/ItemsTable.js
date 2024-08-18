import React, { useState, useEffect } from 'react';
import {
  Typography, Container, TextField, Button, Box, Grid,
  FormControl, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import PdfReportData from './pdfReportData'
import GstForm from './GstForm';
const ItemsTable = ({ customerDetails, date, shipmentDetails }) => {
  const [items, setItems] = useState([
    {
      slno: 1,
      description: '',
      hsnCode: '48130',
      qty: '',
      rate: '',
      total: 0,
      gstType: '',
      cgstRate: 9,
      sgstRate: 9,
      igstRate: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0
    },
  ]);
  const [nextSlNo, setNextSlNo] = useState(2); // Start from 2 since the first item has slno 1
  const [gstTotalValues, setGstTotalValues] = useState({});
  const [gstType, setGstType] = useState('cgst_sgst'); // Set default to 'cgst_sgst'
  let [billNo, setBillNo] = useState('');

  const changeBillNo = (event) => {
    setBillNo(event.target.value)
  }
  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    if (field === 'qty' || field === 'rate' || field === 'cgstRate' || field === 'sgstRate' || field === 'igstRate') {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].total = Number((qty * rate).toFixed(2));
      if (gstType === "cgst_sgst") {
        updatedItems[index].igstRate = 0;
        updatedItems[index].igstAmount = 0
        updatedItems[index].cgstAmount = Number(((updatedItems[index].total * updatedItems[index].cgstRate) / 100).toFixed(2));
        updatedItems[index].sgstAmount = Number(((updatedItems[index].total * updatedItems[index].sgstRate) / 100).toFixed(2));
      }
      if (gstType === "igst") {
        updatedItems[index].cgstRate = 0;
        updatedItems[index].sgstRate = 0;
        updatedItems[index].cgstAmount = 0
        updatedItems[index].sgstAmount = 0
        updatedItems[index].igstAmount =
          Number(((updatedItems[index].total * updatedItems[index].igstRate) / 100).toFixed(2));
      }
    }
    setItems(updatedItems);
  };
  const handleAddRow = () => {
    setItems([
      ...items,
      {
        slno: nextSlNo, description: '', hsnCode: '48130', qty: '', rate: '', total: 0,
        gstType: '',
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0
      },
    ]);
    setNextSlNo(nextSlNo + 1);
  };
  const handleRemoveRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  useEffect(() => {
    let gstTotalAdded = gstTotalCalculation(items);
    setGstTotalValues(gstTotalAdded);
  }, [items]);
  function gstTotalCalculation(items) {
    console.log("gstTotalCalculation ", items)
    let gstTotal = {}
    let [cgstTotal, sgstTotal, igstTotal, rateTotal, gstTotalSum, roundOff, invoiceTotalInr] = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < items.length; i++) {
      if (gstType === 'cgst_sgst') {
        cgstTotal += items[i].cgstAmount;
        sgstTotal += items[i].sgstAmount;
      }
      if (gstType === 'igst') {
        igstTotal += items[i].igstAmount;
      }
      rateTotal += items[i].total;
    }
    if (igstTotal > 0) {
      gstTotalSum = igstTotal
    }
    else {
      gstTotalSum = cgstTotal + sgstTotal
    }
    roundOff = Math.round(rateTotal);
    invoiceTotalInr = roundOff + gstTotalSum
    cgstTotal = Number(cgstTotal.toFixed(2));
    sgstTotal = Number(sgstTotal.toFixed(2));
    igstTotal = Number(igstTotal.toFixed(2));
    gstTotalSum = Number(gstTotalSum.toFixed(2));
    roundOff = Number(roundOff.toFixed(2));
    invoiceTotalInr = Number(invoiceTotalInr.toFixed(2));
    rateTotal = Number(rateTotal.toFixed(2));
    gstTotal = {
      cgstTotal,
      sgstTotal,
      igstTotal,
      rateTotal,
      gstTotalSum,
      roundOff,
      invoiceTotalInr
    };
    console.log("output from gstTotal ", gstTotal)
    return gstTotal;
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gst-type"
            name="gstType"
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
          >
            <Grid container spacing={12}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel value="cgst_sgst" control={<Radio />} label="CGST&amp;SGST" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel value="igst" control={<Radio />} label="IGST" />
              </Grid>
            </Grid>

          </RadioGroup>
        </FormControl>
      </Grid>
      <GstForm
        gstType={gstType}
        items={items}
        handleChange={handleChange}
        handleRemoveRow={handleRemoveRow}
        handleAddRow={handleAddRow}
      />
      <TextField
        id="billNo"
        label="BillNo"
        variant="outlined"
        value={billNo}
        onChange={changeBillNo}
        fullWidth
        margin="normal"
      />
      <div>
        <PdfReportData items={items} customerDetails={customerDetails}
          date={date} shipmentDetails={shipmentDetails}
          gstTotalValues={gstTotalValues} billNo={billNo} />
      </div>
    </Container>
  );
};
export default ItemsTable;
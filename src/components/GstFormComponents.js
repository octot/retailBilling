// GstFormComponents.js

import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

// Common TextField component to reduce repetition
export const ItemTextField = ({ label, value, onChange, readOnly = false, type = "text" }) => (
    <Grid item xs={12} sm={2}>
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            InputProps={{ readOnly }}
            fullWidth
            variant="outlined"
            margin="normal"
            type={type}
        />
    </Grid>
);

// Common fields for both CGST/SGST and IGST
export const CommonFields = ({ item, index, handleChange }) => (
    <>
        <ItemTextField
            label="Sl No"
            value={item.slno}
            onChange={(e) => handleChange(index, 'slno', e.target.value)}
            readOnly
        />
        <Grid item xs={12} sm={3}>
            <TextField
                label="Description"
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
            />
        </Grid>
        <ItemTextField
            label="HSN CODE"
            value={item.hsnCode}
            onChange={(e) => handleChange(index, 'hsnCode', e.target.value)}
        />
        <ItemTextField
            label="QTY"
            value={item.qty}
            onChange={(e) => handleChange(index, 'qty', e.target.value)}
        />
        <ItemTextField
            label="Rate"
            value={item.rate}
            onChange={(e) => handleChange(index, 'rate', e.target.value)}
        />
        <ItemTextField
            label="Total"
            value={item.total.toFixed(2)}
            readOnly
        />
    </>
);

// CGST/SGST specific fields
export const CgstSgstFields = ({ item, index, handleChange }) => (
    <>
        <ItemTextField
            label="CGST Rate (%)"
            value={item.cgstRate}
            onChange={(e) => handleChange(index, 'cgstRate', e.target.value)}
            type="number"
        />
        <ItemTextField
            label="CGST Amount"
            value={item.cgstAmount}
            readOnly
        />
        <ItemTextField
            label="SGST Rate (%)"
            value={item.sgstRate}
            onChange={(e) => handleChange(index, 'sgstRate', e.target.value)}
            type="number"
        />
        <ItemTextField
            label="SGST Amount"
            value={item.sgstAmount.toFixed(2)}
            readOnly
        />
    </>
);

// IGST specific fields
export const IgstFields = ({ item, index, handleChange }) => (
    <>
        <ItemTextField
            label="IGST Rate (%)"
            value={item.igstRate}
            onChange={(e) => handleChange(index, 'igstRate', e.target.value)}
            type="number"
        />
        <ItemTextField
            label="IGST Amount"
            value={item.igstAmount.toFixed(2)}
            readOnly
        />
    </>
);

// Remove Button component
export const RemoveButton = ({ onClick }) => (
    <Grid item xs={12} sm={1} display="flex" alignItems="center">
        <Button
            variant="contained"
            color="secondary"
            onClick={onClick}
            sx={{ mt: 2 }}
        >
            Remove
        </Button>
    </Grid>
);

// Add Row Button component
export const AddRowButton = ({ onClick }) => (
    <Grid item xs={12}>
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            sx={{ mt: 2 }}
        >
            Add Row
        </Button>
    </Grid>
);
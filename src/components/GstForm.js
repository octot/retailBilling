import React from 'react';
import { Box, Grid } from '@mui/material';
import {
    CommonFields,
    CgstSgstFields,
    IgstFields,
    RemoveButton,
    AddRowButton
} from './GstFormComponents';
const GstForm = ({ gstType, items, handleChange, handleRemoveRow, handleAddRow }) => (
    <div>
        {items.map((item, index) => (
            <Box key={index} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <CommonFields item={item} index={index} handleChange={handleChange} />
                    {gstType === 'cgst_sgst' ? (
                        <CgstSgstFields item={item} index={index} handleChange={handleChange} />
                    ) : (
                        <IgstFields item={item} index={index} handleChange={handleChange} />
                    )}
                    <RemoveButton onClick={() => handleRemoveRow(index)} />
                </Grid>
            </Box>
        ))}
        <AddRowButton onClick={handleAddRow} />
    </div>
);

export default GstForm;
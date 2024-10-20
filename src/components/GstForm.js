import React from "react";
import {
  Table,
  Box,
  Grid,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import {
  GstTotalFields,
  CommonFields,
  CgstSgstFields,
  IgstFields,
  RemoveButton,
  AddRowButton,
} from "./GstFormComponents";
import "../componentStyles/GstForm.css";
const GstForm = ({
  gstType,
  items,
  handleChange,
  handleRemoveRow,
  handleAddRow,
  gstTotalValues,
  invoiceHeaders,
}) => (
  <div>
    <TableContainer component={Paper} className="custom-table-container">
      <Table className="custom-table" aria-label="customizable table">
        <TableHead className="custom-table-head">
          <TableRow>
            {invoiceHeaders.map((header) => {
              if (gstType === "cgst_sgst" && header.id === "igstRate") {
                return null; // Don't render igstRate if gstType is cgst_sgst
              }
              if (
                gstType !== "cgst_sgst" &&
                (header.id === "cgst" || header.id === "sgst")
              ) {
                return null; // Don't render cgst or sgst if gstType is not cgst_sgst
              }
              return (
                <TableCell
                  key={header.id}
                  align={header.align}
                  className="custom-table-cell"
                >
                  {header.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow className="custom-table-row">
        {items.map((item, index) => (
          <Box key={index}>
            <Grid container spacing={4}>
              <CommonFields
                item={item}
                index={index}
                handleChange={handleChange}
              />
              {gstType === "cgst_sgst" ? (
                <CgstSgstFields
                  item={item}
                  index={index}
                  handleChange={handleChange}
                />
              ) : (
                <IgstFields
                  item={item}
                  index={index}
                  handleChange={handleChange}
                />
              )}
              <RemoveButton onClick={() => handleRemoveRow(index)} />
            </Grid>
          </Box>
        ))}
        <div className="add-row-button">
          <AddRowButton onClick={handleAddRow} />
        </div>
        </TableRow>
        </TableBody>
        <h1>Total</h1>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {Object.entries(gstTotalValues).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <GstTotalFields fieldKey={key} value={value} />
            </Grid>
          ))}
        </Box>
      </Table>
    </TableContainer>
  </div>
);

export default GstForm;

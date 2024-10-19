import React from "react";
import { Box, Grid } from "@mui/material";
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
}) => (
  <div>
    <div className="gst-calculation-table">
      {/*
      <div className="gst-calculation-table-headers">
      
        {[
          "SlNo",
          "Description",
          "HSN Code",
          "QTY",
          "Rate",
          "Total",
          "CGST(%)",
          "SGST(%)",
        ].map((item, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "row" }}>
            <h3 style={{ marginRight: "10px" }}>{item}</h3>
          </div>
        ))}

      </div>
      */}
      {items.map((item, index) => (
        <Box key={index}>
          <Grid container spacing={2}>
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
      <AddRowButton onClick={handleAddRow} />
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
    </div>
  </div>
);

export default GstForm;

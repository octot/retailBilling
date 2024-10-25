import React from "react";
import "../componentStyles/PdfReportData.css";
import { Button } from "@mui/material";
const buttonStyle = {
  color: "green",
  fontWeight: "bold",
};

const svgStyle = {
  fill: "green",
};

const PlusButton = ({ onClick, className }) => {
  return (
    <Button style={buttonStyle} className={className} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        style={svgStyle}
        className="bi bi-plus-lg"
        viewBox="0 0 16 16"
      >
        <path d="M8 1a.5.5 0 0 1 .5.5v6h6a.5.5 0 0 1 0 1h-6v6a.5.5 0 0 1-1 0v-6h-6a.5.5 0 0 1 0-1h6v-6A.5.5 0 0 1 8 1z" />
      </svg>
    </Button>
  );
};

export default PlusButton;

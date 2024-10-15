import React, { useState } from "react";
import { Button, TextField, Paper } from "@mui/material";
import "./termsAndConditions.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Remove } from "@mui/icons-material/Remove";
import "../componentStyles/bulletPoints.css";
const BulletPointInput = ({
  inputText,
  handleInputChange,
  handleKeyPress,
  bulletPoints,
  editingIndex,
  editText,
  setEditText,
  handleKeyDown,
  handleSaveEdit,
  handleEditBulletPoint,
  handleRemoveBulletPoint,
  moveDown,
  moveUp,
  handleSave,
}) => {
  return (
    <div>
      <TextField
        style={{ width: "25vw" }}
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your Terms and Conditions..."
        variant="outlined"
      />
      <Button onClick={handleSave}>Save Bullet Points</Button>
      <div>
        <Paper className="previewContainer">
          <h3>Preview:</h3>
          <ul>
            {bulletPoints.map((point, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  flexWrap: "wrap", // Wrap text if it exceeds
                  alignItems: "center", // Vertically align items
                  justifyContent: "space-between", // Space between text and icons
                  padding: "10px 0", // Add some padding for each item
                }}
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onBlur={() => handleSaveEdit(index)}
                    style={{
                      flex: 1, // Allow input to take the full width
                      marginRight: "10px", // Add spacing between input and buttons
                    }}
                  />
                ) : (
                  <>
                    <span
                      style={{
                        flex: 1, // Allow text to take up space
                        wordBreak: "break-word", // Break long words
                      }}
                    >
                      {point}
                    </span>
                    <div className="bullet-points-icons">
                      <Button onClick={() => handleEditBulletPoint(index)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleRemoveBulletPoint(index)}>
                        <DeleteIcon />
                      </Button>
                      <Button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L4 10H8V22H16V10H20L12 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Button>
                      <Button
                        onClick={() => moveDown(index)}
                        disabled={index === bulletPoints.length - 1}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22L20 14H16V2H8V14H4L12 22Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Paper>
      </div>
    </div>
  );
};

export default BulletPointInput;

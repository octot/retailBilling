import React from "react";
import { Button, TextField, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
    <div className="bullet-points-container">
    <h1 className="dialog-title">Terms & Conditions</h1>
    <div className="input-section">
      <TextField
        className="bullet-point-input"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your Terms and Conditions..."
        variant="outlined"
        fullWidth
      />
    </div>

    <Paper className="preview-container">
      <h3 className="preview-title">Preview:</h3>
      <ul className="bullet-points-list">
        {bulletPoints.map((point, index) => (
          <li key={index} className="bullet-point-item">
            {editingIndex === index ? (
              <div className="edit-mode">
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleSaveEdit(index)}
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="edit-input"
                />
              </div>
            ) : (
              <>
                <span className="bullet-point-text">{point}</span>
                <div className="bullet-point-controls">
                  <Button
                    className="control-button edit-button"
                    onClick={() => handleEditBulletPoint(index)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className="control-button delete-button"
                    onClick={() => handleRemoveBulletPoint(index)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    className="control-button move-button"
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
                    className="control-button move-button"
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
  );
};

export default BulletPointInput;

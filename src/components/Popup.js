import React from "react";
import "../componentStyles/Popup.css"; // Custom CSS for styling the popup

const Popup = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

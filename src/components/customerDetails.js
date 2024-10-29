import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExistingCustomerDetails from "./ExistingCustomerDetails";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "../componentStyles/customerDetails.css";
import { URI } from "./CONSTANTS";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// Constants
const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const CustomerForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [customerType, setCustomerType] = useState("B2B");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    customerGst: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const validateCustomerAttributes = useCallback(
    (data) => {
      const errors = {};
      if (!data.name.trim()) errors.name = "Name is required.";
      if (!data.address.trim()) errors.address = "Address is required.";
      if (customerType === "B2B" && !GST_REGEX.test(data.customerGst)) {
        errors.customerGst = "GST number must be 15 characters long";
      }
      if (!PHONE_REGEX.test(data.phoneNumber)) {
        errors.phoneNumber = "Phone number must be 10 digits long";
      }
      return errors;
    },
    [customerType]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCustomerAttributes(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${URI}/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setRefreshKey((prev) => prev + 1);
          toast.success("Customer data saved");
          setFormData({
            name: "",
            address: "",
            customerGst: "",
            phoneNumber: "",
          });
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || "saving customer data"}`);
        }
      } catch (error) {
        toast.error(`Network error: ${error.message}`);
      }
    }
  };

  const handleCustomerTypeChange = (event, newType) => {
    if (newType !== null) {
      setCustomerType(newType);
    }
  };

  return (
    <div>
      <div className="client-form-container">
        <div className="client-form-inner">
          <div className="client-header-box">
            <h1 className="client-title">Enter Client Details</h1>
          </div>
          <div>
            <ToggleButtonGroup
              value={customerType}
              exclusive
              onChange={handleCustomerTypeChange}
              aria-label="customer type"
            >
              <ToggleButton value="B2B" aria-label="B2B">
                B2B
              </ToggleButton>
              <ToggleButton value="B2C" aria-label="B2C">
                B2C
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="client-form-layout">
              <div className="client-input-group">
                <label htmlFor="name">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <span className="client-error-message">{errors.name}</span>
                )}
              </div>
              <div className="client-input-group">
                <label htmlFor="address">
                  Address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && (
                  <span className="client-error-message">{errors.address}</span>
                )}
              </div>

              <div className="client-input-group">
                <label htmlFor="customerGst">
                  {customerType === "B2B" ? (
                    <span>
                      Customer GST<span style={{ color: "red" }}>*</span>
                    </span>
                  ) : (
                    <span>Customer GST</span>
                  )}
                </label>
                <input
                  type="text"
                  id="customerGst"
                  name="customerGst"
                  value={formData.customerGst}
                  onChange={handleChange}
                  required={customerType === "B2B"}
                />
                {errors.customerGst && (
                  <span className="client-error-message">
                    {errors.customerGst}
                  </span>
                )}
              </div>

              <div className="client-input-group">
                <label htmlFor="phoneNumber">
                  Phone Number<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                {errors.phoneNumber && (
                  <span className="client-error-message">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>
            <Button type="submit" className="client-submit-button">
              Submit
            </Button>
            <ToastContainer />
          </form>
        </div>
      </div>
      <div className="existing-customer-details">
        <Button className="styled-button" onClick={togglePopup}>
          <FontAwesomeIcon icon={faEye} /> View my clients
        </Button>
        <Popup isOpen={isPopupOpen} onClose={togglePopup}>
          <div>
            <ExistingCustomerDetails refreshKey={refreshKey} />
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default CustomerForm;

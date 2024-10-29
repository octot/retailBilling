import { TextField, Grid, Typography, Box } from "@mui/material";
import "../componentStyles/PaymentDetails.css";

const PaymentDetails = ({
  handlePaymentDetailsSubmit,
  paymentDetails,
  handlePaymentDetailsChange,
}) => {
  return (
    <Box className="payment-container">
      <Typography variant="h4" gutterBottom className="payment-header">
        Payment Details
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className="payment-grid-item">
            <TextField
              label="A/C Number"
              name="accountName"
              value={paymentDetails.accountName}
              onChange={handlePaymentDetailsChange}
              margin="none"
              className="payment-textfield"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="payment-grid-item">
            <TextField
              label="A/C No"
              name="accountNumber"
              value={paymentDetails.accountNumber}
              onChange={handlePaymentDetailsChange}
              margin="none"
              className="payment-textfield"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="payment-grid-item">
            <TextField
              name="bankName"
              label="Bank Name"
              value={paymentDetails.bankName}
              onChange={handlePaymentDetailsChange}
              margin="none"
              className="payment-textfield"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="payment-grid-item">
            <TextField
              name="gpayNumber"
              label="G-Pay Number"
              value={paymentDetails.gpayNumber}
              onChange={handlePaymentDetailsChange}
              margin="none"
              className="payment-textfield"
            />
          </Grid>
        </Grid>
        {/*
        <Button
          onClick={handlePaymentDetailsSubmit}
          type="submit"
          variant="contained"
          className="payment-button"
        >
          Payment Submit
        </Button>
        */}
      </form>
    </Box>
  );
};

export default PaymentDetails;

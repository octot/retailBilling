import { Button, TextField, Grid, Typography, Box } from '@mui/material';
const PaymentDetails = ({ handlePaymentDetailsSubmit, paymentDetails, handlePaymentDetailsChange }) => {
    console.log("paymentDetails ", paymentDetails)
    console.log("handlePaymentDetailsChange ", handlePaymentDetailsChange)
    return (
        <Box sx={{ maxWidth: 800, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom style={{ width: '20vw', textAlign: 'center' }}>
                Payment Details
            </Typography>
            <form onSubmit={handlePaymentDetailsSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
                        <TextField
                            label='A/C Number'
                            name='accountName'
                            value={paymentDetails.accountName}
                            onChange={handlePaymentDetailsChange}
                            margin="none"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
                        <TextField
                            label='A/C No'
                            name='accountNumber'
                            value={paymentDetails.accountNumber}
                            onChange={handlePaymentDetailsChange}
                            margin="none"

                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
                        <TextField
                            name='bankName'
                            label='BankName'
                            value={paymentDetails.bankName}
                            onChange={handlePaymentDetailsChange}
                            margin="none"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
                        <TextField
                            name='gpayNumber'
                            label='G-payNumber'
                            value={paymentDetails.gpayNumber}
                            onChange={handlePaymentDetailsChange}
                            margin="none"
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Payment Submit
                </Button>
            </form>
        </Box>

    )
}
export default PaymentDetails;
import { useState, useEffect } from 'react';
import '../componentStyles/customerShipmentItemsBillRUD.css'
import { Button, TextField, Table, TableCell, TableRow, TableHead, TableBody } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { URI } from './CONSTANTS'
const CustomerShipmentItemsBillRUD = () => {

    const [existingCustomerShipmentItemsBillRUD, setExistingCustomerShipmentItemsBillRUD] = useState([]);
    const [searchBillNumber, setSearchBillNumber] = useState('')
    useEffect(() => {
        const fetchCustomerShipmentItemsBillRUD = async () => {
            const response = await fetch(`${URI}/getCustShipItemBillDetails`);
            const data = await response.json();
            setExistingCustomerShipmentItemsBillRUD(data);
        };
        fetchCustomerShipmentItemsBillRUD();
    }, []);

    // console.log("existingCustomerShipmentItemsBillRUD", existingCustomerShipmentItemsBillRUD);
    const handleBillNumberChange = (event) => {
        setSearchBillNumber(event.target.value)
    }
    const filterBasedOnBillNumber = existingCustomerShipmentItemsBillRUD.filter((item) => {
        const billNoCheck = item.billNo
        const searchBill = searchBillNumber
        return billNoCheck && searchBill && billNoCheck.toLowerCase().includes(searchBill.toLowerCase())
    }
    )
    // console.log("filterBasedOnBillNumber ", filterBasedOnBillNumber)
    const handleDeleteClick = async (id) => {
        const response = await fetch(`${URI}/deleteCustShipItemBillDetails/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            toast.success('Customer deleted successfully');
            setExistingCustomerShipmentItemsBillRUD(existingCustomerShipmentItemsBillRUD.filter((item) => item._id !== id));
        } else {
            toast.error('Error in customer deletion');
            // console.log('Error deleting customer data');
        }
    };
    return (
        <div>
            <ToastContainer />
            <TextField
                type="text"
                placeholder="Enter Bill Number"
                value={searchBillNumber}
                onChange={handleBillNumberChange}
                className="Bill-Number-Search-Bar"
                variant="standard"

            />
            <Table className="Main-Table">
                <TableHead>
                    <TableRow className='Heading-Rows'>
                        <TableCell className='Heading-Columns'>Action</TableCell>
                        <TableCell className='Heading-Columns'>Bill No</TableCell>
                        <TableCell className='Heading-Columns'>Date</TableCell>
                        <TableCell className='Heading-Columns'>Description</TableCell>
                        <TableCell className='Heading-Columns'>Customer Name</TableCell>
                        <TableCell className='Heading-Columns'>Invoice Total Inr</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterBasedOnBillNumber.map((item, index) => (
                        <TableRow className='Heading-Rows' key={index}>
                            <TableCell className='Heading-Values-Columns'>{
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteClick(item._id)}
                                    sx={{
                                        m: .5
                                    }}>
                                    Delete
                                </Button>
                            }</TableCell>
                            <TableCell className='Heading-Values-Columns'>{item.billNo}</TableCell>
                            <TableCell className='Heading-Values-Columns'>{item.date}</TableCell>
                            <TableCell className='Heading-Values-Columns'> {Array.isArray(item.items) ? item.items.map(i => i.description) : item.items}</TableCell>
                            <TableCell className='Heading-Values-Columns'>
                                {typeof item.customerDetails === 'object' ? item.customerDetails.customerName : item.customerDetails}
                            </TableCell>
                            <TableCell className='Heading-Values-Columns'>
                                {
                                    typeof item.gstTotalValues === 'object' ? item.gstTotalValues.invoiceTotalInr : item.gstTotalValues
                                }
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default CustomerShipmentItemsBillRUD;

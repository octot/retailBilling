import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CloseIcon } from "./icons";
import PdfReportData from "./pdfReportData";
import GstForm from "./GstForm";
import InvoiceDateDueDetails from "./invoiceDateDueDetails";
import AddIcon from "@mui/icons-material/Add";
import "../componentStyles/itemsTable.css";
const ItemsTable = ({ customerDetails, date, shipmentDetails }) => {
  const [items, setItems] = useState([
    {
      itemName: "",
      description: "",
      hsnCode: "",
      qty: "",
      rate: "",
      total: 0,
      gstType: "",
      cgstRate: 9,
      sgstRate: 9,
      igstRate: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0,
    },
  ]);
  console.log("items ", items);
  const [gstTotalValues, setGstTotalValues] = useState({});
  const [gstType, setGstType] = useState("cgst_sgst"); // Set default to 'cgst_sgst'
  let [billNo, setBillNo] = useState("INV-2024-001");
  // console.log("gstTotalValuesState ", gstTotalValues)
  // const changeBillNo = (event) => {
  //   setBillNo(event.target.value);
  // };
  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    if (
      field === "qty" ||
      field === "rate" ||
      field === "cgstRate" ||
      field === "sgstRate" ||
      field === "igstRate"
    ) {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].total = Number((qty * rate).toFixed(2));
      if (gstType === "cgst_sgst") {
        updatedItems[index].igstRate = 0;
        updatedItems[index].igstAmount = 0;
        updatedItems[index].cgstAmount = Number(
          (
            (updatedItems[index].total * updatedItems[index].cgstRate) /
            100
          ).toFixed(2)
        );
        updatedItems[index].sgstAmount = Number(
          (
            (updatedItems[index].total * updatedItems[index].sgstRate) /
            100
          ).toFixed(2)
        );
      }
      if (gstType === "igst") {
        updatedItems[index].cgstRate = 0;
        updatedItems[index].sgstRate = 0;
        updatedItems[index].cgstAmount = 0;
        updatedItems[index].sgstAmount = 0;
        updatedItems[index].igstAmount = Number(
          (
            (updatedItems[index].total * updatedItems[index].igstRate) /
            100
          ).toFixed(2)
        );
      }
    }
    setItems(updatedItems);
  };
  const handleAddRow = () => {
    setItems([
      ...items,
      {
        itemName: "",
        description: "",
        hsnCode: "48130",
        qty: "",
        rate: "",
        total: 0,
        gstType: "",
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
      },
    ]);
  };
  const handleRemoveRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  useEffect(() => {
    const gstTotalCalculation = (items) => {
      // console.log("gstTotalCalculation ", items)
      let gstTotal = {};
      let [
        cgstTotal,
        sgstTotal,
        igstTotal,
        rateTotal,
        gstTotalSum,
        roundOff,
        invoiceTotalInr,
      ] = [0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < items.length; i++) {
        if (gstType === "cgst_sgst") {
          cgstTotal += items[i].cgstAmount;
          sgstTotal += items[i].sgstAmount;
        }
        if (gstType === "igst") {
          igstTotal += items[i].igstAmount;
        }
        rateTotal += items[i].total;
      }
      if (igstTotal > 0) {
        gstTotalSum = igstTotal;
      } else {
        gstTotalSum = cgstTotal + sgstTotal;
      }
      roundOff = Math.round(rateTotal);
      invoiceTotalInr = roundOff + gstTotalSum;
      cgstTotal = Number(cgstTotal.toFixed(2));
      sgstTotal = Number(sgstTotal.toFixed(2));
      igstTotal = Number(igstTotal.toFixed(2));
      gstTotalSum = Number(gstTotalSum.toFixed(2));
      roundOff = Number(roundOff.toFixed(2));
      invoiceTotalInr = Number(invoiceTotalInr.toFixed(2));
      rateTotal = Number(rateTotal.toFixed(2));
      gstTotal = {
        cgstTotal,
        sgstTotal,
        igstTotal,
        rateTotal,
        gstTotalSum,
        roundOff,
        invoiceTotalInr,
      };
      console.log("output from gstTotal ", gstTotal);
      return gstTotal;
    };
    let gstTotalAdded = gstTotalCalculation(items);
    setGstTotalValues(gstTotalAdded);
  }, [items,gstType]);
  const invoiceHeaders = [
    { id: "itemName", label: "Item Name", align: "left" },
    { id: "description", label: "Description", align: "left" },
    { id: "hsnCode", label: "HSN CODE", align: "center" },
    { id: "qty", label: "QTY", align: "right" },
    { id: "rate", label: "Rate", align: "right" },
    { id: "cgst", label: "CGST(%)", align: "right" },
    { id: "sgst", label: "SGST(%)", align: "right" },
    { id: "igst", label: "IGST Rate (%)", align: "right" },
  ];

  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [paymentTerms, setPaymentTerms] = useState("net30");
  const [dueDate, setDueDate] = useState("");
  const [invoiceType, setInvoiceType] = useState("TAX INVOICE");
  const [earlyPaymentDate, setEarlyPaymentDate] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const calculateDates = (date, terms) => {
    const baseDate = new Date(date);
    let dueDateValue = new Date(baseDate);
    let earlyDate = new Date(baseDate);
    let discount = 0;
    switch (terms) {
      case "net30":
        dueDateValue.setDate(baseDate.getDate() + 30);
        break;
      case "net15":
        dueDateValue.setDate(baseDate.getDate() + 15);
        break;
      case "net60":
        dueDateValue.setDate(baseDate.getDate() + 60);
        break;
      case "eom":
        dueDateValue = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth() + 1,
          0
        );
        break;
      case "2/10net30":
        dueDateValue.setDate(baseDate.getDate() + 30);
        earlyDate.setDate(baseDate.getDate() + 10);
        discount = 2;
        break;
      default:
        dueDateValue = baseDate;
    }
    const newDueDate = dueDateValue.toISOString().split("T")[0];
    const newEarlyPaymentDate = earlyDate.toISOString().split("T")[0];
    setDueDate(newDueDate);
    setEarlyPaymentDate(newEarlyPaymentDate);
    setDiscountAmount(discount);
  };
  useEffect(() => {
    calculateDates(invoiceDate, paymentTerms);
  }, [invoiceDate, paymentTerms]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const [openInvoiceDetailsPopup, setOpenInvoiceDetailsPopup] = useState(false);

  const handleOpenInvoiceDetailsPopup = () => {
    setOpenInvoiceDetailsPopup(true);
  };

  const handleCloseInvoiceDetailsPopup = () => {
    setOpenInvoiceDetailsPopup(false);
  };
  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gst-type"
            name="gstType"
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
          >
            <Grid container spacing={12}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  value="cgst_sgst"
                  control={<Radio />}
                  label="CGST&amp;SGST"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  value="igst"
                  control={<Radio />}
                  label="IGST"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
      <GstForm
        gstType={gstType}
        items={items}
        handleChange={handleChange}
        handleRemoveRow={handleRemoveRow}
        handleAddRow={handleAddRow}
        gstTotalValues={gstTotalValues}
        invoiceHeaders={invoiceHeaders}
      />
      <div className="invoice-details-main">
        <Button
          color="primary"
          onClick={handleOpenInvoiceDetailsPopup}
          variant="contained"
          style={{ textTransform: "none", fontSize: "16px" }}
          startIcon={<AddIcon />}
        >
          Add Invoice Details
        </Button>

        <Dialog
          open={openInvoiceDetailsPopup}
          onClose={handleCloseInvoiceDetailsPopup}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <button
              className="close-button-invoice"
              onClick={handleCloseInvoiceDetailsPopup}
            >
              <CloseIcon />
            </button>
          </DialogTitle>
          <DialogContent>
            <InvoiceDateDueDetails
              invoiceDate={invoiceDate}
              setInvoiceDate={setInvoiceDate}
              setPaymentTerms={setPaymentTerms}
              dueDate={dueDate}
              earlyPaymentDate={earlyPaymentDate}
              discountAmount={discountAmount}
              formatDate={formatDate}
              billNo={billNo}
              setBillNo={setBillNo}
              invoiceType={invoiceType}
              setInvoiceType={setInvoiceType}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <PdfReportData
          invoiceDate={invoiceDate}
          items={items}
          dueDate={dueDate}
          discountAmount={discountAmount}
          formatDate={formatDate}
          customerDetails={customerDetails}
          date={date}
          shipmentDetails={shipmentDetails}
          gstTotalValues={gstTotalValues}
          billNo={billNo}
          invoiceType={invoiceType}
        />
      </div>
    </Container>
  );
};
export default ItemsTable;

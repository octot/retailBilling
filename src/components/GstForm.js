import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { RemoveButton, AddRowButton } from "./GstFormComponents";
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
    <TableContainer component={Paper} className="custom-table-container">
      <Table className="custom-table" aria-label="customizable table">
        <TableHead className="custom-table-head">
          <TableRow>
            <TableCell className="invoice-table-header itemName">
              item Name
            </TableCell>
            <TableCell className="invoice-table-header description">
              description
            </TableCell>
            <TableCell className="invoice-table-header hsnCode">
              hsnCode
            </TableCell>
            <TableCell className="invoice-table-header qty">qty</TableCell>
            <TableCell className="invoice-table-header rate">rate</TableCell>
            {gstType === "cgst_sgst" ? (
              <>
                <TableCell className="invoice-table-header cgst">
                  cgst
                </TableCell>
                <TableCell className="invoice-table-header sgst">
                  sgst
                </TableCell>
              </>
            ) : (
              <>
                <TableCell className="invoice-table-header cgst">
                  igst
                </TableCell>
                
              </>
            )}
            <TableCell className="invoice-table-header amount">
              Amount
            </TableCell>
            <TableCell
              className="invoice-table-header action"
              style={{ textAlign: "center" }}
            >
              Action
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow className="custom-table-row" key={index}>
              <TableCell className="invoice-table-row">
                <TextField
                  label="Item Name"
                  value={item.itemName}
                  onChange={(e) =>
                    handleChange(index, "itemName", e.target.value)
                  }
                  variant="standard"
                  margin="normal"
                  fullWidth
                />
              </TableCell>
              <TableCell className="invoice-table-row">
                <TextField
                  label="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  variant="standard"
                  margin="normal"
                />
              </TableCell>
              <TableCell className="invoice-table-row">
                <TextField
                  label="hsnCode"
                  value={item.hsnCode}
                  onChange={(e) =>
                    handleChange(index, "hsnCode", e.target.value)
                  }
                  variant="standard"
                  margin="normal"
                  fullWidth
                />
              </TableCell>
              <TableCell className="invoice-table-row">
                <TextField
                  label="qty"
                  value={item.qty}
                  onChange={(e) => handleChange(index, "qty", e.target.value)}
                  variant="standard"
                  margin="normal"
                  fullWidth
                />
              </TableCell>
              <TableCell className="invoice-table-row">
                <TextField
                  label="rate"
                  value={item.rate}
                  onChange={(e) => handleChange(index, "rate", e.target.value)}
                  variant="standard"
                  margin="normal"
                  fullWidth
                />
              </TableCell>
              {gstType === "cgst_sgst" ? (
                <>
                  <TableCell className="invoice-table-row">
                    <TextField
                      label="cgst(%)"
                      value={item.cgstRate}
                      onChange={(e) =>
                        handleChange(index, "cgstRate", e.target.value)
                      }
                      variant="standard"
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell className="invoice-table-row">
                    <TextField
                      label="sgst(%)"
                      value={item.sgstRate}
                      onChange={(e) =>
                        handleChange(index, "sgstRate", e.target.value)
                      }
                      variant="standard"
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell className="invoice-table-row">
                    <TextField
                      label="Amount"
                      value={item.cgstAmount + item.sgstAmount + item.total}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="standard"
                      margin="normal"
                    />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="invoice-table-row">
                    <TextField
                      label="igst(%)"
                      value={item.igstRate}
                      onChange={(e) =>
                        handleChange(index, "igstRate", e.target.value)
                      }
                      variant="standard"
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell className="invoice-table-row">
                    <TextField
                      label="Amount"
                      value={item.igstAmount + item.total}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="standard"
                      margin="normal"
                    />
                  </TableCell>
                </>
              )}
              <TableCell
                className="invoice-table-row"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <AddRowButton onClick={handleAddRow} />
                {index > 0 && (
                  <RemoveButton onClick={() => handleRemoveRow(index)} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableRow>
          <TableCell style={{ borderRight: "none" }} />
          <TableCell style={{ borderBottom: "none" }} />
          <TableCell style={{ borderBottom: "none" }} />
          <TableCell style={{ borderBottom: "none" }} />
          <TableCell style={{ borderBottom: "none" }} />
          <TableCell style={{ borderBottom: "none" }} />
          {/* <TableCell
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            colSpan={3}
          >
            Invoice Total Inr
          </TableCell>
          <TableCell>{gstTotalValues.invoiceTotalInr}</TableCell> */}
        </TableRow>
      </Table>
    </TableContainer>
  </div>
);

export default GstForm;

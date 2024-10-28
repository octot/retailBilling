// InvoiceDateManager.jsx
import React from "react";
import "./InvoiceDateManager.css";

const InvoiceDateManager = ({
  invoiceDate,
  setInvoiceDate,
  paymentTerms,
  setPaymentTerms,
  dueDate,
  earlyPaymentDate,
  discountAmount,
  formatDate,
  billNo,
  setBillNo,
  invoiceType,
  setInvoiceType,
}) => {
  return (
    <div className="invoice-manager">
      <div className="invoice-manager__header">
        <svg
          className="calendar-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5C3.89 4 3 4.9 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
        </svg>
        <h2>Invoice details</h2>
      </div>

      <div className="invoice-manager__content">
        <div className="form-grid">
          <div className="form-group">
            <label>Invoice Type</label>
            <input
              type="text"
              value={invoiceType}
              style={{ height: "40px" }}
              onChange={(e) => setInvoiceType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="select-input"
            >
              <option value="net30">Net 30</option>
              <option value="net15">Net 15</option>
              <option value="net60">Net 60</option>
              <option value="eom">End of Month</option>
              <option value="2/10net30">2/10 Net 30</option>
              <option value="immediate">Due Immediately</option>
            </select>
          </div>
          <div className="form-group">
            <label>Invoice Number</label>
            <input
              type="text"
              value={billNo}
              style={{ height: "40px" }}
              onChange={(e) => setBillNo(e.target.value)}
            />
          </div>
        </div>

        <div className="date-info">
          <div className="date-info__row">
            <span className="due-date">Due Date:</span>
            <span>{formatDate(dueDate)}</span>
          </div>

          {paymentTerms === "2/10net30" && (
            <>
              <div className="date-info__row">
                <span>Early Payment Date:</span>
                <span>{formatDate(earlyPaymentDate)}</span>
              </div>
              <div className="date-info__row">
                <span>Early Payment Discount:</span>
                <span>{discountAmount}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDateManager;

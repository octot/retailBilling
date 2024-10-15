export function itemsToParts(items, itemSize) {
  let itemsTotalArray = [];
  for (let i = 0; i < items.length; i += itemSize) {
    let itemsSubArray = items.slice(i, i + itemSize);
    itemsTotalArray.push(itemsSubArray);
  }
  return itemsTotalArray;
}
// infoFunctions.js

export const getCustomerInfo = (customerDetails, date) => {
  return [
    { label: "Customer Name", value: customerDetails.customerName },
    { label: "Address", value: customerDetails.address },
    { label: "Customer GST", value: customerDetails.customerGst },
    { label: "Phone Number", value: customerDetails.phoneNumber },
    { label: "Date", value: date },
  ];
};

export const getShipmentInfo = (shipmentDetails, date) => {
  return [
    { label: " Name", value: shipmentDetails.customerName },
    { label: "Address", value: shipmentDetails.address },
    { label: "Customer GST", value: shipmentDetails.customerGst },
    { label: "Phone Number", value: shipmentDetails.phoneNumber },
    { label: "Date", value: date },
  ];
};

export const getPaymentDetails = (paymentDetails) => {
  return [
    { label: "AccountName", value: paymentDetails.accountName },
    { label: "AccountNumber", value: paymentDetails.accountNumber },
    { label: "BankName", value: paymentDetails.bankName },
    { label: "GpayNumber", value: paymentDetails.gpayNumber },
  ];
};

export const getGstList = () => {
  return ["CGST", "SGST", "IGST"];
};

export const getGstTotalList = () => {
  return ["cgstTotal", "sgstTotal", "igstTotal"];
};

export const getGstTotalFinalListMap = () => {
  return [
    { columnName: "GST TOTAL", columnValue: "gstTotalSum" },
    { columnName: "RATE TOTAL", columnValue: "rateTotal" },
    { columnName: "Roundoff", columnValue: "roundOff" },
    { columnName: "Invoice Total", columnValue: "invoiceTotalInr" },
  ];
};

export const getGstCellContainerValueMap = () => {
  return [
    { key: "cgstRate", value: "cgstAmount" },
    { key: "sgstRate", value: "sgstAmount" },
    { key: "igstRate", value: "igstAmount" },
  ];
};

export const orderBulletPoints = (bulletPoints) => {
  let orderedBulletList = [];
  let count = 1;
  for (let i = 0; i < bulletPoints.length; ++i) {
    orderedBulletList.push(`${count}) ${bulletPoints[i]}`);
    count++;
  }
  // console.log("orderedBulletList ", orderedBulletList)
  return orderedBulletList;
};

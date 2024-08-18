// models/Order.js
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    items: { type: Array },
    customerDetails: { type: Object },
    date: { type: Date },
    shipmentDetails: { type: Object },
    gstTotalValues: { type: Object },
    billNo: { type: String }
});

module.exports = mongoose.model('customerShipmentItemsBillRUD', orderSchema);

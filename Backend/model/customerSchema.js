const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    address: String,
    customerGst: String,
    phoneNumber: String
  });
  // Define a model
module.exports = mongoose.model('customerSchema', customerSchema);

const mongoose = require("mongoose");
const bankDetailsSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  gpayNumber: {
    type: String,
  },
});
const bankDetail = mongoose.model("bankDetailsSchema", bankDetailsSchema);
module.exports = bankDetail;

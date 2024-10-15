const mongoose = require("mongoose");
const termsAndConditionSchema = new mongoose.Schema({
  bulletPoints: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const termsAndConditionStruct = mongoose.model(
  "termsAndConditionSchema",
  termsAndConditionSchema
);
module.exports = termsAndConditionStruct;

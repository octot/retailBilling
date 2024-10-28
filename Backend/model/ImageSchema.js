const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const ImageModel = mongoose.model("Image", ImageSchema);

module.exports = ImageModel;

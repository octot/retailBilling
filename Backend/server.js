const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json({ limit: "10mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const customerRoutes = require("./routes/CustomerCrudRoutes"); // Adjust the path as necessary
const custShipItemBillRoute = require("./routes/custShipItemBillRoute");
const SequenceGenerator = require("./routes/SequenceGeneratorRoute");
const pdfRoute = require("./routes/pdfRoute");
const termsAndCondition = require("./routes/termsAndConditionRoutes");
const myCompanyDetails = require("./routes/MyCompanyDetailsRoute");
const bankDetails = require("./routes/BankDetailsRoutes");
const { handleBase64Upload, getAllImages } = require("./routes/ImageRoutes");
app.post("/api/upload-base64", handleBase64Upload);
app.get("/api/getImageLogo", getAllImages);
app.use('/uploads', express.static('routes/uploads'));
app.use(customerRoutes);
app.use(SequenceGenerator);
app.use(custShipItemBillRoute);
app.use(bankDetails);
app.use(myCompanyDetails);
app.use("/pdf", express.static(path.join(__dirname, "pdfs")));
app.use("/api/pdf", pdfRoute);
app.use(termsAndCondition);
const mongoURI =
  "mongodb+srv://user:user@cluster0.syund4p.mongodb.net/billingsoftware";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Timeout after 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // console.log("Connected to MongoDB successfully!");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // // console.log(`Server running on port ${port}`);
});

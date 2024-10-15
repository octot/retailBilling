const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const path = require("path");
const customerRoutes = require("./routes/CustomerCrudRoutes"); // Adjust the path as necessary
const custShipItemBillRoute = require("./routes/custShipItemBillRoute");
const SequenceGenerator = require("./routes/SequenceGeneratorRoute");
const pdfRoute = require("./routes/pdfRoute");
const termsAndCondition = require("./routes/termsAndConditionRoutes");
const bankDetails = require("./routes/BankDetailsRoutes");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());
app.use(customerRoutes);
app.use(SequenceGenerator);
app.use(custShipItemBillRoute);
app.use(bankDetails);
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
let gfs;
db.once("open", () => {
  // Init stream
  gfs = Grid(db, mongoose.mongo);
  gfs.collection("uploads");
});
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(201).send({ file: req.file });
});
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: 'Not an image' });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // console.log(`Server running on port ${port}`);
});

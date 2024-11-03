const path = require("path");
// const noApi = "http://localhost:3001";

const noApi = "https://retailbilling.onrender.com";

const storePDF = (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).send("No file uploaded.");

  // You can now share or store the file, and return the URL for sharing
  const filePath = path.join(__dirname, `../pdfs/${file.filename}`);
  const shareUrl = `${noApi}/pdf/${file.filename}`;

  res.status(200).send({ filePath, shareUrl });
};

module.exports = { storePDF };

const ImageModel = require("../model/ImageSchema");
const fs = require("fs");
const path = require("path");

// for localhost
const saveBase64Image = (base64Image, folder = "uploads") => {
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  const ext = matches[1].split("/")[1]; // Get image extension (e.g., jpeg, png)
  const buffer = Buffer.from(matches[2], "base64");
  const fileName = `${Date.now()}.${ext}`; // Unique filename with timestamp
  const filePath = path.join(__dirname, folder, fileName);
  fs.writeFileSync(filePath, buffer);
  return fileName;
};



/*

const saveBase64Image = (base64Image, folder = "/tmp/uploads") => {
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  const ext = matches[1].split("/")[1];
  const buffer = Buffer.from(matches[2], "base64");
  const fileName = `${Date.now()}.${ext}`;
  const filePath = path.join(folder, fileName);

  // Ensure folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  fs.writeFileSync(filePath, buffer);
  return fileName;
};

*/


const handleBase64Upload = async (req, res) => {
  try {
    // // console.log('req.bodyFromImage',req.body)
    const base64Image = req.body.image;
    // console.log("base64Image", base64Image);
    const imagePath = saveBase64Image(base64Image);
    const image = new ImageModel({ url: `/uploads/${imagePath}` });
    await image.save();
    res.status(200).json({
      message: "Image uploaded successfully!",
      imageUrl: `/uploads/${imagePath}`,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    // console.log("errorFrom", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const latestImage = await ImageModel.findOne().sort({ createdAt: -1 }); // Sort by creation date descending
    if (latestImage) {
      res.status(200).json(latestImage);
    } else {
      res.status(404).json({ message: "No images found" });
    }
  } catch (error) {
    console.error("Error fetching the latest image:", error);
    res.status(500).json({ error: "Failed to fetch the latest image" });
  }
};

module.exports = { saveBase64Image, handleBase64Upload, getAllImages };

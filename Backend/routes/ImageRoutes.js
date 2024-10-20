const ImageModel = require("../model/ImageSchema");
const fs = require("fs");
const path = require("path");
const saveBase64Image = (base64Image, folder = "uploads") => {
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  const ext = matches[1].split("/")[1]; // Get image extension (e.g., jpeg, png)
  const buffer = Buffer.from(matches[2], "base64");
  const fileName = `${Date.now()}.${ext}`; // Unique filename with timestamp
  const filePath = path.join(__dirname, folder, fileName);
  fs.writeFileSync(filePath, buffer);
  return fileName; 
};
const handleBase64Upload = async (req, res) => {
  try {
    console.log('req.bodyFromImage',req.body)
    const base64Image = req.body.image;
    const imagePath = saveBase64Image(base64Image);
    const image = new ImageModel({ url: `/uploads/${imagePath}` });
    await image.save();
    res
      .status(200)
      .json({
        message: "Image uploaded successfully!",
        imageUrl: `/uploads/${imagePath}`,
      });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

module.exports = { saveBase64Image, handleBase64Upload };

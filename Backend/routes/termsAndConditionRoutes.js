const express = require("express");
const router = express.Router();
const termsAndConditionStruct = require("../model/termsConditionsSchema");
router.get("/api/bulletPoints", async (req, res) => {
  try {
    const bulletPoints = await termsAndConditionStruct.find();
    res.json(bulletPoints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to add new bullet points
router.post("/api/bulletPoints", async (req, res) => {
  const { bulletPoints } = req.body;
  const bulletPoint = new termsAndConditionStruct({ bulletPoints });

  try {
    const newBulletPoint = await bulletPoint.save();
    res.status(201).json(newBulletPoint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;

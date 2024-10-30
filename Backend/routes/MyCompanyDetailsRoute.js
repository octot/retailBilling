const express = require("express");
const router = express.Router();
const Company = require("../model/MyCompanyDetailsModel");

// Create or Update company based on GST number
router.post("/api/companies", async (req, res) => {
  try {
    const { gstNumber } = req.body;

    // Set the update options
    const options = {
      new: true, // Return the updated document
      upsert: true, // Create if doesn't exist
      runValidators: true, // Run validators for update
      setDefaultsOnInsert: true, // Set defaults if creating new doc
    };

    // Find and update, or create if doesn't exist
    const company = await Company.findOneAndUpdate(
      { gstNumber }, // Search criteria
      { ...req.body, updatedAt: new Date() }, // Update data
      options
    );

    res.status(200).json({
      success: true,
      data: company,
      message: "Company details updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({
        success: false,
        message: "GST number already exists",
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
});

router.get("/api/getCompany", async (req, res) => {
  try {
    const company = await Company.findOne({}).sort({ updatedAt: -1 }); // Sort by updatedAt in descending order
    if (company) {
      res.json(company);
      // console.log("company ", company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;

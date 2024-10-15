const express = require("express");
const router = express.Router();
const BankDetail = require("../model/BankDetailsSchema");
router.get("/api/getbankDetails", async (req, res) => {
  try {
    const bankDetails = await BankDetail.find();
    res.json(bankDetails);
  } catch (error) {
    res.send(500).json({ message: err.message });
  }
});

router.post("/api/bankDetails", async (req, res) => {
  const { accountName, accountNumber, bankName, gpayNumber } = req.body.paymentDetails;
  const bankDetailToSave = new BankDetail({
    accountName,
    accountNumber,
    bankName,
    gpayNumber,
  });
  try {
    const newBankDetailsSave = await bankDetailToSave.save();
    res.status(200).json(newBankDetailsSave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

const custShipItemBill = require("../model/customerShipmentItemsBillRUD");
const express = require("express");
const router = express.Router();
router.post("/api/setCustShipItemBillDetails", (req, res) => {
  try {
    // console.log('req.body_set',req.body)
    const custShipItemBillDetails = new custShipItemBill(req.body);
    const saveCustShipItemBillDetails = custShipItemBillDetails.save();
    res.status(201).send(saveCustShipItemBillDetails);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/api/getCustShipItemBillDetails", async (req, res) => {
  try {
    const getDataCustShipItemBillDetails = await custShipItemBill.find();
    res.json(getDataCustShipItemBillDetails);
  } catch (error) {
    res.status(500).send("Error fetching getDataCustShipItemBillDetails");
  }
});
router.put("/api/editCustShipItemBillDetails/:id", async (req, res) => {
  try {
    const editCustShipItemBillDetails =
      await custShipItemBill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (!editCustShipItemBillDetails) {
      return res.status(404).send("editCustShipItemBillDetails not found");
    }
    res.json(editCustShipItemBillDetails);
  } catch (error) {
    res.status(500).send("Error updating editCustShipItemBillDetails data");
  }
});

router.delete("/api/deleteCustShipItemBillDetails/:id", async (req, res) => {
  try {
    const deleteCustShipItemBillDetails =
      await custShipItemBill.findByIdAndDelete(req.params.id);
    if (!deleteCustShipItemBillDetails) {
      return res.status(404).send("deleteCustShipItemBillDetails not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error deleting deleteCustShipItemBillDetails data");
  }
});
module.exports = router;

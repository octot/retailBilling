const Sequence = require("../model/SequenceGeneratorSchema");
const express = require("express");
const router = express.Router();

router.get("/api/nextBillNumber", async (req, res) => {
  try {
    const fiscalYear = getCurrentFiscalYear();
    const sequenceName = `billNumber_${fiscalYear}`;
    const sequenceValue = await getNextSequence(sequenceName);
    const paddedSequence = sequenceValue.toString().padStart(3, "0");
    const billNumber = `SP${paddedSequence} ${fiscalYear}-${fiscalYear + 1}`;
    res.json({ billNumber });
  } catch (error) {}
});
async function getNextSequence(sequenceName) {
  const result = await Sequence.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return result.sequence_value;
}
function getCurrentFiscalYear() {
  const today = new Date();
  return today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
}
module.exports = router;

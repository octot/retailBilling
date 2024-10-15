const mongoose = require('mongoose');
const SequenceSchema = new mongoose.Schema(
  {
    _id: String,
    sequence_value: Number
  }
)
const Sequence = mongoose.model('AutoSequence', SequenceSchema);
module.exports =Sequence;

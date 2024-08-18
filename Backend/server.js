const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const custShipItemBill = require('../Backend/model/customerShipmentItemsBillRUD')
app.use(bodyParser.json());
app.use(cors()); // Allows requests from your React frontend

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://user:user@cluster0.syund4p.mongodb.net/shiroenterprise', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Timeout after 30s
  socketTimeoutMS: 45000,         // Close sockets after 45s of inactivity
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema
const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  customerGst: String,
  phoneNumber: String
});
// Define a model
const Customer = mongoose.model('Customer', customerSchema);
app.post('/api/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send('Customer data saved');
  } catch (error) {
    res.status(500).send('Error saving customer data');
  }
});
app.get('/api/getExistingCustomerDetails', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).send('Error fetching customer data');
  }
});
app.post('/api/saveExistingCustomerDetails', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send('Customer data saved');
  } catch (error) {
    res.status(500).send('Error saving customer data');
  }
});
app.put('/api/editExistingCustomerDetails/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.json(customer);
  } catch (error) {
    res.status(500).send('Error updating customer data');
  }
});
app.delete('/api/deleteExistingCustomerDetails/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting customer data');
  }
});

app.post('/api/setCustShipItemBillDetails', (req, res) => {
  try {
    const custShipItemBillDetails = new custShipItemBill(req.body)
    const saveCustShipItemBillDetails = custShipItemBillDetails.save()
    res.status(201).send(saveCustShipItemBillDetails);
  }
  catch (err) {
    res.status(400).send(err);
  }
})
app.get('/api/getCustShipItemBillDetails', async (req, res) => {
  try {
    const getDataCustShipItemBillDetails = await custShipItemBill.find();
    res.json(getDataCustShipItemBillDetails);
  }
  catch (error) {
    res.status(500).send('Error fetching getDataCustShipItemBillDetails');
  }
})
app.put('/api/editCustShipItemBillDetails/:id', async (req, res) => {
  try {
    const editCustShipItemBillDetails = await custShipItemBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!editCustShipItemBillDetails) {
      return res.status(404).send('editCustShipItemBillDetails not found');
    }
    res.json(editCustShipItemBillDetails);
  } catch (error) {
    res.status(500).send('Error updating editCustShipItemBillDetails data');
  }
});

app.delete('/api/deleteCustShipItemBillDetails/:id', async (req, res) => {
  try {
    const deleteCustShipItemBillDetails = await custShipItemBill.findByIdAndDelete(req.params.id);
    if (!deleteCustShipItemBillDetails) {
      return res.status(404).send('deleteCustShipItemBillDetails not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting deleteCustShipItemBillDetails data');
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${port}`);
});
const SequenceSchema = new mongoose.Schema(
  {
    _id: String,
    sequence_value: Number
  }
)
const Sequence = mongoose.model('AutoSequence', SequenceSchema);
async function getNextSequence(sequenceName) {
  const result = await Sequence.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )
  return result.sequence_value
}
function getCurrentFiscalYear() {
  const today = new Date();
  return today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
}
app.get('/api/nextBillNumber', async (req, res) => {
  try {
    const fiscalYear = getCurrentFiscalYear();
    const sequenceName = `billNumber_${fiscalYear}`
    const sequenceValue = await getNextSequence(sequenceName)
    const paddedSequence = sequenceValue.toString().padStart(3, '0')
    const billNumber = `SP${paddedSequence} ${fiscalYear}-${fiscalYear + 1}`
    res.json({ billNumber })
  }
  catch (error) {
  }
}
)
module.exports = { customerSchema, SequenceSchema };

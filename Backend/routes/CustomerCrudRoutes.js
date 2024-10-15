// customerRoutes.js
const express = require('express');
const router = express.Router();
const Customer = require('../model/customerSchema'); // Adjust the path as necessary
router.post('/api/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send('Customer data saved');
  } catch (error) {
    res.status(500).send('Error saving customer data');
  }
});

router.get('/api/getExistingCustomerDetails', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).send('Error fetching customer data');
  }
});

router.post('/api/saveExistingCustomerDetails', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send('Customer data saved');
  } catch (error) {
    res.status(500).send('Error saving customer data');
  }
});

router.put('/api/editExistingCustomerDetails/:id', async (req, res) => {
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

router.delete('/api/deleteExistingCustomerDetails/:id', async (req, res) => {
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

module.exports = router;

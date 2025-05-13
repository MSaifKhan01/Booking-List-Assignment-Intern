const formRouter = require('express').Router();
const { Auth } = require('../middleware/auth');
const { RoleBase } = require('../middleware/roleAuth');
const { formModel } = require('../models/Form');

// Get all forms (auth required)
formRouter.get('/', Auth, async (req, res) => {
  try {
    const forms = await formModel.find();
    res.send({ msg: 'Forms fetched successfully', data: forms });
  } catch (err) {
    res.status(500).send({ msg: 'Failed to fetch forms' });
  }
});

// Create form (admin only, prevent duplicates)
formRouter.post('/', Auth, RoleBase(["admin"]), async (req, res) => {
  try {
    const { name, address, pin, phone } = req.body;

    // Check for missing fields
    if (!name || !address || !pin || !phone) {
      return res.status(400).send({ msg: 'All fields are required' });
    }

    // Check if the phone number already exists
    const existingForm = await formModel.findOne({ phone });
    if (existingForm) {
 
      return res.status(400).send({ msg: 'Form with this phone number already exists' });
    }

    const form = await formModel.create(req.body);
    res.status(201).send({ msg: 'Form created successfully', data: form });
  } catch (err) {
    res.status(500).send({ msg: 'Failed to create form' });
  }
});

// Update form (admin only, ID must exist)
formRouter.put('/:id', Auth, RoleBase(["admin"]), async (req, res) => {
  try {
    const { name, address, pin, phone } = req.body;

    // Check for missing fields
    if (!name || !address || !pin || !phone) {
      return res.status(400).send({ msg: 'All fields are required' });
    }

    // Check if form with given ID exists
    const form = await formModel.findById(req.params.id);
    if (!form) {
      return res.status(404).send({ msg: 'Form not found' });
    }

    // Ensure phone number is unique (exclude current form)
    const existingForm = await formModel.findOne({ phone, _id: { $ne: req.params.id } });
    if (existingForm) {
      return res.status(400).send({ msg: 'Form with this phone number already exists' });
    }

    const updatedForm = await formModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({ msg: 'Form updated successfully', data: updatedForm });
  } catch (err) {
    res.status(500).send({ msg: 'Failed to update form' });
  }
});

// Delete form (admin only, ID must exist)
formRouter.delete('/:id', Auth, RoleBase(["admin"]), async (req, res) => {
  try {
    const form = await formModel.findById(req.params.id);
    if (!form) {
      return res.status(404).send({ msg: 'Form not found' });
    }

    await formModel.findByIdAndDelete(req.params.id);
    res.send({ msg: 'Form deleted successfully' });
  } catch (err) {
    res.status(500).send({ msg: 'Failed to delete form' });
  }
});

module.exports = formRouter;

const express = require('express');
const { body, validationResult } = require('express-validator');
const Request = require('../models/Request');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/requests
// @desc    Create a help request
// @access  Private
router.post('/', auth, [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('helpType').isIn(['Money', 'Food', 'Clothes', 'Medicine']).withMessage('Invalid help type')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, phone, whatsapp, location, helpType, image, paymentMethod } = req.body;

  try {
    const newRequest = new Request({
      fullName,
      phone,
      whatsapp,
      location,
      helpType,
      image,
      paymentMethod,
      createdBy: req.user.id
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/requests
// @desc    Get all help requests
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/requests/:id
// @desc    Get request by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/requests/:id
// @desc    Update request status
// @access  Private
router.put('/:id', auth, [
  body('status').isIn(['pending', 'approved', 'completed']).withMessage('Invalid status')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = req.body.status;
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
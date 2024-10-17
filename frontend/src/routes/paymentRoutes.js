// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const paymentController = require('../controllers/paymentController');

// Route to create a new payment
router.post('/', authenticate, paymentController.createPayment);

// Route to fetch all payments
router.get('/', authenticate, paymentController.getPayments);

// Route to fetch a single payment by ID
router.get('/:id', authenticate, paymentController.getPaymentById);

// Route to update a payment by ID
router.put('/:id', authenticate, paymentController.updatePayment);

// Route to delete a payment by ID
router.delete('/:id', authenticate, paymentController.deletePayment);

module.exports = router;
// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } = require('../controllers/paymentController');

// Route to create a new payment (protected route)
router.post('/', authenticate, createPayment);

// Route to get a specific payment by ID (protected route)
router.get('/:id', authenticate, getPaymentById);

// Route to get all payments for a user (protected route)
router.get('/', authenticate, getPayments);

// Route to update the status of a payment (protected route)
router.put('/:id', authenticate, updatePayment);

// Route to delete a payment (protected route)
router.delete('/:id', authenticate, deletePayment);

module.exports = router;
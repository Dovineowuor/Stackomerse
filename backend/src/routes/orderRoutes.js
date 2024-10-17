// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { createOrder, getOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

// Route to create a new order (protected route)
router.post('/', authenticate, createOrder);

// Route to get a specific order by ID (protected route)
router.get('/:id', authenticate, getOrder);

// Route to get all orders for a user (protected route)
router.get('/', authenticate, getAllOrders);

// Route to update the status of an order (protected route)
router.put('/:id', authenticate, updateOrderStatus);

// Route to delete an order (protected route)
router.delete('/:id', authenticate, deleteOrder);

module.exports = router;
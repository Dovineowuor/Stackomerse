const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const {
    addProductToCart,
    getCart,
    updateCart,
    removeProductFromCart
} = require('../controllers/cartController');

// Route to add a product to the cart (protected route)
router.post('/add', authenticate, addProductToCart);

// Route to get the user's cart (protected route)
router.get('/all', authenticate, getCart);

// Route to update the quantity of a cart item (protected route)
router.put('/:id', authenticate, updateCart);

// Route to delete a cart item (protected route)
router.delete('/:id', authenticate, removeProductFromCart);

module.exports = router;

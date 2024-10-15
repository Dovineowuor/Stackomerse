const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // Assuming a product model exists

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll(); // Fetch products from the database
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Get a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Fetch a product by ID
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// Create a product(Protected route)
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});

// Update a product(Protected route)
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.image = req.body.image || product.image;
            product.countInStock = req.body.countInStock || product.countInStock;
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Delete a product(Protected route)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Csart route
router.post('/cart', (req, res) => {
    // Get all the cart items from the request body
    const cartItems = req.body.cartItems;
    // Process the cart items
    for (let item of cartItems) {
        // render item;
        cartItems.get(this.allItems).render(item);
    }
    // Return a response
    res.json({ message: 'Cart processed' });
});

const processPayment = (paymentMethod) => {
    if (paymentMethod === 'Stripe') {
        // Stripe payment processing logic
        console.log('Processing payment with Stripe...');
        // Add Stripe-specific logic here
    } else if (paymentMethod === 'PayPal') {
        // PayPal payment processing logic
        console.log('Processing payment with PayPal...');
        // Add PayPal-specific logic here
    } else {
        // Payment processing logic for other payment methods
        console.log(`Processing payment with method: ${paymentMethod}`);
        // Add logic for other payment methods here
    }
};

// Checkout route
router.post('/checkout', (req, res) => {
    // Get the payment method from the request body
    const paymentMethod = req.body.paymentMethod;
    // Process the payment
    processPayment(paymentMethod);
    // Return a response
    res.json({ message: 'Payment processed' });
});


module.exports = router;

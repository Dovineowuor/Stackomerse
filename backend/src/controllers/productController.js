// src/controllers/productController.js
const Product = require('../models/productModel'); // Import the Product model
const { v4: uuidv4 } = require('uuid'); // Import UUID

// Utility function for validating input
const validateProductInput = (name, description, price, stock) => {
    const errors = [];
    if (typeof name !== 'string' || name.trim() === '') {
        errors.push('Name must be a non-empty string.');
    }
    if (typeof description !== 'string' || description.trim() === '') {
        errors.push('Description must be a non-empty string.');
    }
    if (typeof price !== 'number' || isNaN(price) || price < 0) {
        errors.push('Price must be a non-negative number.');
    }
    if (typeof stock !== 'number' || isNaN(stock) || stock < 0) {
        errors.push('Stock must be a non-negative number.');
    }
    return errors;
};

// Create a new product
const createProduct = async (req, res) => {
    const { name, description, price, imageUrl, stock } = req.body;

    const errors = validateProductInput(name, description, price, stock);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation error', errors });
    }

    try {
        const newProduct = await Product.Product.create({
            id: uuidv4(), // Use UUID for the ID
            name,
            description,
            price,
            imageUrl,
            stock,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        console.error('Error creating product:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Validation error', errors: 'Product already exists.' });
        }
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products with optional pagination and filtering
const getAllProducts = async (req, res) => {
    try {
        const queryOptions = {};

        // Check for category filtering (optional)
        if (req.query.category) {
            queryOptions.where = {
                category: req.query.category,
            };
        }

        // Handle pagination
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit of 10
        const offset = (page - 1) * limit;

        queryOptions.limit = limit;
        queryOptions.offset = offset;

        const products = await Product.Product.findAll(queryOptions); // Fetch all products
        res.status(200).json(products); // Send the fetched products with a 200 status
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params; // Get ID from URL params

    try {
        const product = await Product.Product.findByPk(id); // Use UUID here
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params; // Get ID from URL params
    const { name, description, price, imageUrl, stock } = req.body;

    try {
        const product = await Product.Product.findByPk(id); // Use UUID here
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate updated fields
        const errors = validateProductInput(name, description, price, stock);
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        // Update product fields
        product.name = name !== undefined ? name : product.name;
        product.description = description !== undefined ? description : product.description;
        product.price = price !== undefined ? price : product.price;
        product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
        product.stock = stock !== undefined ? stock : product.stock; // Allow for stock to be 0

        await product.save(); // Save updated product
        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params; // Get ID from URL params

    try {
        const product = await Product.Product.findByPk(id); // Use UUID here
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy(); // Delete product
        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};

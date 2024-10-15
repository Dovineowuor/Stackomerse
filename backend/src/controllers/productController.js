// src/controllers/productController.js
const { Product } = require('../models/productModel'); // Importing the correct Product model
const { v4: uuidv4 } = require('uuid'); // Importing UUID for unique product IDs

// Utility function for validating input
// Checks if the product input fields are valid. Returns an array of error messages.
const validateProductInput = (name, description, price, stock) => {
    const errors = [];
    
    // Validating name
    if (typeof name !== 'string' || name.trim() === '') {
        errors.push('Name must be a non-empty string.');
    }
    
    // Validating description
    if (typeof description !== 'string' || description.trim() === '') {
        errors.push('Description must be a non-empty string.');
    }
    
    // Validating price
    if (typeof price !== 'number' || isNaN(price) || price < 0) {
        errors.push('Price must be a non-negative number.');
    }
    
    // Validating stock
    if (typeof stock !== 'number' || isNaN(stock) || stock < 0) {
        errors.push('Stock must be a non-negative number.');
    }

    return errors;
};

// Create a new product
// This function handles creating a new product, including validation and error handling.
const createProduct = async (req, res) => {
    const { name, description, price, imageUrl, stock, categoryId } = req.body;

    // Validate the product input data
    const errors = validateProductInput(name, description, price, stock);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation error', errors });
    }

    try {
        // Create a new product with a unique UUID
        const newProduct = await Product.create({
            id: uuidv4(),
            name,
            description,
            price,
            imageUrl,
            stock,
            categoryId, // Include the categoryId for product categorization
        });

        // Return the newly created product
        res.status(201).json(newProduct);
    } catch (error) {
        // Handling Sequelize validation errors and unique constraint errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Validation error', errors: 'Product already exists.' });
        }

        // Log and return any other errors that occur during product creation
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products with optional pagination and filtering
// This function retrieves all products, with optional category filtering and pagination.
const getAllProducts = async (req, res) => {
    try {
        const queryOptions = {}; // Options for filtering and pagination

        // Optional category filtering
        if (req.query.category) {
            queryOptions.where = {
                categoryId: req.query.category,
            };
        }

        // Handle pagination with page and limit query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit of 10 products per page
        const offset = (page - 1) * limit;

        queryOptions.limit = limit;
        queryOptions.offset = offset;

        // Fetch all products using the query options
        const products = await Product.findAll(queryOptions);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get a single product by ID
// Fetches a product based on the provided product ID (UUID).
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id); // Use Sequelize's findByPk to fetch by primary key (UUID)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the found product
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Update a product by ID
// Updates a product's fields based on the provided product ID (UUID) and body data.
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl, stock, categoryId } = req.body;

    try {
        // Fetch the product to be updated by its UUID
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate the updated product fields
        const errors = validateProductInput(name, description, price, stock);
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        // Update only the fields that are provided (skip if undefined)
        product.name = name !== undefined ? name : product.name;
        product.description = description !== undefined ? description : product.description;
        product.price = price !== undefined ? price : product.price;
        product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
        product.stock = stock !== undefined ? stock : product.stock;
        product.categoryId = categoryId !== undefined ? categoryId : product.categoryId;

        // Save the updated product to the database
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        // Handle Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }

        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product by ID
// Deletes a product based on the provided product ID (UUID).
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the product by UUID
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the product
        await product.destroy();
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

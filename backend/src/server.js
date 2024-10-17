const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import the database configuration
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes
const cartRoutes = require('./routes/cartRoutes'); // Import cart routes
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const helmet = require('helmet'); // Import helmet for setting security headers

// Set up environment variables
require('dotenv').config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(helmet()); // Set security headers

// Routes
app.use('/api/categories', categoryRoutes); // Route for category-related requests
app.use('/api/products', productRoutes); // Route for product-related requests
app.use('/api/user', userRoutes); // Route for user-related requests
app.use('/api/cart', cartRoutes); // Route for cart-related requests
app.use('/api/payments', paymentRoutes); // Route for payment-related requests
app.use('/api/orders', orderRoutes); // Route for order-related requests

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Sequelize setup for PostgreSQL
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', // Use PostgreSQL
    logging: false, // Disable SQL logging in the console
});

// Sequelize model associations
const { User, Product, Category, Cart, Payment, Order } = require('./models'); // Import all models

// Import sync functions for all models
const { syncModel: syncCartModel } = require('./models/cartModel');
const { syncModel: syncPaymentModel } = require('./models/paymentModel');
const { syncModel: syncCategoryModel } = require('./models/categoryModel');

// Test Database Connection and Sync the Models
const connectDatabase = async () => {
    try {
        await sequelize.authenticate(); // Test if the connection works
        console.log('Database connected successfully.');
        await sequelize.sync(); // Sync database models
        console.log('All models were synchronized successfully.');

        // Sync individual models
        await syncCartModel();
        await syncPaymentModel();
        await syncCategoryModel();
        console.log('Individual models synchronized successfully.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Start the server
const startServer = async () => {
    await connectDatabase(); // Sync and check DB connection before starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Start the server
startServer();
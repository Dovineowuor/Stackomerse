const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import the database configuration
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes

// set up environment variables
require('dotenv').config();

// const { syncModels } = require('./models/syncModels'); // Import the syncModels function

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/api/categories', categoryRoutes); // Route for category-related requests
app.use('/api/products', productRoutes); // Route for product-related requests
app.use('/api/users', userRoutes); // Route for user-related requests

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Sync the database models
const syncDatabase = async () => {
    const { syncUserModel, syncProductModel, syncCategoryModel } = require('./models');
    try {
        await Promise.all([
            syncUserModel(),
            syncProductModel(),
            syncCategoryModel(),
        ]);
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Start the server
const startServer = async () => {
    await syncDatabase(); // Sync before starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Start the server
startServer();

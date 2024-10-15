// src/config/db.js

const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from the .env file

// Create a new PostgreSQL pool using connection information from the .env file
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres', // or 'mysql', 'sqlite', etc.
});

// Function to test the PostgreSQL connection using `pg`.
const testPostgresConnection = async () => {
    const client = await pool.connect(); // Connect to the PostgreSQL pool
    try {
        const res = await client.query('SELECT NOW()'); // Run a test query
        console.log('Connected to the PostgreSQL database (pg).', res.rows[0]); // Log current timestamp
    } catch (error) {
        console.error('Error connecting to the PostgreSQL database (pg):', error.message);
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Function to test the Sequelize connection.
const testSequelizeConnection = async () => {
    try {
        await sequelize.authenticate(); // Authenticate Sequelize connection
        console.log('Connected to the PostgreSQL database (Sequelize).');
    } catch (error) {
        console.error('Unable to connect to the database via Sequelize:', error);
    }
};

// Function to synchronize Sequelize models with the database
const sync = async () => {
    try {
        await sequelize.sync(); // Sync models with the database
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

// Query function to execute raw SQL queries using `pg`.
const query = (text, params) => {
    return pool.query(text, params); // Execute the query with parameters (if any)
};

// Call the connection test functions
testPostgresConnection();
testSequelizeConnection();

// Export the query function, pool, and Sequelize instance for use in other parts of the app
module.exports = {
    sync,
    query,
    pool,
    sequelize,
};

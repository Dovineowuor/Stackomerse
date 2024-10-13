// src/models/productModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define the Product model
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0,
        },
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    categoryId: {
        type: DataTypes.UUID,
        references: {
            model: 'categories', // Name of the target model
            key: 'id', // Key in the target model
        },
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: true,
});

// Sync the Product model with the database
const syncProductModel = async () => {
    try {
        await Product.sync({ alter: true });
        console.log('Product model synchronized successfully.');
    } catch (error) {
        console.error('Error syncing Product model:', error.message);
    }
};

// Sync the Product model with the database
syncProductModel();

module.exports = {
    Product,
    syncProductModel,
};

// src/models/categoryModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define the Category model
const Category = sequelize.define('Category', {
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
}, {
    tableName: 'categories',
    timestamps: true,
});

// Sync the Category model with the database
const syncCategoryModel = async () => {
    try {
        await Category.sync({ alter: true });
        console.log('Category model synchronized successfully.');
    } catch (error) {
        console.error('Error syncing Category model:', error.message);
    }
};

// Sync the Category model with the database
syncCategoryModel();

module.exports = {
    Category,
    syncCategoryModel,
};

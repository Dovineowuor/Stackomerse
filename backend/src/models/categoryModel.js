const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import

// Define the Category model
const Category = sequelize.sequelize.define('Category', {
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

/**
 * Synchronize the Category model with the database.
 */
const syncCategoryModel = async () => {
    try {
        await Category.sync({ alter: true });
        console.log('Category model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing Category model:', error.message);
    }
};

module.exports = {
    Category,
    syncCategoryModel,
};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import

/**
 * Category model definition.
 * Represents a product category in the application.
 */
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
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

// Define the sync function
const syncModel = async () => {
    await Category.sync();
};

// Export the Category model and synchronization function
module.exports = {
    Category,
    syncModel,
};

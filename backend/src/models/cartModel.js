const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import
const { User } = require('./userModel'); // Import User model
const { Product } = require('./productModel'); // Import Product model

/**
 * Cart model definition.
 * Represents a shopping cart in the application.
 */
const Cart = sequelize.sequelize.define('Cart', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    productId: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    tableName: 'carts',
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

// Define the sync function
const syncModel = async () => {
    await Cart.sync();
};

// Export the Cart model and synchronization function
module.exports = {
    Cart,
    syncModel,
};

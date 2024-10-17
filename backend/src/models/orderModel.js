const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import
const { User } = require('./userModel'); // Import User model
const { Product } = require('./productModel'); // Import Product model

/**
 * Order model definition.
 * Represents an order in the application.
 */
const Order = sequelize.sequelize.define('Order', {
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
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    tableName: 'orders',
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

// Define the sync function
const syncModel = async () => {
    await Order.sync();
};

// Export the Order model and synchronization function
module.exports = {
    Order,
    syncModel,
};
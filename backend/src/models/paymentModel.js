const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import
const { User } = require('./userModel'); // Import User model

/**
 * Payment model definition.
 * Represents a payment in the application.
 */
const Payment = sequelize.sequelize.define('Payment', {
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
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'payments',
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

// Define the sync function
const syncModel = async () => {
    await Payment.sync();
};

// Export the Payment model and synchronization function
module.exports = {
    Payment,
    syncModel,
};
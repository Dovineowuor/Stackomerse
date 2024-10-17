const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db'); // Correct import

/**
 * User model definition.
 * Represents a user in the application with various roles like admin, seller, and shopper.
 */
const User = sequelize.sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    role: {
        type: DataTypes.ENUM('admin', 'seller', 'shopper'),
        allowNull: false,
        defaultValue: 'shopper',
    },
}, {
    tableName: 'users',
    timestamps: true, // Automatically manages createdAt and updatedAt fields
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});

// Define the sync function
const syncModel = async () => {
    await User.sync();
};

// Export the User model and synchronization function
module.exports = {
    User,
    syncModel,
};
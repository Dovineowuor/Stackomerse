const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import

// Define the User model
const User = sequelize.sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Use Sequelize's UUIDV4 directly
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
    timestamps: true,
});

/**
 * Synchronize the User model with the database.
 */
const syncModel = async () => {
    try {
        // Check for the ENUM type existence
        const [results] = await sequelize.query(`
            SELECT 1 FROM pg_type WHERE typname = 'enum_users_role';
        `);

        // Create the ENUM type if it doesn't exist
        if (results.length === 0) {
            console.log('Creating ENUM type for user roles...');
            await sequelize.query(`
                CREATE TYPE enum_users_role AS ENUM('admin', 'seller', 'shopper');
            `);
        } else {
            console.log('ENUM type already exists, skipping creation.');
        }

        // Sync the User model with the database, altering the table without dropping existing data
        await User.sync({ alter: true });
        console.log('User model synchronized successfully (altered existing table if necessary).');
    } catch (error) {
        console.error('Error synchronizing User model:', error.message);
    }
};

// Uncomment the next line to synchronize the model at startup (use cautiously)
syncModel();

module.exports = {
    User,
    syncModel,
};

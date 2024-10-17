const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import
const { Category } = require('./categoryModel'); // Import Category model

/**
 * Product model definition.
 * Represents a product in the application with a foreign key reference to Category.
 */
const Product = sequelize.sequelize.define('Product', {
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
            model: Category,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

// Define the relationship between Product and Category
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Define the sync function
const syncModel = async () => {
    await Product.sync();
};

// Export the Product model and synchronization function
module.exports = {
    Product,
    syncModel,
};

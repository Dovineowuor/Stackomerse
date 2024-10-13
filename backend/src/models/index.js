// src/models/index.js
const { User, syncModel: syncUserModel } = require('./userModel');
const { Product, syncProductModel } = require('./productModel');
const { Category, syncCategoryModel } = require('./categoryModel');

// Establish relationships
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = {
    User,
    Product,
    Category,
    syncUserModel,
    syncProductModel,
    syncCategoryModel,
};

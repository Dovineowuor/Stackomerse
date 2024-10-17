// src/models/index.js
const { User, syncModel: syncUserModel } = require('./userModel');
const { Product, syncModel: syncProductModel } = require('./productModel');
const { Category, syncModel: syncCategoryModel } = require('./categoryModel');
const { Cart, syncModel: syncCartModel } = require('./cartModel');
const { Payment, syncModel: syncPaymentModel } = require('./paymentModel');
const { Order, syncModel: syncOrderModel } = require('./orderModel');

// Establish relationships
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Product,
    Category,
    Cart,
    Payment,
    Order,
    syncUserModel,
    syncProductModel,
    syncCategoryModel,
    syncCartModel,
    syncPaymentModel,
    syncOrderModel,
};

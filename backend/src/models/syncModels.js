// src/syncModels.js
const { syncCategoryModel } = require('./categoryModel');
const { syncProductModel } = require('./productModel');

const syncModels = async () => {
    await syncCategoryModel();
    await syncProductModel();
};

syncModels();
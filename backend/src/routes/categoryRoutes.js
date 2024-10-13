// src/routes/categoryRoutes.js
const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

// Define routes
router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;

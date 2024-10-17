// src/routes/categoryRoutes.js
const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory, getCategoryById, getCategoryByName, getCategoryByIdOrName } = require('../controllers/categoryController');
const router = express.Router();

// Define routes

// Route for creating a new category
router.post('/', createCategory);

// Route for retrieving all categories
router.get('/', getCategories);

// Route for updating a category by ID
router.put('/:id', updateCategory);

// Route for deleting a category by ID
router.delete('/:id', deleteCategory);

// Route for retrieving a single category by id or name
router.get('/:Op', (req, res) => {
    const { Op } = req.params;
    if (Op.match(/^[0-9a-fA-F-]{36}$/)) {
        // If Op matches the pattern of a UUID
        req.params.id = Op;
        getCategoryById(req, res);
    } else {
        // Otherwise, treat it as a category name
        req.params.name = Op;
        getCategoryByName(req, res);
    }
});

// Route for retrieving a single category by ID
router.get('/id/:id', getCategoryById);

// Route for retrieving a single category by name
router.get('/name/:name', getCategoryByName);



module.exports = router;

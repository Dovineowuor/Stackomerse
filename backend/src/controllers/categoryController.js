const { Category } = require('../models');
const { validationResult } = require('express-validator'); // Ensure you have express-validator installed
const { Op } = require('sequelize');

// Create a new category
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

/**
 * Get a single category by ID
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - Response object containing the category or error messages
 * @async
 * @function getCategoryById
 * @example
 * getCategoryById(req, res);
 */

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
}

/**
 * getCategoryByName - Get a single category by name
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - Response object containing the category or error messages
 * @async
 * @function getCategoryByName
 * @example
 * getCategoryByName(req, res);
 */

const getCategoryByName = async (req, res) => {
    const { name } = req.params;

    try {
        const category = await Category.findOne({ where: { name } });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ id: category.id, name: category.name, description: category.description });
    } catch (error) {
        console.error('Error fetching category by name:', error);
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
}

/**
 * Get a single category by ID or name
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - Response object containing the category or error messages
 * @async
 * @function getCategoryById
 * @example
 * getCategoryById(req, res);
 * 
 * @example 
 * getCategoryById(req, res);
 */ 

const getCategoryByIdOrName = async (req, res) => {
    const { idOrName } = req.params;

    try {
        const category = await Category.findOne({
            where: {
                [Op.or]: [
                    { id: idOrName },
                    { name: idOrName }
                ]
            }
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category by ID or name:', error);
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update category details
        category.name = name;
        category.description = description;
        await category.save();

        res.status(200).json({ message: 'Category updated successfully', data: category });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoryByName,
    getCategoryByIdOrName,


};

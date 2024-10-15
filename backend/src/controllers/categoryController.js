const axios = require('axios');

// Set the base URL for your external API (replace with the actual API endpoint)
const API_BASE_URL = 'http://localhost:5000/api'; // Example base URL

// Create a new category
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const response = await axios.post(`${API_BASE_URL}/categories`, {
            name,
            description,
        });

        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const response = await axios.put(`${API_BASE_URL}/categories/${id}`, {
            name,
            description,
        });

        res.json({ message: 'Category updated successfully', data: response.data });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Category not found' });
        }
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await axios.delete(`${API_BASE_URL}/categories/${id}`);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Category not found' });
        }
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};

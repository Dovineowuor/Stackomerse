const { validateProductInput } = require('./validation');
const { Category, Product } = require('../models'); // Ensure these models are correctly imported
const { validationResult } = require('express-validator');

/**
 * Create a new product.
 * This function allows an authenticated user to create a new product.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the newly created product or error messages.
 */

const createProduct = async (req, res) => {
    const { name, description, price, categoryId, newCategory } = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let finalCategoryId;

        // Handle categoryId or newCategory
        if (categoryId) {
            // Check if categoryId is a valid UUID
            const category = await Category.findByPk(categoryId);
            if (category) {
                finalCategoryId = categoryId; // Use existing categoryId
            } else {
                return res.status(404).json({ message: 'Category not found' });
            }
        } else if (newCategory) {
            // Check if the category already exists
            let category = await Category.findOne({ where: { name: newCategory } });
            if (category) {
                finalCategoryId = category.id; // Use existing categoryId
            } else {
                // Create new category if it does not exist
                const newCategoryEntry = await Category.create({
                    name: newCategory,
                });
                finalCategoryId = newCategoryEntry.id; // Use newly created categoryId
            }
        } else {
            return res.status(400).json({ message: 'Either categoryId or newCategory must be provided' });
        }

        // Check if product with the same name already exists
        const existingProduct = await Product.findOne({ where: { name } });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this name already exists' });
        }

        // Create the new product
        const newProduct = await Product.create({
            name,
            description,
            price,
            categoryId: finalCategoryId,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};



/**
 * Get all products with optional pagination and filtering.
 * This function retrieves products based on query parameters for pagination and filtering.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing all products or error messages.
 */
const getAllProducts = async (req, res) => {
    const { page = 1, limit = 10, category } = req.query; // Destructure query parameters

    const offset = (page - 1) * limit; // Calculate offset for pagination

    const options = {
        limit: parseInt(limit),
        offset: parseInt(offset),
    };

    if (category) {
        options.where = { category }; // Filter by category if provided
    }

    try {
        const products = await Product.findAll(options);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

/**
 * Get a product by its ID.
 * This function retrieves a single product based on its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the product or error messages.
 */
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

/**
 * Update a product by its ID.
 * This function allows an authenticated user to update a product.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the updated product or error messages.
 */
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    // Validate product input data
    const errors = validateProductInput(name, description, price, category);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation error', errors });
    }

    try {
        const [updated] = await Product.update(
            { name, description, price, category },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await Product.findByPk(id);
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

/**
 * Delete a product by its ID.
 * This function allows an authenticated user to delete a product.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object indicating the deletion status or error messages.
 */
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Product.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(204).json(); // No content to return
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

/**
 * Get top-rated products.
 * This function fetches products sorted by rating in descending order.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing top-rated products or error messages.
 */
const getTopProducts = async (req, res) => {
    try {
        const topProducts = await Product.findAll({
            include: [{ model: Review }],
            order: [[{ model: Review }, 'rating', 'DESC']],
            limit: 5,
        });

        res.json(topProducts);
    } catch (error) {
        console.error('Error fetching top products:', error);
        res.status(500).json({ message: 'Error fetching top products', error: error.message });
    }
};

/**
 * Add a review for a product.
 * This function allows users to add reviews for a specific product by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the newly created review or error messages.
 */
const createProductReview = async (req, res) => {
    const { id } = req.params; // Product ID
    const { reviewText, rating } = req.body;

    // Validate review input data
    const errors = validateReviewInput(reviewText, rating);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation error', errors });
    }

    try {
        const newReview = await Review.create({
            productId: id,
            reviewText,
            rating,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

/**
 * Get reviews for a specific product.
 * Fetches all reviews for a product by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing reviews or error messages.
 */
const getProductReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const reviews = await Review.findAll({ where: { productId: id } });
        if (!reviews) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

/**
 * Get a specific review for a product by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the review or error messages.
 */
const getProductReviewById = async (req, res) => {
    const { id, reviewId } = req.params;

    try {
        const review = await Review.findOne({ where: { id: reviewId, productId: id } });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Error fetching review', error: error.message });
    }
};

/**
 * Update a review for a product.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the updated review or error messages.
 */
const updateProductReview = async (req, res) => {
    const { id, reviewId } = req.params; // Product ID and Review ID
    const { reviewText, rating } = req.body;

    // Validate review input data
    const errors = validateReviewInput(reviewText, rating);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation error', errors });
    }

    try {
        const [updated] = await Review.update(
            { reviewText, rating },
            { where: { id: reviewId, productId: id } }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const updatedReview = await Review.findByPk(reviewId);
        res.json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
};

/**
 * Delete a review for a product.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object indicating the deletion status or error messages.
 */
const deleteProductReview = async (req, res) => {
    const { id, reviewId } = req.params; // Product ID and Review ID

    try {
        const deleted = await Review.destroy({ where: { id: reviewId, productId: id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(204).json(); // No content to return
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};

/**
 * getProductByCategory()
 * getProductByCategory() fetches all products by category.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing products or error messages.
 * 
 * @example
 * getProductByCategory(req, res);
 * 
 * @returns {Object} - The response object containing products or error messages.
 * 
 * @throws {Error} - An error occurred fetching products by category.
 * 
 * @category Product Controller
 * 
 * @see module:categoryController.getCategoryById
 * @see module:categoryController.updateCategory
 * @see module:categoryController.deleteCategory
 * @see module:productController.createProduct
 * @see module:productController.getAllProducts
 * @see module:productController.getProductById
 * @see module:productController.updateProduct
 * @see module:productController.deleteProduct
 * @see module:productController.getTopProducts
 * @see module:productController.createProductReview
 * @see module:productController.getProductReviews
 * @see module:productController.getProductReviewById
 * @see module:productController.updateProductReview
 * @see module:productController.deleteProductReview
 * @see module:productController.getProductByCategory
 * 
 */

const getProductByCategory = async (req, res) => {
    const { categoryId, categoryName } = req.params;

    try {
        let category;
        if (categoryId) {
            // Check if categoryId is a valid UUID
            if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(categoryId)) {
                return res.status(400).json({ message: 'Invalid categoryId format' });
            }
            category = await Category.findByPk(categoryId);
        } else if (categoryName) {
            category = await Category.findOne({ where: { name: categoryName } });
        }

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const products = await Product.findAll({ where: { categoryId: category.id } });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Error fetching products by category', error: error.message });
    }
};

// Export all controller functions
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getTopProducts,
    createProductReview,
    getProductReviews,
    getProductReviewById,
    updateProductReview,
    deleteProductReview,
    getProductByCategory
};

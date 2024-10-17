const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Ensure correct path to the controller

// Route for creating a new product
router.post('/', productController.createProduct);

// Route for retrieving all products with optional pagination and filtering
router.get('/', productController.getAllProducts);

// Route for retrieving a single product by ID
router.get('/:id', productController.getProductById);

// Route for retrieving products by category ID
router.get('/category/:categoryId', productController.getProductByCategory);

// Route for retrieving products by category name
router.get('/category/:categoryName', productController.getProductByCategory);

// Route for updating a product by ID
router.put('/:id', productController.updateProduct);

// Route for deleting a product by ID
router.delete('/:id', productController.deleteProduct);

// Route for retrieving top-rated products
router.get('/top', productController.getTopProducts);

// Route for adding a review for a product
router.post('/:id/reviews', productController.createProductReview);

// Route for retrieving all reviews for a specific product
router.get('/:id/reviews', productController.getProductReviews);

// Route for retrieving a specific review for a product by review ID
router.get('/:id/reviews/:reviewId', productController.getProductReviewById);

// Route for updating a specific review for a product
router.put('/:id/reviews/:reviewId', productController.updateProductReview);

// Route for deleting a specific review for a product
router.delete('/:id/reviews/:reviewId', productController.deleteProductReview);

module.exports = router;

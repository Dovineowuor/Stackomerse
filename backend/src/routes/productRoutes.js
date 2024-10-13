const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Ensure this path is correct
const { authenticate } = require('../middleware/authMiddleware');

// Route to get all products (with optional pagination and filtering)
router.get('/', productController.getAllProducts);

// Route to get all products specifically for the shop
router.get('/shop', productController.getAllProducts);

// Route to get a product by its ID
router.get('/:id', productController.getProductById);

// Route to create a new product (protected route)
router.post('/', authenticate, productController.createProduct);

// Route to update a product by its ID (protected route)
router.put('/:id', authenticate, productController.updateProduct);

// Route to delete a product by its ID (protected route)
router.delete('/:id', authenticate, productController.deleteProduct);

// Optional routes for reviews (if implemented)
// router.post('/:id/review', authenticate, productController.createProductReview);
// router.put('/:id/review', authenticate, productController.updateProductReview);
// router.delete('/:id/review', authenticate, productController.deleteProductReview);

// Optional routes for additional functionalities (if needed)
// router.get('/top', productController.getTopProducts);
// router.get('/category/:category', productController.getProductsByCategory);
// router.get('/brand/:brand', productController.getProductsByBrand);
// router.get('/category/:category/brand/:brand', productController.getProductsByCategoryAndBrand);

// Export the router
module.exports = router;

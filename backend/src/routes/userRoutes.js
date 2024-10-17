const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
const { authenticate } = require('../middleware/authMiddleware'); // Import the auth middleware

// Route to register a new user
router.post('/register', async (req, res, next) => {
    try {
        console.log('Register endpoint hit:', req.body); // Log the request body
        await userController.registerUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Route to login user
router.post('/login', async (req, res, next) => {
    try {
        console.log('Login endpoint hit:', req.body); // Log the request body
        await userController.loginUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Route to get user profile (protected route)
router.get('/profile', authenticate, async (req, res, next) => {
    try {
        console.log('Profile endpoint hit:', req.user); // Log the authenticated user
        await userController.getUserProfile(req, res);
    } catch (error) {
        next(error);
    }
});

// Route to update user information (protected route)
router.put('/update', authenticate, async (req, res, next) => {
    try {
        console.log('Update endpoint hit:', req.body); // Log the request body
        await userController.updateUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Route to delete user account (protected route)
router.delete('/delete', authenticate, async (req, res, next) => {
    try {
        console.log('Delete endpoint hit:', req.user); // Log the authenticated user
        await userController.deleteUser(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
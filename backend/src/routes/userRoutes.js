// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
const { authenticate } = require('../middleware/authMiddleware');

// Debugging: Check what is imported
// console.log('User Controller:', userController);

// Route to register a new user
router.post('/register', (req, res, next) => {
    console.log('Register endpoint hit:', req.body); // Log the request body
    userController.registerUser(req, res).catch(next);
});

// Route to login user
router.post('/login', userController.loginUser); // Ensure this function is defined

// Route to get user profile (protected route)
router.get('/profile', authenticate, userController.getUserProfile); // Ensure this function is defined

// Route to update user information (protected route)
router.put('/update', authenticate, userController.updateUser); // Ensure this function is defined

// Route to delete user account (protected route)
router.delete('/delete', authenticate, userController.deleteUser); // Ensure this function is defined

module.exports = router;

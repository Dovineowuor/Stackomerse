const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Import axios for external API requests
const { User } = require('../models/userModel'); // Import the User model

// Utility function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'shopper',
        });

        const token = generateToken(newUser.id);
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            token,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Example axios usage for external API (e.g., external authentication or notification system)
const externalServiceRequest = async (userId) => {
    try {
        const response = await axios.post('https://api.external-service.com/notify', {
            userId: userId,
        });
        return response.data;
    } catch (error) {
        console.error('Error calling external service:', error);
        throw new Error('Failed to contact external service');
    }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Assume `req.user` is populated via authentication middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optional: Call an external service to get additional user data
        const externalData = await externalServiceRequest(user.id);

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            externalData, // Including data from external service if needed
        });
    } catch (error) {
        console.error('Fetch user profile error:', error);
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// Update user information (protected route)
const updateUser = async (req, res) => {
    const { id } = req.user; // Assuming req.user contains user details
    const { username, email, role } = req.body;

    try {
        const [updated] = await User.update(
            { username, email, role },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Example: Notify an external system of the update
        await externalServiceRequest(id);

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete user account (protected route)
const deleteUser = async (req, res) => {
    const { id } = req.user; // Assuming req.user contains user details

    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Example: Notify an external service that the user has been deleted
        await externalServiceRequest(id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser,
};

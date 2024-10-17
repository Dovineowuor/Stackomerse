const { check, validationResult } = require('express-validator');
const { isUUID } = require('validator');

// Product input validation
const validateProductInput = [
    check('name').notEmpty().withMessage('Name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    check('categoryId').optional().custom(value => {
        if (value && !isUUID(value)) {
            throw new Error('Category ID must be a valid UUID');
        }
        return true;
    }),
    check('newCategory')
        .optional()
        .isString().withMessage('New category name must be a string')
        .isLength({ min: 1, max: 100 }).withMessage('New category name must be between 1 and 100 characters'),
    (req, res, next) => {
        const { categoryId, newCategory } = req.body;
        if (!categoryId && !newCategory) {
            return res.status(400).json({ message: 'Either categoryId or newCategory must be provided' });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Review input validation
const validateReviewInput = [
    check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    check('comment').notEmpty().withMessage('Comment is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateProductInput,
    validateReviewInput,
};

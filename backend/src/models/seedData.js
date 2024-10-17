const { Category } = require('./categoryModel'); // Import the Category model
const sequelize = require('../config/db'); // Import the Sequelize instance

const seedCategories = async () => {
    const categories = [
        { name: 'Electronics', description: 'Devices and gadgets' },
        { name: 'Home Appliances', description: 'Kitchen and home devices' },
        { name: 'Fashion', description: 'Clothing and accessories' },
        { name: 'Books', description: 'Fiction, non-fiction, and more' },
        { name: 'Sports', description: 'Sporting goods and equipment' },
        { name: 'Health & Beauty', description: 'Personal care and wellness products' },
        { name: 'Toys', description: 'Toys and games for children' },
        { name: 'Automotive', description: 'Car accessories and parts' },
        { name: 'Gardening', description: 'Plants and gardening tools' },
        { name: 'Music', description: 'Musical instruments and accessories' },
    ];

    try {
        // Ensure the database is synced
        await sequelize.sync();
        
        // Check if categories already exist
        const existingCategories = await Category.findAll({
            attributes: ['name'],
            where: {
                name: categories.map(cat => cat.name)
            }
        });

        const existingCategoryNames = existingCategories.map(cat => cat.name);
        const newCategories = categories.filter(cat => !existingCategoryNames.includes(cat.name));

        if (newCategories.length > 0) {
            await Category.bulkCreate(newCategories);
            console.log('New categories seeded successfully!');
        } else {
            console.log('No new categories to seed.');
        }
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        // Close the connection to avoid memory leaks
        await sequelize.close();
    }
};

seedCategories();

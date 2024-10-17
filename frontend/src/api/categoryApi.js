// Fetch products by category
export const fetchProductsByCategoryAPI = async (categoryId) => {
    const response = await fetch(`http://localhost:5000/api/products?category=${categoryId}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch products for the category');
    }
    return await response.json();
};


// Fetch all categories
export const fetchCategoriesAPI = async () => {
    const response = await fetch('http://localhost:5000/api/categories', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await response.json();
};

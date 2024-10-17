// Register user
export const registerAPI = async (userData) => {
    const response = await fetch('http://localhost:5000/api/user/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to register');
    }
    return await response.json();
};

// Login user
export const loginAPI = async (credentials) => {
    const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return await response.json();
};

// Fetch user profile
export const fetchProfileAPI = async () => {
    const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }
    return await response.json();
};

// Update user
export const updateUserAPI = async (userData) => {
    const response = await fetch('http://localhost:5000/api/user/update/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return await response.json();
};

// Delete user
export const deleteUserAPI = async () => {
    const response = await fetch('http://localhost:5000/api/user/delete/', {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    return await response.json();
};

// frontend/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import productReducer from './features/products/productSlice';
import categoryReducer from './features/category/categorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    category: categoryReducer,
  },
});

export default store;

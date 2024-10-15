// frontend/src/features/category/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFail } = categorySlice.actions;

export default categorySlice.reducer;

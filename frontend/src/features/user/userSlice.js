// frontend/src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } = userSlice.actions;

export default userSlice.reducer;

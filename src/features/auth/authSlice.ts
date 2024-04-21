// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  // Define your user properties here
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  // Add any other authentication-related state properties here
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  // Initialize other authentication-related state properties
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    // Add any other authentication-related reducers here
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

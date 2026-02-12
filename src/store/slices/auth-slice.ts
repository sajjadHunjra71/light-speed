import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
    setAuthStatus: (state, action: PayloadAction<{ isAuthenticated: boolean; user?: User | null; token?: string | null }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.isLoading = false;
    },
  },
});

export const { setLoading, loginSuccess, logout, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;

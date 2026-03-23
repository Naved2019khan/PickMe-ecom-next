import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { User } from '@/lib/api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isDrawerOpen: boolean;
  authView: 'signin' | 'signup';
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isDrawerOpen: false,
  authView: 'signin',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    openAuthDrawer: (state, action: PayloadAction<'signin' | 'signup' | undefined>) => {
      state.isDrawerOpen = true;
      if (action.payload) {
        state.authView = action.payload;
      }
    },
    closeAuthDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    setAuthView: (state, action: PayloadAction<'signin' | 'signup'>) => {
      state.authView = action.payload;
    }
  },
});

export const { setUser, logout, openAuthDrawer, closeAuthDrawer, setAuthView } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsAuthDrawerOpen = (state: RootState) => state.auth.isDrawerOpen;
export const selectAuthView = (state: RootState) => state.auth.authView;

export default authSlice.reducer;

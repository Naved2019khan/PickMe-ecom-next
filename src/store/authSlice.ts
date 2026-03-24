import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { User } from '@/lib/api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isDrawerOpen: boolean;
  authView: 'signin' | 'signup';
  redirectUrl: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isDrawerOpen: false,
  authView: 'signin',
  redirectUrl: null,
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
    openAuthDrawer: (state, action: PayloadAction<{ view?: 'signin' | 'signup', redirectUrl?: string } | undefined>) => {
      state.isDrawerOpen = true;
      if (action.payload?.view) {
        state.authView = action.payload.view;
      }
      if (action.payload?.redirectUrl) {
        state.redirectUrl = action.payload.redirectUrl;
      }
    },
    closeAuthDrawer: (state) => {
      state.isDrawerOpen = false;
      state.redirectUrl = null;
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
export const selectRedirectUrl = (state: RootState) => state.auth.redirectUrl;

export default authSlice.reducer;

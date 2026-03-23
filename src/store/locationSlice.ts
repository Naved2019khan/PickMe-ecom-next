import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface LocationState {
  isDrawerOpen: boolean;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  lat: number | null;
  lng: number | null;
}

const initialState: LocationState = {
  isDrawerOpen: false,
  address: '',
  city: 'Bangalore', // Default city
  state: 'Karnataka',
  country: 'India',
  pin: '560001',
  lat: 12.9716, // Default to Bangalore
  lng: 77.5946,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    openLocationDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeLocationDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    setLocationDetails: (state, action: PayloadAction<Partial<LocationState>>) => {
      // Merge partial state selectively
      if (action.payload.address !== undefined) state.address = action.payload.address;
      if (action.payload.city !== undefined) state.city = action.payload.city;
      if (action.payload.state !== undefined) state.state = action.payload.state;
      if (action.payload.country !== undefined) state.country = action.payload.country;
      if (action.payload.pin !== undefined) state.pin = action.payload.pin;
      if (action.payload.lat !== undefined) state.lat = action.payload.lat;
      if (action.payload.lng !== undefined) state.lng = action.payload.lng;
    },
    resetLocation: () => initialState,
  },
});

export const { openLocationDrawer, closeLocationDrawer, setLocationDetails, resetLocation } = locationSlice.actions;

export const selectIsLocationDrawerOpen = (state: RootState) => state.location.isDrawerOpen;
export const selectLocationDetails = (state: RootState) => state.location;

export default locationSlice.reducer;

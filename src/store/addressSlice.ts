import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface Address {
  id:       string;
  name:     string;
  phone:    string;
  pincode:  string;
  line:     string;   // flat / street / landmark
  city:     string;
  state:    string;
  type:     "Home" | "Work" | "Other";
}

interface AddressState {
  items: Address[];
}

/* ─── Seed data (matches the old hardcoded checkout addresses) ──── */
const initialState: AddressState = {
  items: [
    {
      id: "addr1",
      name: "Naved Khan",
      phone: "+91 98765 43210",
      pincode: "560034",
      line: "Block B, Tech Park Road, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      type: "Home",
    },
    {
      id: "addr2",
      name: "Naved Khan",
      phone: "+91 98765 43210",
      pincode: "560066",
      line: "9th Floor, Horizon Tower, Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      type: "Work",
    },
  ],
};

/* ─── Slice ──────────────────────────────────────────────────────── */
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress(state, action: PayloadAction<Omit<Address, "id">>) {
      const id = `addr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      state.items.push({ ...action.payload, id });
    },

    updateAddress(state, action: PayloadAction<Address>) {
      const idx = state.items.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },

    deleteAddress(state, action: PayloadAction<string>) {
      state.items = state.items.filter((a) => a.id !== action.payload);
    },
  },
});

export const { addAddress, updateAddress, deleteAddress } = addressSlice.actions;

/* ─── Selectors ──────────────────────────────────────────────────── */
export const selectAddresses   = (s: RootState) => s.address.items;
export const selectAddressById = (id: string) => (s: RootState) =>
  s.address.items.find((a) => a.id === id);

export default addressSlice.reducer;

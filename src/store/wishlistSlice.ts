import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getWishlistApi, addToWishlistApi, removeFromWishlistApi, clearWishlistApi } from "@/lib/api/wishlist";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface WishlistItem {
  id:       string;
  name:     string;
  image:    string;
  price:    number;
  mrp:      number;
  discount: number;
}

interface WishlistState {
  items:      WishlistItem[];
  drawerOpen: boolean;
  status:     "idle" | "loading" | "succeeded" | "failed";
}

const initialState: WishlistState = {
  items:      [],
  drawerOpen: false,
  status:     "idle",
};

/* ─── Async Thunks ───────────────────────────────────────────────── */
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => await getWishlistApi()
);

export const toggleWishlistItemAsync = createAsyncThunk(
  "wishlist/toggleItem",
  async (item: WishlistItem, { getState }) => {
    const state = getState() as RootState;
    const exists = state.wishlist.items.some((i) => i.id === item.id);
    if (exists) {
      await removeFromWishlistApi(item.id);
      return { item, actionType: "removed" as const };
    } else {
      await addToWishlistApi(item);
      return { item, actionType: "added" as const };
    }
  }
);

export const removeWishlistItemAsync = createAsyncThunk(
  "wishlist/removeItem",
  async (id: string) => {
    await removeFromWishlistApi(id);
    return id;
  }
);

export const clearWishlistAsync = createAsyncThunk(
  "wishlist/clear",
  async () => {
    await clearWishlistApi();
  }
);

/* ─── Slice ──────────────────────────────────────────────────────── */
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    openWishlistDrawer(state)  { state.drawerOpen = true;  },
    closeWishlistDrawer(state) { state.drawerOpen = false; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(toggleWishlistItemAsync.fulfilled, (state, action) => {
      if (action.payload.actionType === "added") {
        state.items.push(action.payload.item);
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload.item.id);
      }
    });
    builder.addCase(removeWishlistItemAsync.fulfilled, (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    });
    builder.addCase(clearWishlistAsync.fulfilled, (state) => {
      state.items = [];
    });
  },
});

export const { openWishlistDrawer, closeWishlistDrawer } = wishlistSlice.actions;

/* ─── Selectors ──────────────────────────────────────────────────── */
export const selectWishlistItems = (s: RootState) => s.wishlist.items;
export const selectWishlistCount = (s: RootState) => s.wishlist.items.length;
export const selectWishlistOpen  = (s: RootState) => s.wishlist.drawerOpen;
export const selectIsWishlisted  = (id: string) => (s: RootState) =>
  s.wishlist.items.some((i) => i.id === id);

export default wishlistSlice.reducer;

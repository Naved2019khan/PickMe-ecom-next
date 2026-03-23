import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface CartItem {
  id:       string;
  name:     string;
  image:    string;
  price:    number;
  mrp:      number;
  discount: number;
  quantity: number;
}

interface CartState {
  items:      CartItem[];
  drawerOpen: boolean;
}

/* Local shape used for selectors — avoids circular import with store.ts */
interface WithCart { cart: CartState }

const initialState: CartState = {
  items:      [],
  drawerOpen: false,
};

/* ─── Slice ──────────────────────────────────────────────────────── */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    increment(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decrement(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearCart(state)    { state.items = []; },
    openDrawer(state)   { state.drawerOpen = true;  },
    closeDrawer(state)  { state.drawerOpen = false; },
    toggleDrawer(state) { state.drawerOpen = !state.drawerOpen; },
  },
});

export const {
  addToCart, increment, decrement,
  removeFromCart, clearCart,
  openDrawer, closeDrawer, toggleDrawer,
} = cartSlice.actions;

/* ─── Selectors ──────────────────────────────────────────────────── */
export const selectCartItems  = (s: WithCart) => s.cart.items;
export const selectDrawerOpen = (s: WithCart) => s.cart.drawerOpen;
export const selectCartCount  = (s: WithCart) =>
  s.cart.items.reduce((acc: number, i: CartItem) => acc + i.quantity, 0);

export const selectItemQty = (id: string) => (s: WithCart) =>
  s.cart.items.find((i: CartItem) => i.id === id)?.quantity ?? 0;

export const selectCartTotals = (s: WithCart) => {
  const subtotal = s.cart.items.reduce((acc: number, i: CartItem) => acc + i.price * i.quantity, 0);
  const mrpTotal = s.cart.items.reduce((acc: number, i: CartItem) => acc + i.mrp   * i.quantity, 0);
  const savings  = mrpTotal - subtotal;
  const delivery = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 49;
  const total    = subtotal + delivery;
  return { subtotal, mrpTotal, savings, delivery, total };
};

export default cartSlice.reducer;

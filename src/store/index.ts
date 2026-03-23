export { store, useAppDispatch, useAppSelector } from "./store";
export type { RootState, AppDispatch } from "./store";
export {
  cartSlice,
  addToCart, increment, decrement,
  removeFromCart, clearCart,
  openDrawer, closeDrawer, toggleDrawer,
  selectCartItems, selectCartCount, selectItemQty,
  selectCartTotals, selectDrawerOpen,
} from "./cartSlice";
export type { CartItem } from "./cartSlice";

export {
  setUser, logout, openAuthDrawer, closeAuthDrawer, setAuthView,
  selectUser, selectIsAuthenticated, selectIsAuthDrawerOpen, selectAuthView
} from "./authSlice";

export {
  openLocationDrawer, closeLocationDrawer, setLocationDetails, resetLocation,
  selectIsLocationDrawerOpen, selectLocationDetails
} from "./locationSlice";
export type { LocationState } from "./locationSlice";

export {
  addAddress, updateAddress, deleteAddress,
  selectAddresses, selectAddressById,
} from "./addressSlice";
export type { Address } from "./addressSlice";

export {
  fetchWishlist, toggleWishlistItemAsync, removeWishlistItemAsync, clearWishlistAsync,
  openWishlistDrawer, closeWishlistDrawer,
  selectWishlistItems, selectWishlistCount, selectWishlistOpen, selectIsWishlisted,
} from "./wishlistSlice";
export type { WishlistItem } from "./wishlistSlice";

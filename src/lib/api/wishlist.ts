import type { WishlistItem } from "@/store";

/* ─── Mock Data ─── */
let mockWishlist: WishlistItem[] = [];

/**
 * Fetch all wishlisted items for the current user.
 */
export async function getWishlistApi(): Promise<WishlistItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mockWishlist];
}

/**
 * Add an item to the wishlist.
 */
export async function addToWishlistApi(item: WishlistItem): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const exists = mockWishlist.find((i) => i.id === item.id);
  if (!exists) {
    mockWishlist.push(item);
  }
}

/**
 * Remove an item from the wishlist.
 */
export async function removeFromWishlistApi(itemId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  mockWishlist = mockWishlist.filter((i) => i.id !== itemId);
}

/**
 * Clear the entire wishlist.
 */
export async function clearWishlistApi(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  mockWishlist = [];
}

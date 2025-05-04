
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, FoodItem, User, WishlistItem } from "./types";
import { mockCanteens, mockFoodItems } from "./mockData";

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User | null;
  isAuthenticated: boolean;
  canteens: typeof mockCanteens;
  foodItems: typeof mockFoodItems;
  
  // Actions
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: FoodItem) => void;
  removeFromWishlist: (itemId: string) => void;
  login: (user: User) => void;
  logout: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      isAuthenticated: false,
      canteens: mockCanteens,
      foodItems: mockFoodItems,

      addToCart: (item: FoodItem) => {
        const cart = get().cart;
        const existingItem = cart.find((cartItem) => cartItem.foodItem.id === item.id);

        if (existingItem) {
          set({
            cart: cart.map((cartItem) =>
              cartItem.foodItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          });
        } else {
          set({ cart: [...cart, { foodItem: item, quantity: 1 }] });
        }
      },

      removeFromCart: (itemId: string) => {
        const cart = get().cart;
        set({ cart: cart.filter((item) => item.foodItem.id !== itemId) });
      },

      updateCartItemQuantity: (itemId: string, quantity: number) => {
        const cart = get().cart;
        if (quantity <= 0) {
          set({ cart: cart.filter((item) => item.foodItem.id !== itemId) });
        } else {
          set({
            cart: cart.map((item) =>
              item.foodItem.id === itemId ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => {
        set({ cart: [] });
      },

      addToWishlist: (item: FoodItem) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((wishItem) => wishItem.foodItem.id === item.id);

        if (!exists) {
          set({ wishlist: [...wishlist, { foodItem: item }] });
        }
      },

      removeFromWishlist: (itemId: string) => {
        const wishlist = get().wishlist;
        set({ wishlist: wishlist.filter((item) => item.foodItem.id !== itemId) });
      },

      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.foodItem.price * item.quantity,
          0
        );
      },

      getCartItemsCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "campus-bite-storage",
    }
  )
);

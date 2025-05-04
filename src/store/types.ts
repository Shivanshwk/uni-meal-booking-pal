
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  canteenId: string;
}

export interface Canteen {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  contact: string;
  openingHours: string;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface WishlistItem {
  foodItem: FoodItem;
}

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed';
  paymentStatus: 'pending' | 'paid';
  tokenNumber: string;
  orderDate: string;
  canteenId: string;
}

import { smartphones, featuredDeals } from "@/lib/data";
import type { Product } from "@/types";

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface PastOrder {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// We'll borrow some products from our local mocks to make the images look realistic.
const p1 = smartphones[0];
const p2 = featuredDeals[1];
const p3 = smartphones[2];

const MOCK_ORDERS: PastOrder[] = [
  {
    id: "ORD-EX7RHNDMT",
    date: "Oct 12, 2023",
    status: "Processing",
    total: p1.price + 49, // plus delivery
    items: [
      { id: p1.id, name: p1.name, image: p1.image, price: p1.price, quantity: 1 }
    ]
  },
  {
    id: "ORD-92KALZPQ1",
    date: "Sep 28, 2023",
    status: "Shipped",
    total: (p2.price * 2) + 0, 
    items: [
      { id: p2.id, name: p2.name, image: p2.image, price: p2.price, quantity: 2 }
    ]
  },
  {
    id: "ORD-BX3T9N2C0",
    date: "Aug 14, 2023",
    status: "Delivered",
    total: p3.price + p1.price,
    items: [
      { id: p3.id, name: p3.name, image: p3.image, price: p3.price, quantity: 1 },
      { id: p1.id, name: p1.name, image: p1.image, price: p1.price, quantity: 1 }
    ]
  },
  {
    id: "ORD-FAIL9922X",
    date: "Jul 02, 2023",
    status: "Cancelled",
    total: 12999,
    items: [
      { id: "mock-1", name: "Wireless Charging Pad", image: "https://images.unsplash.com/photo-1586953208448-b95a794e83f2?w=800&auto=format&fit=crop", price: 12999, quantity: 1 }
    ]
  }
];

export async function fetchUserOrders(): Promise<PastOrder[]> {
  await delay(800); // Simulate network latency
  return MOCK_ORDERS;
}

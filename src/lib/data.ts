import type { Product, Category, Brand, HeroSlide, NavCategory } from "@/types";

/* ─── Hero Slides ──────────────────────────────────────────────── */
export const heroSlides: HeroSlide[] = [
  {
    id:       "slide-1",
    tagline:  "Best Deal Online on smart watches",
    title:    "SMART WEARABLE.",
    subtitle: "UP to 80% OFF",
    cta:      "Shop Now",
    ctaHref:  "/electronics/wearables",
    image:    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    bg:       "linear-gradient(135deg, #0f1f3d 0%, #162544 60%, #1a3a6e 100%)",
  },
  {
    id:       "slide-2",
    tagline:  "Mega Savings on Latest Smartphones",
    title:    "SMARTPHONES.",
    subtitle: "Starting ₹8,999",
    cta:      "Explore Now",
    ctaHref:  "/electronics/phones",
    image:    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    bg:       "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
  },
  {
    id:       "slide-3",
    tagline:  "Fresh Fashion Every Week",
    title:    "FASHION WEEK.",
    subtitle: "UP to 70% OFF",
    cta:      "Shop Fashion",
    ctaHref:  "/fashion",
    image:    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    bg:       "linear-gradient(135deg, #1f0a2e 0%, #2d1444 60%, #4a1a6e 100%)",
  },
];

/* ─── Smartphones ──────────────────────────────────────────────── */
export const smartphones: Product[] = [
  {
    id:       "sm-1",
    name:     "Galaxy S22 Ultra",
    image:    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80",
    price:    32999,
    mrp:      74999,
    discount: 56,
    rating:   4.5,
    reviews:  2341,
  },
  {
    id:       "sm-2",
    name:     "Galaxy M13 (4GB | 64GB)",
    image:    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&q=80",
    price:    10499,
    mrp:      14999,
    discount: 56,
    rating:   4.2,
    reviews:  1890,
    tag:      "Trending",
  },
  {
    id:       "sm-3",
    name:     "Galaxy M33 5G (4GB | 64GB)",
    image:    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&q=80",
    price:    16999,
    mrp:      24999,
    discount: 56,
    rating:   4.3,
    reviews:  987,
  },
  {
    id:       "sm-4",
    name:     "Galaxy M53 (4GB | 64GB)",
    image:    "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=300&q=80",
    price:    31999,
    mrp:      40999,
    discount: 56,
    rating:   4.4,
    reviews:  756,
  },
  {
    id:       "sm-5",
    name:     "Galaxy S22 Ultra 5G",
    image:    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=300&q=80",
    price:    67999,
    mrp:      85999,
    discount: 56,
    rating:   4.7,
    reviews:  3421,
    tag:      "Premium",
  },
  {
    id:       "sm-6",
    name:     "Galaxy A53 5G (8GB | 128GB)",
    image:    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&q=80",
    price:    24999,
    mrp:      34999,
    discount: 43,
    rating:   4.3,
    reviews:  1204,
  },
];

/* ─── Categories ───────────────────────────────────────────────── */
export const topCategories: Category[] = [
  { id: "cat-1", label: "Mobile",      icon: "📱", href: "/category/mobile"      },
  { id: "cat-2", label: "Cosmetics",   icon: "🧴", href: "/category/cosmetics"   },
  { id: "cat-3", label: "Electronics", icon: "🔌", href: "/category/electronics" },
  { id: "cat-4", label: "Furniture",   icon: "🛋️", href: "/category/furniture"   },
  { id: "cat-5", label: "Watches",     icon: "⌚", href: "/category/watches"     },
  { id: "cat-6", label: "Decor",       icon: "🌿", href: "/category/decor"       },
  { id: "cat-7", label: "Accessories", icon: "💍", href: "/category/accessories" },
];

/* ─── Brands ───────────────────────────────────────────────────── */
export const topBrands: Brand[] = [
  {
    id:    "brand-1",
    name:  "Apple iPhone",
    logo:  "🍎",
    offer: "UP to 80% OFF",
    bg:    "#1c1c1e",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&q=80",
  },
  {
    id:    "brand-2",
    name:  "Realme",
    logo:  "realme",
    offer: "UP to 80% OFF",
    bg:    "#f5e642",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&q=80",
  },
  {
    id:    "brand-3",
    name:  "Xiaomi",
    logo:  "Mi",
    offer: "UP to 80% OFF",
    bg:    "#ff6b35",
    image: "https://images.unsplash.com/photo-1608786675914-e0e3a55d4e82?w=200&q=80",
  },
  {
    id:    "brand-4",
    name:  "Samsung",
    logo:  "S",
    offer: "UP to 60% OFF",
    bg:    "#1428a0",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&q=80",
  },
  {
    id:    "brand-5",
    name:  "OnePlus",
    logo:  "1+",
    offer: "UP to 50% OFF",
    bg:    "#f5010c",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=200&q=80",
  },
];

/* ─── Nav Categories ───────────────────────────────────────────── */
export const navCategories: NavCategory[] = [
  { label: "Groceries",        href: "/groceries" },
  { label: "Premium Fruits",   href: "/premium-fruits" },
  { label: "Home & Kitchen",   href: "/home-kitchen" },
  { label: "Fashion",          href: "/fashion" },
  { label: "Electronics",      href: "/electronics" },
  { label: "Beauty",           href: "/beauty" },
  { label: "Home Improvement", href: "/home-improvement" },
  { label: "Sports, Toys & Luggage", href: "/sports-toys-luggage" },
];

/* ─── Featured products (deals) ───────────────────────────────── */
export const featuredDeals: Product[] = [
  {
    id:       "fd-1",
    name:     "Noise ColorFit Pro 4 Alpha",
    image:    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    price:    2499,
    mrp:      7999,
    discount: 69,
    tag:      "Deal of the Day",
  },
  {
    id:       "fd-2",
    name:     "boAt Rockerz 450 Wireless",
    image:    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    price:    999,
    mrp:      3490,
    discount: 71,
    tag:      "Hot Deal",
  },
  {
    id:       "fd-3",
    name:     "JBL Flip 6 Bluetooth Speaker",
    image:    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
    price:    8499,
    mrp:      11999,
    discount: 29,
  },
  {
    id:       "fd-4",
    name:     "Sony WH-1000XM5",
    image:    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&q=80",
    price:    22990,
    mrp:      29990,
    discount: 23,
    tag:      "Premium",
  },
];

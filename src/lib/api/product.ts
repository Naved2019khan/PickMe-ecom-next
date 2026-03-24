import type { Product } from "@/types";

export interface ProductDetails extends Product {
  images: string[];
  inStock: boolean;
  stockCount: number;
  longDescription: string;
  specs: { label: string; value: string }[];
  deliveryTime: string;
  reviewsList: { id: string; user: string; text: string; rating: number; date: string }[];
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const MOCK_PRODUCTS_DB: Record<string, ProductDetails> = {
  "p1": {
    id: "p1",
    name: "Noise ColorFit Pro 4 Alpha",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80", 
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    ],
    price: 2499,
    mrp: 5999,
    discount: 58,
    description: "1.78\" AMOLED Display, Bluetooth Calling, 7 Days Battery",
    tag: "Trending",
    rating: 4.5,
    reviews: 12450,
    imageBg: "var(--color-primary-light)",
    inStock: true,
    stockCount: 45,
    deliveryTime: "2-3 Days",
    longDescription: "The Noise ColorFit Pro 4 Alpha offers a massive 1.78-inch AMOLED display, a fully functional digital crown, and seamless Bluetooth calling. With an always-on display and up to 7 days of battery life, it keeps you connected and active without constantly reaching for the charger. Track your health with 100+ sports modes, 24/7 heart rate monitoring, and blood oxygen tracking directly from your wrist.",
    specs: [
      { label: "Brand", value: "Noise" },
      { label: "Display", value: "1.78\" AMOLED" },
      { label: "Battery Life", value: "Up to 7 days" },
      { label: "Water Resistance", value: "IP68" },
      { label: "Sensors", value: "SpO2, Heart Rate, Accelerometer" },
      { label: "Warranty", value: "1 Year Manufacturer" },
    ],
    reviewsList: [
      { id: "r1", user: "Rohan K.", text: "Absolutely totally worth the money. Display is incredibly crisp and smooth.", rating: 5, date: "3 days ago" },
      { id: "r2", user: "Neha S.", text: "Battery life is good but could be marginally better. Love the Bluetooth calling.", rating: 4, date: "1 week ago" }
    ]
  },
  "p3": {
    id: "p3",
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426fa99e5?w=600&q=80", 
    ],
    price: 26990,
    mrp: 34990,
    discount: 22,
    description: "Industry Leading Noise Canceling, 30Hrs Battery, Multipoint",
    tag: "Bestseller",
    rating: 4.8,
    reviews: 8432,
    imageBg: "#fef08a",
    inStock: true,
    stockCount: 12,
    deliveryTime: "Tomorrow",
    longDescription: "Experience industry-leading noise cancellation with the Sony WH-1000XM5. Featuring an all-new incredibly comfortable design, these headphones deliver pristine audio quality thanks to the Integrated Processor V1. Enjoy crystal clear hands-free calling with precise voice pickup technology and advanced audio signal processing.",
    specs: [
      { label: "Brand", value: "Sony" },
      { label: "Type", value: "Over-Ear Wireless" },
      { label: "ANC", value: "Industry Leading Noise Cancellation" },
      { label: "Battery Life", value: "30 Hours" },
      { label: "Charging", value: "3 min charge for 3 hours of playback" },
      { label: "Warranty", value: "1 Year Manufacturer" },
    ],
    reviewsList: [
      { id: "r3", user: "Vikram P.", text: "The noise cancellation is basically magic. I wear them in the office and hear nothing.", rating: 5, date: "2 weeks ago" },
      { id: "r4", user: "Ananya M.", text: "Super comfortable for long flights. Audio quality is unmatched.", rating: 5, date: "1 month ago" }
    ]
  }
};

export async function getProductById(id: string): Promise<ProductDetails | null> {
  await delay(800); // simulate network latency
  
  const product = MOCK_PRODUCTS_DB[id];
  
  if (!product) {
    // Return a generic generated product if ID is not specifically explicitly mocked
    return {
      id,
      name: "Premium Supercharged Wireless Device (Generic Demo)",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      ],
      price: 3499,
      mrp: 6999,
      discount: 50,
      description: "Generic highly rated sample product for testing the UI",
      rating: 4.3,
      reviews: 320,
      imageBg: "#f3f4f6", // gray-100
      inStock: true,
      stockCount: 100,
      deliveryTime: "3-5 Days",
      longDescription: "This is a generic product automatically generated by the mock API because the specific Product ID was not found in the hardcoded database. It serves to demonstrate the layout without throwing a hard 404 error.",
      specs: [
        { label: "Brand", value: "Generic Demo" },
        { label: "Material", value: "Aluminum & Glass" },
        { label: "Warranty", value: "6 Months" },
      ],
      reviewsList: [
        { id: "g1", user: "Arjun D.", text: "Great generic product!", rating: 4, date: "Just now" }
      ]
    };
  }
  
  return product;
}

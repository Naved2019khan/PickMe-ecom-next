import { smartphones, featuredDeals, topCategories } from "@/lib/data";
import type { Product, Category } from "@/types";

const ALL_PRODUCTS: Product[] = [...smartphones, ...featuredDeals];
const ALL_CATEGORIES: Category[] = topCategories;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function searchProducts(query: string, category?: string): Promise<{ products: Product[], categories: Category[] }> {
  // Simulate network lag to give the UI a realistic loading state
  await delay(600); 

  const q = query.trim().toLowerCase();
  
  let filteredProducts = ALL_PRODUCTS;
  
  if (q) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description?.toLowerCase().includes(q) || 
      p.tag?.toLowerCase().includes(q)
    );
  }

  if (category) {
    // In a real app we'd filter by an exact `categoryId`. For this mock, we filter broadly.
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(category.toLowerCase()));
  }

  const filteredCategories = q 
    ? ALL_CATEGORIES.filter(c => c.label.toLowerCase().includes(q)) 
    : ALL_CATEGORIES;

  return { products: filteredProducts, categories: filteredCategories };
}

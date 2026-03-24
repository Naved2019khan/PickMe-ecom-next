import { searchProducts } from "@/lib/api/search";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { SearchX, Filter } from "lucide-react";

export const metadata = {
  title: "Search Results - MegaMart",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const { products } = await searchProducts(query);

  return (
    <main className="container-main py-8 sm:py-12 min-h-[70vh]">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {query ? `Search results for "${query}"` : "All Products"}
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">
            {products.length} {products.length === 1 ? "item" : "items"} found
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* ── Results Grid ── */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="w-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[32px] border border-gray-100 dashed text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-gray-200/50 mb-6">
            <SearchX size={40} className="text-orange-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">No matching products</h2>
          <p className="text-base font-medium text-gray-500 max-w-md">
            We couldn't find anything matching "{query}". Try checking your spelling or searching with broader terms.
          </p>
          <Link href="/" className="mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-xl shadow-md shadow-orange-200 hover:brightness-105 active:scale-95 transition-all">
            Return to Home
          </Link>
        </div>
      )}

    </main>
  );
}

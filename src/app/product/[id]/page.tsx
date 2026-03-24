"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById, type ProductDetails } from "@/lib/api/product";
import { formatINR } from "@/lib/utils";
import { 
  useAppDispatch, useAppSelector, 
  addToCart, selectItemQty, increment, decrement,
  openLocationDrawer, selectLocationDetails
} from "@/store";
import { 
  Star, ShieldCheck, Truck, ChevronRight, 
  Plus, Minus, ShoppingCart, MapPin, CheckCircle2, AlertTriangle
} from "lucide-react";
import React from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectLocationDetails);
  
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Image Gallery State
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    getProductById(id).then((data) => {
      if (isMounted) {
        setProduct(data);
        if (data && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [id]);

  // Read current qty from cart
  const qty = useAppSelector(state => product ? selectItemQty(product.id)(state) : 0);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="container-main py-8 animate-pulse flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 aspect-square rounded-3xl bg-gray-100" />
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="h-10 bg-gray-100 rounded-xl w-3/4" />
          <div className="h-6 bg-gray-100 rounded-lg w-1/4" />
          <div className="h-20 bg-gray-100 rounded-2xl w-full" />
          <div className="h-40 bg-gray-100 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  // Not Found
  if (!product) {
    return (
      <div className="container-main py-20 text-center flex flex-col items-center justify-center">
        <AlertTriangle size={64} className="text-orange-300 mb-6" />
        <h1 className="text-3xl font-black text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find the product you're looking for. It might have been removed or the link is invalid.</p>
        <Link href="/" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-200">
          Return to MegaMart
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      mrp: product.mrp,
      discount: product.discount,
    }));
  };

  return (
    <main className="container-main py-8 sm:py-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span className="hover:text-orange-500 transition-colors cursor-pointer capitalize">Electronics</span>
        <ChevronRight size={12} />
        <span className="text-gray-800 line-clamp-1">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* ── LEFT: Image Gallery ── */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:sticky top-28 self-start bg-white z-10 pb-4">
          {/* Main Huge Image */}
          <div 
            className="w-full aspect-square rounded-[32px] flex items-center justify-center p-8 sm:p-16 relative overflow-hidden transition-all duration-500"
            style={{ backgroundColor: product.imageBg || "#fef08a" }} // Warm default
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Discount Badge */}
            {product.discount > 0 && (
              <span className="absolute top-6 left-6 px-4 py-2 bg-rose-500 text-white text-sm font-black tracking-wider rounded-2xl shadow-lg shadow-rose-200/50">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 aspect-square rounded-2xl border-2 transition-all shrink-0 overflow-hidden bg-white 
                    ${activeImage === img ? 'border-orange-500 shadow-lg shadow-orange-100' : 'border-transparent hover:border-gray-200'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-contain p-2 drop-shadow-md" sizes="96px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Details & Actions ── */}
        <div className="w-full lg:w-1/2 flex flex-col">
          
          {/* Tag & Title */}
          {product.tag && (
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-wider rounded-lg w-fit mb-4">
              {product.tag}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-[1.15] mb-4 tracking-tight">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
              <Star size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-sm font-bold text-orange-600">{product.rating || 0}</span>
            </div>
            <span className="text-sm font-semibold text-gray-400 underline underline-offset-4 decoration-gray-200 cursor-pointer hover:text-gray-600 transition-colors">
              {(product.reviews || 0).toLocaleString()} verified reviews
            </span>
          </div>

          {/* Price Block */}
          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter">
              {formatINR(product.price)}
            </span>
            {product.discount > 0 && (
              <span className="text-lg sm:text-xl font-bold text-gray-400 line-through mb-1.5 decoration-2 decoration-gray-300">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>

          {/* Delivery Location Banner */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-8 flex items-start gap-4 transition-colors hover:bg-gray-100/50">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 text-blue-500">
               <MapPin size={20} />
             </div>
             <div className="flex-1">
               <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">Delivery To</p>
               <h4 className="text-sm font-black text-gray-900 line-clamp-1">{location.city}, {location.pin}</h4>
               <p className="text-xs font-semibold text-gray-400 mt-1 flex items-center gap-1.5">
                 <Truck size={12} className="text-green-500" />
                 Delivery by <strong className="text-gray-800">{product.deliveryTime}</strong>
               </p>
             </div>
             <button 
               onClick={() => dispatch(openLocationDrawer())}
               className="text-xs font-bold text-orange-500 hover:text-orange-600 underline underline-offset-2 decoration-orange-200"
             >
               Change
             </button>
          </div>

          {/* Add to Cart / Quantity Actions */}
          <div className="mb-10">
            {qty === 0 ? (
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full sm:w-80 h-16 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-200 hover:brightness-105 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <ShoppingCart size={22} className={product.inStock ? "" : "opacity-50"} />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            ) : (
              <div className="flex items-center gap-5">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl p-1.5 shadow-inner w-fit">
                  <button
                    onClick={() => dispatch(decrement(product.id))}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 hover:text-orange-500 transition-colors"
                  >
                    <Minus size={20} strokeWidth={2.5} />
                  </button>
                  <span className="w-16 text-center text-xl font-black text-gray-900">{qty}</span>
                  <button
                    onClick={() => dispatch(increment(product.id))}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 hover:text-orange-500 transition-colors"
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-xl">
                  <CheckCircle2 size={16} /> Added to Cart
                </div>
              </div>
            )}
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Description & Features */}
          <div className="space-y-8">
            
            {/* About the product */}
            <div className="space-y-3">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                About this item
              </h3>
              <p className="text-[15px] font-medium text-gray-500 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex flex-col gap-1 py-3 border-b border-gray-100 last:border-0 sm:last:border-b">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{spec.label}</span>
                    <span className="text-sm font-bold text-gray-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Authenticity Guarantee */}
            <div className="flex items-center gap-4 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                 <ShieldCheck size={20} className="text-orange-600" />
               </div>
               <div>
                 <h4 className="text-sm font-black text-gray-900">100% Authentic Product</h4>
                 <p className="text-xs font-semibold text-gray-500 mt-0.5">Sourced directly from verified brands.</p>
               </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── BOTTOM: Customer Reviews ── */}
      <hr className="border-gray-200 my-16" />
      <section className="max-w-4xl">
        <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
          Customer Reviews 
          <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{product.reviewsList?.length || 0}</span>
        </h2>
        
        {product.reviewsList && product.reviewsList.length > 0 ? (
          <div className="grid gap-6">
            {product.reviewsList.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-white font-black flex items-center justify-center shadow-md">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900">{review.user}</h4>
                      <p className="text-xs font-semibold text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md">
                    <Star size={12} className="text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-orange-600">{review.rating}</span>
                  </div>
                </div>
                <p className="text-[15px] font-medium text-gray-700 leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100 dashed">
             <p className="text-gray-500 font-semibold mb-2">No reviews yet.</p>
             <button className="text-sm font-bold text-orange-500 hover:text-orange-600 underline underline-offset-4">Be the first to review</button>
          </div>
        )}
      </section>

    </main>
  );
}

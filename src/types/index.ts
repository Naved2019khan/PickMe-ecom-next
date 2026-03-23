/* ─── Product ──────────────────────────────────────────────────── */
export interface Product {
  id:        string;
  name:      string;
  image:     string;
  price:     number;
  mrp:       number;
  description:string;
  discount:  number; // percentage
  badge?:    string;
  rating?:   number;
  reviews?:  number;
  tag?:      string; // e.g. "New", "Trending"
  imageBg?:  string; // Dynamic card background
}

/* ─── Category ─────────────────────────────────────────────────── */
export interface Category {
  id:    string;
  label: string;
  icon:  string; // emoji or image URL
  href:  string;
}

/* ─── Brand ────────────────────────────────────────────────────── */
export interface Brand {
  id:      string;
  name:    string;
  logo:    string;
  offer:   string;
  bg:      string;  // tailwind bg class
  image:   string;
}

/* ─── Hero Slide ───────────────────────────────────────────────── */
export interface HeroSlide {
  id:       string;
  tagline:  string;
  title:    string;
  subtitle: string;
  cta:      string;
  ctaHref:  string;
  image:    string;
  bg:       string; // CSS gradient or colour
}

/* ─── Nav Category ─────────────────────────────────────────────── */
export interface NavCategory {
  label:    string;
  href:     string;
  children?: { label: string; href: string }[];
}

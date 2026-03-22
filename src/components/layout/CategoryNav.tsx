"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navCategories } from "@/lib/data";

export default function CategoryNav() {
  const [active, setActive] = useState("Groceries");

  return (
    <nav className="bg-white border-b border-[var(--color-border)]">
      <div className="container-main">
        <div className="scroll-row py-1 gap-0">
          {navCategories.map((cat) => {
            const isActive = active === cat.label;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                onClick={() => setActive(cat.label)}
                className={`category-chip ${isActive ? "active" : ""}`}
              >
                <span>{cat.label}</span>
                <ChevronDown
                  size={12}
                  className={`shrink-0 transition-transform ${isActive ? "rotate-180" : ""}`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

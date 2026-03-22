import Link from "next/link";
import { topCategories } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TopCategories() {
  return (
    <section className="container-main mt-6 bg-white rounded-2xl p-5 shadow-[var(--shadow-card)]">
      <SectionHeader
        title="Shop From"
        highlight="Top Categories"
        viewAllHref="/categories"
      />

      <div className="scroll-row pb-1">
        {topCategories.map((cat, i) => (
          <Link
            key={cat.id}
            href={cat.href}
            className={`flex flex-col items-center gap-2 group cursor-pointer shrink-0 w-20`}
          >
            {/* Circle icon */}
            <div
              className={`
                w-16 h-16 rounded-full flex items-center justify-center text-2xl
                border-2 transition-all duration-200
                ${i === 0
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface-muted)] group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary-light)]"
                }
              `}
            >
              {cat.icon}
            </div>
            <span
              className={`
                text-xs font-medium text-center leading-tight
                ${i === 0
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]"
                }
                transition-colors
              `}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

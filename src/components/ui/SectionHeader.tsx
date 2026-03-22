import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title:     string;
  highlight: string;
  viewAllHref?: string;
}

export default function SectionHeader({
  title,
  highlight,
  viewAllHref = "#",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="section-heading">
        <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
          {title}{" "}
          <span className="text-[var(--color-primary)]">{highlight}</span>
        </h2>
      </div>
      <Link
        href={viewAllHref}
        className="flex items-center gap-0.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors shrink-0"
      >
        View All <ChevronRight size={14} />
      </Link>
    </div>
  );
}

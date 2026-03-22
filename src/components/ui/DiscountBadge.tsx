interface DiscountBadgeProps {
  percent: number;
  className?: string;
}

export default function DiscountBadge({ percent, className = "" }: DiscountBadgeProps) {
  return (
    <span className={`badge-off ${className}`}>
      <span>{percent}%</span>
      <span>OFF</span>
    </span>
  );
}

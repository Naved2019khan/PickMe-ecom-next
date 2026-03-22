import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    Icon:  Truck,
    title: "Free Delivery",
    desc:  "On orders above ₹499",
    iconBg:     "bg-orange-50",
    iconBorder: "border-orange-200",
    iconColor:  "text-orange-500",
  },
  {
    Icon:  RotateCcw,
    title: "Easy Returns",
    desc:  "10-day hassle-free returns",
    iconBg:     "bg-indigo-50",
    iconBorder: "border-indigo-200",
    iconColor:  "text-indigo-500",
  },
  {
    Icon:  ShieldCheck,
    title: "Secure Payments",
    desc:  "100% secure transactions",
    iconBg:     "bg-emerald-50",
    iconBorder: "border-emerald-200",
    iconColor:  "text-emerald-500",
  },
  {
    Icon:  Headphones,
    title: "24/7 Support",
    desc:  "Dedicated customer support",
    iconBg:     "bg-amber-50",
    iconBorder: "border-amber-200",
    iconColor:  "text-amber-500",
  },
];

export default function TrustBanner() {
  return (
    <section className="container-main mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {features.map(({ Icon, title, desc, iconBg, iconBorder, iconColor }) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 transition-all hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Icon */}
            <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border ${iconBg} ${iconBorder}`}>
              <Icon size={19} className={iconColor} />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{title}</p>
              <p className="text-[11px] text-gray-400 truncate mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
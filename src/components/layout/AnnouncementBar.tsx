import { Truck, Tag } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#ec4899] text-white text-xs font-semibold text-center py-2 px-4 flex items-center justify-center gap-3 tracking-wide">
        <Truck size={13} className="shrink-0 animate-bounce" />
        <span>FREE delivery on orders above ₹499 · Use code </span>
        <span className="bg-white/20 border border-white/40 rounded px-1.5 py-0.5 font-mono tracking-widest text-[11px]">FREESHIP</span>
        <span>for extra ₹50 off!</span>
        <Tag size={13} className="shrink-0" />
      </div>
  );
}

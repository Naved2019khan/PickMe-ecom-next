import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, Zap } from "lucide-react";

const footerLinks = {
  "About MegaMart": ["About Us", "Careers", "Press", "Blog", "Investors"],
  "Customer Help":  ["FAQ", "Track Order", "Returns", "Shipping Policy", "Contact Us"],
  "Our Policies":   ["Privacy Policy", "Terms of Use", "Cookie Policy", "Sitemap"],
  "Sell With Us":   ["Become a Seller", "Advertise", "Partner Program", "Bulk Orders"],
};

const socials = [
  { Icon: Facebook,  href: "#" },
  { Icon: Twitter,   href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube,   href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">

      {/* ── Newsletter — orange gradient strip ── */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500">
        <div className="container-main py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-xl text-white tracking-tight">
              Get exclusive deals in your inbox
            </h3>
            <p className="text-sm text-white/80 mt-1">
              Subscribe and never miss a sale.
            </p>
          </div>
          <div className="flex w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-64 px-4 py-2.5 bg-white/15 border border-white/30 border-r-0 rounded-l-xl text-white placeholder:text-white/50 text-sm outline-none focus:bg-white/25 transition-colors"
            />
            <button className="px-5 py-2.5 bg-white hover:bg-orange-50 text-orange-500 font-bold text-sm rounded-r-xl transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Links grid ── */}
      <div className="container-main py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">
              {title}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-100">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-200">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900">
              Mega<span className="text-orange-500">Mart</span>
            </span>
            <span className="text-xs text-gray-400">
              © 2025 MegaMart. All rights reserved.
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:help@megamart.com"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Mail size={12} /> help@megamart.com
            </a>
            <a
              href="tel:1800000000"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Phone size={12} /> 1800-000-0000
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
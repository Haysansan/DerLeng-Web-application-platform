//C:\Users\DELL\Documents\Cadt\cadty3t2\New folder (2)\DerLeng-Web-application-platform\frontend\src\components\Footer.jsx
import { Link } from "react-router-dom";
import { Mail, Facebook, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#002B11] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        {/* ===== Grid Columns ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-8">

          {/* Brand / Description */}
          <div className="sm:col-span-2">
            <h2 className="text-lg font-semibold mb-4">
              Derleng: join us and build a world travel community
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Derleng is Cambodia’s go-to travel platform, bringing together
              locals to share their journeys and shine a light on our country’s
              wonders. Join Derleng today to explore, review, and inspire others.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">About Derleng</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white">Trust & Safety</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact us</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/review" className="hover:text-white">Write a review</Link></li>
              <li><Link to="/add-place" className="hover:text-white">Add a Place</Link></li>
              <li><Link to="/travelers-choice" className="hover:text-white">Traveler’s Choice</Link></li>
              <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/stories" className="hover:text-white">Travel Stories</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Do Business With Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/owners" className="hover:text-white">Owners</Link></li>
              <li><Link to="/business-advantage" className="hover:text-white">Business Advantage</Link></li>
              <li><Link to="/sponsored" className="hover:text-white">Sponsored Placements</Link></li>
              <li><Link to="/advertise" className="hover:text-white">Advertise with Us</Link></li>
            </ul>
          </div>
        </div>

        {/* ===== Divider ===== */}
        <div className="my-10 border-t border-white/20" />

        {/* ===== Bottom Section ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Left: Copyright */}
          <div className="text-sm text-gray-300 text-center sm:text-left">
            <span className="font-semibold text-white">DERLENG</span>
            <p className="mt-1">
              ™ {new Date().getFullYear()} Derleng. All rights reserved.
            </p>
          </div>

          {/* Center: Legal links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300">
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
            <Link to="/sitemap" className="hover:text-white">Site Map</Link>
            <Link to="/how-it-works" className="hover:text-white">How it works</Link>
          </div>

          {/* Right: Social icons */}
          <div className="flex justify-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               className="p-2 rounded-full hover:bg-white/10 transition">
              <Facebook className="w-6 h-6 text-white" />
            </a>
            <a href="mailto:someone@example.com"
               className="p-2 rounded-full hover:bg-white/10 transition">
              <Mail className="w-6 h-6 text-white" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
               className="p-2 rounded-full hover:bg-white/10 transition">
              <Music2 className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

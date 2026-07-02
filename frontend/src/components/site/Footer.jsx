import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="relative overflow-hidden bg-navy text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="font-mono-label text-[#38BDF8]">CleanDrive</div>
            <p className="mt-4 max-w-sm text-white/70">
              Premium doorstep car cleaning across Surat. Trained staff,
              scratch-safe process, delivered fresh every morning.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`social-${i}`}
                  aria-label="social"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-label text-white/50">Contact</div>
            <ul className="mt-4 space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-[#38BDF8]" />
                <span>Surat, Gujarat, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-[#38BDF8]" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-[#38BDF8]" />
                <span>info@cleandrive.in</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono-label text-white/50">Explore</div>
            <ul className="mt-4 space-y-3 text-white/80">
              <li><a href="#why" className="hover:text-white">Why CleanDrive</a></li>
              <li><a href="#process" className="hover:text-white">Our Process</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#enquiry" className="hover:text-white">Book Now</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 select-none overflow-hidden">
          <div className="font-heading text-[18vw] font-black leading-none tracking-tighter text-white/[0.06] sm:text-[14vw]">
            CLEANDRIVE
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} CleanDrive. All rights reserved.</div>
          <div>Made with care in Surat.</div>
        </div>
      </div>
    </footer>
  );
}

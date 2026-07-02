import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS } from "../../lib/business";

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
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg bg-white/10">
                <img
                  src="/cleandrive-logo-white.png"
                  alt="CleanDrive"
                  className="h-6 w-auto object-contain"
                />
              </span>
              <div>
                <div className="font-heading text-lg font-bold tracking-tight text-white">
                  CleanDrive
                </div>
                <div className="text-xs tracking-[0.25em] text-[#38BDF8]">
                  SHINE ON SCHEDULE
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-white/70">
              Premium doorstep car cleaning across Surat. Trained staff,
              scratch-safe process, delivered fresh every morning.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-instagram"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                <Instagram size={16} />
              </a>
              <a
                href={`https://wa.me/${BUSINESS.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-whatsapp"
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 .04 5.37.04 12c0 2.11.55 4.17 1.6 6L0 24l6.14-1.6a11.99 11.99 0 0 0 5.88 1.52h.01c6.62 0 11.99-5.37 11.99-12 0-3.2-1.25-6.21-3.5-8.44ZM12.03 21.4h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.64.95.97-3.55-.22-.36a9.36 9.36 0 0 1-1.44-5c0-5.18 4.22-9.4 9.4-9.4 2.51 0 4.87.98 6.64 2.75a9.34 9.34 0 0 1 2.75 6.66c0 5.18-4.22 9.4-9.32 9.46Zm5.15-7.06c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.68-1.57-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.55-.46-.47-.63-.48l-.54-.01c-.19 0-.49.07-.75.35s-.99.97-.99 2.36c0 1.39 1.02 2.74 1.16 2.93.14.19 2 3.06 4.85 4.29.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="font-mono-label text-white/50">Contact</div>
            <ul className="mt-4 space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-[#38BDF8]" />
                <span>{BUSINESS.city}, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-[#38BDF8]" />
                <a href={`tel:${BUSINESS.phoneRaw}`} data-testid="footer-phone" className="hover:text-white">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-[#38BDF8]" />
                <a href={`mailto:${BUSINESS.email}`} data-testid="footer-email" className="hover:text-white break-all">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono-label text-white/50">Explore</div>
            <ul className="mt-4 space-y-3 text-white/80">
              <li><a href="#why" className="hover:text-white">Why CleanDrive</a></li>
              <li><a href="#process" className="hover:text-white">Our Process</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white">Reviews</a></li>
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

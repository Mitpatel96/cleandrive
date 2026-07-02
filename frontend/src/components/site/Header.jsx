import { Button } from "../ui/button";
import { BUSINESS } from "../../lib/business";

export default function Header() {
  const nav = [
    { href: "#why", label: "Why Us" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#enquiry", label: "Enquiry" },
  ];
  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="#top"
          data-testid="brand-link"
          className="flex items-center gap-3"
          aria-label={BUSINESS.name}
        >
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-navy shadow-sm">
            <img
              src="/cleandrive-logo-white.png"
              alt="CleanDrive"
              className="h-6 w-auto object-contain"
            />
          </span>
          <span className="hidden font-heading text-lg font-extrabold tracking-tight text-navy sm:block">
            CleanDrive
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-${n.href.replace("#", "")}`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-navy"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a href="#enquiry">
          <Button
            data-testid="header-book-now-button"
            className="bg-brand text-white hover:bg-[#0052CC] rounded-full px-5"
          >
            Book Now
          </Button>
        </a>
      </div>
    </header>
  );
}

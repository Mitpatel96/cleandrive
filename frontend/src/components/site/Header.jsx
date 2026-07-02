import { Button } from "../ui/button";
import { Droplets } from "lucide-react";

export default function Header() {
  const nav = [
    { href: "#why", label: "Why Us" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#enquiry", label: "Enquiry" },
  ];
  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="#top"
          data-testid="brand-link"
          className="flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight text-navy"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white">
            <Droplets size={18} strokeWidth={2.5} />
          </span>
          CleanDrive
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

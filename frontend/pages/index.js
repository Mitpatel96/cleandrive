import { useState, useRef, useMemo } from "react";
import {
  Ship,
  Plane,
  Warehouse,
  Truck,
  PackageSearch,
  Boxes,
  Snowflake,
  ShieldCheck,
  Handshake,
  FileCheck2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Anchor,
  Globe2,
  Leaf,
  Coffee,
  Wheat,
  Apple,
  Milk,
  Fish,
  Utensils,
  Upload,
  CheckCircle2,
  MessageSquareText,
  ClipboardList,
  Clock,
  Users,
  Target,
  Building2,
  ChevronRight,
  Menu,
  X,
  Calculator,
  Info,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Reusable atoms                                                     */
/* ------------------------------------------------------------------ */
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full ${className}`}>
    <div className="max-w-[1240px] mx-auto px-6 md:px-10">{children}</div>
  </section>
);

const Eyebrow = ({ children, dark = false }) => (
  <div
    className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-semibold ${
      dark ? "text-white/70" : "text-brand"
    }`}
  >
    <span className={`h-[1px] w-8 ${dark ? "bg-white/50" : "bg-brand"}`} />
    {children}
  </div>
);

const PillBtn = ({ children, variant = "solid", onClick, type = "button", full = false, testid }) => {
  const base =
    "pill-btn inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] rounded-full";
  const styles = {
    solid: "bg-brand text-white hover:bg-brand-dark",
    outline: "border border-brand text-brand hover:bg-brand hover:text-white",
    ghost: "bg-[#f5f2ea] text-brand hover:bg-brand hover:text-white",
    white: "bg-white text-brand hover:bg-brand hover:text-white border border-white",
    dark: "bg-[#0f1a16] text-white hover:bg-brand",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={testid}
      className={`${base} ${styles[variant]} ${full ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Services", href: "#services" },
    { label: "Estimator", href: "#estimator" },
    { label: "Why Us", href: "#why" },
    { label: "Food & Beverage", href: "#food" },
    { label: "Get Quote", href: "#quote" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-[#e6e1d5]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3" data-testid="nav-brand">
          <span className="h-9 w-9 rounded-full bg-brand grid place-items-center">
            <Anchor className="h-4 w-4 text-white" strokeWidth={2.4} />
          </span>
          <div className="leading-tight">
            <div className="font-display text-[18px] font-semibold text-[#0f1a16]">Keshav Marketplace</div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-brand">Global Logistics</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-sweep text-[13px] font-medium text-[#0f1a16] hover:text-brand"
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="#quote">
            <PillBtn variant="solid" testid="nav-cta">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </PillBtn>
          </a>
        </div>
        <button
          className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-[#e6e1d5]"
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          aria-label="menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#e6e1d5] bg-white">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[15px] font-medium text-[#0f1a16]"
              >
                {l.label}
              </a>
            ))}
            <a href="#quote" onClick={() => setOpen(false)}>
              <PillBtn variant="solid" full>
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </PillBtn>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const Hero = () => (
  <Section id="top" className="relative pt-14 md:pt-20 pb-20 md:pb-24 overflow-hidden">
    {/* decorative dot grid */}
    <div
      aria-hidden
      className="absolute right-0 top-10 hidden lg:block w-[320px] h-[320px] opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(#225c4a 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    />

    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
      {/* Left column */}
      <div className="lg:col-span-7 fade-up">
        <Eyebrow>Freight · Warehousing · Sourcing</Eyebrow>
        <h1 className="font-display font-semibold text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.02] tracking-[-0.02em] text-[#0f1a16] mt-5">
          Global logistics,
          <br />
          made <span className="italic text-brand">refreshingly</span> simple.
        </h1>
        <p className="mt-6 text-[17px] leading-[1.7] text-[#3a463f] max-w-[600px]">
          We move goods between <b className="text-brand">China ↔ Australia</b> and{" "}
          <b className="text-brand">India ↔ Australia</b> — sea, air, road and warehouse — so you can
          focus on selling, not shipping. Zero jargon. Real people. One point of contact from pickup to delivery.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#quote">
            <PillBtn variant="solid" testid="hero-cta-quote">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </PillBtn>
          </a>
          <a href="#services">
            <PillBtn variant="outline" testid="hero-cta-services">
              Explore Services
            </PillBtn>
          </a>
          <a href="#estimator" className="hidden sm:inline-flex items-center gap-2 self-center text-[13px] font-semibold text-brand link-sweep px-2" data-testid="hero-estimator-link">
            <Calculator className="h-4 w-4" /> Try the landed-cost estimator
          </a>
        </div>

        {/* Trust row */}
        <div className="mt-10 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
              "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <div className="text-[13px] leading-tight">
            <div className="font-semibold text-[#0f1a16]">Trusted by 5,000+ businesses</div>
            <div className="text-[#7a857f]">Melbourne · Shanghai · Mumbai · Sydney</div>
          </div>
        </div>
      </div>

      {/* Right column - Hero visual */}
      <div className="lg:col-span-5 relative">
        <div className="relative aspect-[4/5] w-full rounded-[6px] overflow-hidden bg-[#0f1a16] fade-up">
          <img
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80"
            alt="Cargo containers at port"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a16] via-[#0f1a16]/20 to-transparent" />
          {/* stat card */}
          <div className="absolute left-5 bottom-5 right-5 bg-white rounded-[4px] p-4 flex items-center gap-4 shadow-2xl">
            <div className="h-11 w-11 rounded-full bg-brand grid place-items-center">
              <Ship className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#7a857f]">In transit right now</div>
              <div className="font-display text-[22px] font-semibold text-[#0f1a16] leading-none mt-1">
                412 shipments
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-brand" />
          </div>
        </div>

        {/* floating badge */}
        <div className="absolute -left-6 top-8 hidden md:flex items-center gap-2 bg-white border border-[#e6e1d5] rounded-full px-4 py-2 shadow-lg float-slow">
          <Sparkles className="h-4 w-4 text-brand" />
          <span className="text-[12px] font-semibold text-[#0f1a16]">Live tracking · door to door</span>
        </div>
      </div>
    </div>

    {/* Route marquee */}
    <div className="mt-16 border-y border-[#e6e1d5] overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-4">
        {Array.from({ length: 2 }).map((_, r) => (
          <div key={r} className="flex items-center gap-10 pr-10">
            {[
              "China → Australia",
              "India → Australia",
              "Australia → China",
              "Australia → India",
              "Sea Freight",
              "Air Freight",
              "3PL Warehousing",
              "Cold Storage",
              "Supplier Sourcing",
            ].map((t, i) => (
              <span key={i} className="flex items-center gap-3 font-display text-[26px] md:text-[34px] font-medium text-[#0f1a16]">
                {t}
                <span className="h-2 w-2 rounded-full bg-brand" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </Section>
);

/* ------------------------------------------------------------------ */
/*  Landed Cost Estimator                                              */
/* ------------------------------------------------------------------ */
const FREIGHT_RATES = {
  // AUD per kg, indicative
  "China-sea":   { rate: 0.55, label: "Sea · LCL", eta: "28–35 days" },
  "China-air":   { rate: 6.50, label: "Air Freight", eta: "4–7 days" },
  "India-sea":   { rate: 0.70, label: "Sea · LCL", eta: "24–30 days" },
  "India-air":   { rate: 5.80, label: "Air Freight", eta: "5–8 days" },
};

const money = (n) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

const LandedCostEstimator = () => {
  const [origin, setOrigin] = useState("China");
  const [mode, setMode] = useState("sea");
  const [value, setValue] = useState(5000);
  const [weight, setWeight] = useState(200);
  const [duty, setDuty] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const calc = useMemo(() => {
    const key = `${origin}-${mode}`;
    const meta = FREIGHT_RATES[key];
    const v = Number(value) || 0;
    const w = Number(weight) || 0;
    const d = Number(duty) || 0;
    const freight = Math.max(45, w * meta.rate); // min quote floor
    const dutyAmt = v * (d / 100);
    const gst = (v + freight + dutyAmt) * 0.10;
    const landed = v + freight + dutyAmt + gst;
    return { freight, dutyAmt, gst, landed, meta };
  }, [origin, mode, value, weight, duty]);

  return (
    <Section id="estimator" className="pb-14 md:pb-20">
      <div className="relative overflow-hidden bg-brand text-white rounded-[12px] p-6 md:p-10">
        {/* subtle pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Header column */}
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-semibold text-white/80">
              <Calculator className="h-4 w-4" /> Landed Cost Estimator
            </div>
            <h2 className="font-display font-semibold text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.02em] mt-4">
              What will it <span className="italic">really</span> cost me?
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-white/75 max-w-[360px]">
              Get an instant, all-in landed-cost estimate — freight, customs duty
              and Australian GST included. No sign-up, no email required.
            </p>
            <div className="mt-5 flex items-start gap-2 text-[12px] text-white/70 leading-[1.6]">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              Indicative only. Actual quotes may vary by HS-code, incoterm and cargo type.
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            {/* Origin */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
                Origin country
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["China", "India"].map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOrigin(o)}
                    data-testid={`est-origin-${o.toLowerCase()}`}
                    className={`py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-[0.14em] transition border ${
                      origin === o
                        ? "bg-white text-brand border-white"
                        : "bg-transparent text-white border-white/30 hover:border-white"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
                Shipping mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "sea", label: "Sea · LCL", icon: Ship },
                  { id: "air", label: "Air Freight", icon: Plane },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    data-testid={`est-mode-${m.id}`}
                    className={`inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-[0.14em] transition border ${
                      mode === m.id
                        ? "bg-white text-brand border-white"
                        : "bg-transparent text-white border-white/30 hover:border-white"
                    }`}
                  >
                    <m.icon className="h-4 w-4" /> {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Value */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
                Product value (AUD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-[14px]">$</span>
                <input
                  type="number"
                  value={value}
                  min={0}
                  onChange={(e) => setValue(e.target.value)}
                  data-testid="est-value"
                  className="w-full bg-white/10 border border-white/25 rounded-[4px] pl-8 pr-4 py-3 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition"
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
                Total weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                min={0}
                onChange={(e) => setWeight(e.target.value)}
                data-testid="est-weight"
                className="w-full bg-white/10 border border-white/25 rounded-[4px] px-4 py-3 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition"
              />
            </div>

            {/* Duty */}
            <div className="sm:col-span-2">
              <label className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
                <span>Customs duty rate</span>
                <span className="text-white">{duty}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={duty}
                onChange={(e) => setDuty(e.target.value)}
                data-testid="est-duty"
                className="w-full accent-white"
              />
              <div className="flex justify-between text-[10px] text-white/50 mt-1">
                <span>0% (most electronics)</span>
                <span>5% general</span>
                <span>20%+ (apparel)</span>
              </div>
            </div>
          </div>

          {/* Result column */}
          <div className="lg:col-span-3">
            <div className="bg-white text-[#0f1a16] rounded-[8px] p-5 md:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-brand font-semibold">
                Estimated landed cost
              </div>
              <div
                className="font-display font-semibold text-[38px] md:text-[44px] leading-none tracking-[-0.02em] mt-2"
                data-testid="est-total"
              >
                {money(calc.landed)}
              </div>
              <div className="text-[12px] text-[#7a857f] mt-1">
                {calc.meta.label} · ETA {calc.meta.eta}
              </div>

              <div className="mt-5 pt-5 border-t border-[#e6e1d5] space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#3a463f]">Product value</span>
                  <span className="font-medium">{money(Number(value) || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3a463f]">Freight</span>
                  <span className="font-medium">{money(calc.freight)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3a463f]">Customs duty ({duty}%)</span>
                  <span className="font-medium">{money(calc.dutyAmt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3a463f]">GST (10%)</span>
                  <span className="font-medium">{money(calc.gst)}</span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {submitted ? (
                  <div
                    className="bg-brand/10 border border-brand rounded-[4px] p-3 flex items-start gap-2"
                    data-testid="est-success"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <div className="text-[12px] leading-[1.5] text-[#0f1a16]">
                      <b className="text-brand">Thank you for submitting.</b>
                      <br />
                      Our team will contact you shortly.
                    </div>
                  </div>
                ) : (
                  <PillBtn
                    variant="solid"
                    full
                    testid="est-submit"
                    onClick={() => {
                      setSubmitted(true);
                      setTimeout(() => setSubmitted(false), 8000);
                    }}
                  >
                    Submit <ArrowRight className="h-4 w-4" />
                  </PillBtn>
                )}
                <a href="#quote" className="block">
                  <PillBtn variant="outline" full testid="est-cta">
                    Get exact quote <ArrowRight className="h-4 w-4" />
                  </PillBtn>
                </a>
              </div>            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
const Stats = () => {
  const items = [
    { icon: Users, value: "5,000+", label: "Business Clients" },
    { icon: Boxes, value: "100k+", label: "Shipments Handled" },
    { icon: Clock, value: "24/7", label: "Hour Support" },
    { icon: Target, value: "100%", label: "Customer Focus" },
  ];
  return (
    <Section className="py-14 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e6e1d5] border border-[#e6e1d5] rounded-[6px] overflow-hidden">
        {items.map((it, i) => (
          <div
            key={i}
            className="bg-white p-8 md:p-10 flex flex-col gap-4 group hover:bg-[#f5f2ea] transition"
            data-testid={`stat-${i}`}
          >
            <it.icon className="h-6 w-6 text-brand" strokeWidth={1.8} />
            <div className="font-display text-[42px] md:text-[54px] leading-none font-semibold text-[#0f1a16] tracking-[-0.02em]">
              {it.value}
            </div>
            <div className="text-[13px] uppercase tracking-[0.18em] text-[#3a463f] font-medium">{it.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Core Services                                                      */
/* ------------------------------------------------------------------ */
const ServicesGrid = () => {
  const services = [
    {
      icon: Boxes,
      title: "LCL",
      subtitle: "Less than Container Load",
      desc:
        "Have a smaller shipment? We share a container with other businesses so you only pay for the space you actually use. Perfect for testing new products or moving light loads.",
    },
    {
      icon: Ship,
      title: "FCL",
      subtitle: "Full Container Load",
      desc:
        "Book a full 20ft or 40ft container just for your goods. Faster, safer and more cost-efficient when you're moving bulk. We handle customs, port and delivery — end to end.",
    },
    {
      icon: Warehouse,
      title: "Storage Services",
      subtitle: "Cold & Normal Warehousing",
      desc:
        "Melbourne-based warehouses for frozen, chilled and ambient goods. Pick-and-pack, unit-level inventory and same-day dispatch keep your stock moving.",
    },
    {
      icon: Truck,
      title: "Logistics Services",
      subtitle: "Road, Rail & Last Mile",
      desc:
        "Domestic pallet freight, container transport and last-mile delivery across Australia. Forklift, tail-lift or hand-unload — you tell us, we arrange it.",
    },
  ];
  return (
    <Section id="services" className="py-16 md:py-24 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <Eyebrow>Core Services</Eyebrow>
          <h2 className="font-display font-semibold text-[38px] md:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#0f1a16] mt-4 max-w-[720px]">
            Four ways we move your world.
          </h2>
        </div>
        <p className="max-w-[380px] text-[15px] leading-[1.7] text-[#3a463f]">
          One team, one invoice, one point of contact. Choose the service that fits your cargo — we'll take care of the rest.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="sharp-card group relative bg-white border border-[#e6e1d5] p-7 md:p-9 rounded-[6px] flex flex-col"
            data-testid={`service-card-${s.title.toLowerCase()}`}
          >
            <div className="absolute top-7 right-7 text-[13px] font-mono text-[#b6ac96]">
              0{i + 1}
            </div>
            <div className="h-14 w-14 rounded-full bg-[#f5f2ea] group-hover:bg-brand grid place-items-center transition">
              <s.icon className="h-6 w-6 text-brand group-hover:text-white transition" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-[30px] md:text-[36px] font-semibold text-[#0f1a16] mt-6 leading-none tracking-[-0.01em]">
              {s.title}
            </h3>
            <div className="text-[13px] uppercase tracking-[0.2em] text-brand mt-2 font-semibold">
              {s.subtitle}
            </div>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#3a463f] flex-1">{s.desc}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="w-full sm:w-auto">
                <PillBtn variant="ghost" testid={`service-${s.title.toLowerCase()}-expert`}>
                  <MessageSquareText className="h-4 w-4" /> Talk with Expert
                </PillBtn>
              </a>
              <a href="#quote" className="w-full sm:w-auto">
                <PillBtn variant="solid" testid={`service-${s.title.toLowerCase()}-quote`}>
                  <FileCheck2 className="h-4 w-4" /> Get a Free Quote
                </PillBtn>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Why Choose Us                                                      */
/* ------------------------------------------------------------------ */
const WhyChoose = () => {
  const points = [
    {
      icon: Globe2,
      title: "Offices in all three countries",
      body:
        "Local teams in India, China and Australia. That means when there's a question at the factory in Guangzhou or a customs form in Melbourne, a real person on the ground handles it in your time zone.",
      cities: ["Melbourne", "Sydney", "Shanghai", "Guangzhou", "Mumbai", "Delhi"],
    },
    {
      icon: Handshake,
      title: "Hand-to-hand service",
      body:
        "From the moment your supplier hands us the box to the moment we place it in your warehouse — the same team looks after it. No mystery hand-offs, no 'not our problem' emails.",
      cities: [],
    },
    {
      icon: FileCheck2,
      title: "Zero-hassle paperwork",
      body:
        "Bills of lading, customs declarations, GST invoices, quarantine forms — we fill them, we file them, we chase them. You just approve and go.",
      cities: [],
    },
  ];

  return (
    <Section id="why" className="py-16 md:py-24 relative">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2 className="font-display font-semibold text-[38px] md:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#0f1a16] mt-4">
            New to shipping?
            <br />
            <span className="italic text-brand">You'll feel at home.</span>
          </h2>
          <p className="mt-6 text-[16px] leading-[1.75] text-[#3a463f] max-w-[440px]">
            Most of our first-time clients have never imported or exported anything before. We wrote this
            section for them — no acronyms, no jargon, just plain English.
          </p>
          <div className="mt-8 p-6 bg-[#f5f2ea] rounded-[6px] border border-[#e6e1d5]">
            <div className="flex items-center gap-2 text-brand font-semibold text-[13px] uppercase tracking-[0.2em]">
              <Leaf className="h-4 w-4" /> Beginner-friendly promise
            </div>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#3a463f]">
              A dedicated coordinator will explain each step of your first shipment in a 20-minute call.
              No obligation, no charge — even if you never ship with us.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          {points.map((p, i) => (
            <div
              key={i}
              className="group bg-white border border-[#e6e1d5] rounded-[6px] p-7 md:p-9 hover:border-brand transition"
              data-testid={`why-item-${i}`}
            >
              <div className="flex items-start gap-5">
                <div className="h-12 w-12 rounded-full bg-brand grid place-items-center shrink-0">
                  <p.icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[26px] md:text-[30px] font-semibold text-[#0f1a16] leading-tight tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-[#3a463f]">{p.body}</p>
                  {p.cities.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.cities.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 bg-[#f5f2ea] text-brand rounded-full"
                        >
                          <MapPin className="h-3 w-3" /> {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Food & Beverage expert content                                     */
/* ------------------------------------------------------------------ */
const FoodBev = () => {
  const items = [
    {
      icon: Coffee,
      title: "Packaged tea, coffee & spices",
      body:
        "Commercially packaged, shelf-stable and labelled with country of origin. Bio-security clearance in Australia is quick for these — most consignments release in 2-3 business days.",
    },
    {
      icon: Wheat,
      title: "Rice, pulses & dry grains",
      body:
        "Allowed when supplied by an approved mill with a valid phytosanitary certificate. India → Australia and China → Australia flows are established; documentation is the key.",
    },
    {
      icon: Apple,
      title: "Dried & processed fruit",
      body:
        "Dried mangoes, apricots, dates — permitted in sealed retail packaging. Fresh fruit is heavily restricted; ask us before quoting.",
    },
    {
      icon: Milk,
      title: "Dairy (UHT, cheese, ghee)",
      body:
        "Long-life dairy is generally permitted with source-country vet certificates. Ghee to Australia is a popular India lane — we've cleared thousands of pallets.",
    },
    {
      icon: Fish,
      title: "Frozen seafood",
      body:
        "Species-restricted. Approved facility, cold-chain, and DAFF paperwork are non-negotiable. Our cold warehouse in Melbourne is bio-security approved.",
    },
    {
      icon: Utensils,
      title: "Sauces, condiments, snacks",
      body:
        "Bottled sauces, biscuits, confectionary — largely straightforward. Anything containing meat, egg or fresh dairy needs pre-approval.",
    },
  ];
  return (
    <Section id="food" className="py-16 md:py-24 relative bg-[#f5f2ea] rounded-t-[36px]">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
        <div className="lg:col-span-8">
          <Eyebrow>Expert Insight</Eyebrow>
          <h2 className="font-display font-semibold text-[38px] md:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#0f1a16] mt-4">
            Permitted food &amp; beverage items,
            <br />
            <span className="italic text-brand">explained.</span>
          </h2>
        </div>
        <p className="lg:col-span-4 text-[15px] leading-[1.75] text-[#3a463f]">
          Australia has one of the strictest biosecurity regimes in the world — but many everyday food and
          beverage products <b>are</b> permitted when the paperwork is done right. Here are the most
          common categories our clients move between China, India and Australia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((f, i) => (
          <div
            key={i}
            className="bg-white border border-[#e6e1d5] rounded-[6px] p-6 md:p-7 hover:border-brand transition"
            data-testid={`food-item-${i}`}
          >
            <f.icon className="h-6 w-6 text-brand" strokeWidth={1.8} />
            <h3 className="font-display text-[22px] font-semibold text-[#0f1a16] mt-4 leading-tight">
              {f.title}
            </h3>
            <p className="text-[14px] leading-[1.7] text-[#3a463f] mt-3">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#0f1a16] text-white rounded-[6px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 text-brand shrink-0 mt-1" />
          <p className="text-[15px] leading-[1.7] max-w-[640px]">
            <b>Not sure if your product qualifies?</b> Send us a photo of the label and ingredient list —
            our compliance team will confirm import-eligibility in one working day, free of charge.
          </p>
        </div>
        <a href="#contact" className="shrink-0">
          <PillBtn variant="white" testid="food-check-cta">
            Check My Product <ArrowRight className="h-4 w-4" />
          </PillBtn>
        </a>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Quote form (dynamic tabs)                                          */
/* ------------------------------------------------------------------ */
const services = [
  { id: "fcl", label: "FCL", icon: Ship },
  { id: "lcl", label: "LCL", icon: Boxes },
  { id: "air", label: "Air Freight", icon: Plane },
  { id: "3pl", label: "3PL", icon: Warehouse },
  { id: "sourcing", label: "Supplier Sourcing", icon: PackageSearch },
  { id: "transport", label: "Transport", icon: Truck },
];

const Field = ({ label, name, type = "text", placeholder, as, options, required, span = 1, testid }) => {
  const cls =
    "w-full bg-white border border-[#e6e1d5] rounded-[4px] px-4 py-3 text-[14px] text-[#0f1a16] placeholder:text-[#b6ac96] focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition";
  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <label className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3a463f] mb-2">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {as === "select" ? (
        <select name={name} className={cls} required={required} defaultValue="" data-testid={testid}>
          <option value="" disabled>Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea name={name} rows={3} placeholder={placeholder} className={cls} required={required} data-testid={testid} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={cls} required={required} data-testid={testid} />
      )}
    </div>
  );
};

const YesNo = ["Yes", "No"];

const QuoteForm = () => {
  const [tab, setTab] = useState("fcl");
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const fs = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...fs]);
  };

  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    e.target.reset();
    setFiles([]);
  };

  const renderFields = () => {
    switch (tab) {
      case "fcl":
        return (
          <>
            <Field label="Product" name="product" placeholder="e.g. Ceramic tiles" required span={2} testid="fcl-product" />
            <Field label="Value of goods (for import GST)" name="value" placeholder="AUD" required testid="fcl-value" />
            <Field label="Product already purchased & paid for" name="paid" as="select" options={YesNo} required testid="fcl-paid" />
            <Field label="Product ready for ship date" name="date" type="date" required testid="fcl-date" span={2} />
          </>
        );
      case "lcl":
        return (
          <>
            <Field label="Product" name="product" placeholder="e.g. Homewares" required testid="lcl-product" />
            <Field label="Dimensions (L × W × H, cm)" name="dims" placeholder="120 × 80 × 90" required testid="lcl-dims" />
            <Field label="Number of boxes" name="boxes" type="number" placeholder="e.g. 12" required testid="lcl-boxes" />
            <Field label="Weight (kg)" name="weight" placeholder="Total kg" required testid="lcl-weight" />
            <Field label="Value of goods (for import GST)" name="value" placeholder="AUD" required testid="lcl-value" />
            <Field label="Product already purchased & paid for" name="paid" as="select" options={YesNo} required testid="lcl-paid" />
            <Field label="Product ready for ship date" name="date" type="date" required span={2} testid="lcl-date" />
          </>
        );
      case "air":
        return (
          <>
            <Field label="Product" name="product" placeholder="e.g. Fashion samples" required testid="air-product" />
            <Field label="Dimensions (L × W × H, cm)" name="dims" placeholder="60 × 40 × 40" required testid="air-dims" />
            <Field label="Number of boxes" name="boxes" type="number" placeholder="e.g. 3" required testid="air-boxes" />
            <Field label="Weight (kg)" name="weight" placeholder="Total kg" required testid="air-weight" />
            <Field label="Value of goods (for import GST)" name="value" placeholder="AUD" required testid="air-value" />
            <Field label="Product already purchased & paid for" name="paid" as="select" options={YesNo} required testid="air-paid" />
            <Field label="Product ready for ship date" name="date" type="date" required span={2} testid="air-date" />
          </>
        );
      case "3pl":
        return (
          <>
            <Field label="Product description" name="product" placeholder="Brief description" required span={2} testid="pl-product" />
            <Field label="No. of pallets (estimated)" name="pallets" type="number" placeholder="e.g. 20" required testid="pl-pallets" />
            <Field label="Weight per pallet (kg)" name="wpp" placeholder="e.g. 450" required testid="pl-wpp" />
            <Field label="Ready to move to warehouse?" name="ready" as="select" options={YesNo} required testid="pl-ready" />
            <Field label="Falls under Dangerous Goods?" name="dg" as="select" options={YesNo} required testid="pl-dg" />
            <Field label="Frozen / Chilled — required temperature (°C)" name="temp" placeholder="e.g. -18 or 2 to 8" testid="pl-temp" />
            <Field label="Container unpacking required?" name="unpack" as="select" options={YesNo} required testid="pl-unpack" />
          </>
        );
      case "sourcing":
        return (
          <>
            <Field label="Product" name="product" placeholder="What are you looking to source?" required span={2} testid="src-product" />
            <Field label="Quantity" name="qty" placeholder="e.g. 5,000 units" required testid="src-qty" />
            <Field
              label="Target price in AUD (till our Melbourne warehouse)"
              name="target"
              placeholder="AUD landed cost"
              required
              testid="src-target"
            />
          </>
        );
      case "transport":
        return (
          <>
            <Field label="No. of pallets" name="pallets" type="number" placeholder="e.g. 6" required testid="tr-pallets" />
            <Field label="Dimensions (L × W × H, cm)" name="dims" placeholder="120 × 100 × 150" required testid="tr-dims" />
            <Field label="Weight (kg)" name="weight" placeholder="Total kg" required testid="tr-weight" />
            <Field label="Pickup location" name="pickup" placeholder="Suburb, State" required testid="tr-pickup" />
            <Field label="Delivery location" name="delivery" placeholder="Suburb, State" required testid="tr-delivery" />
            <Field label="Preferred date & time" name="datetime" type="datetime-local" required testid="tr-datetime" />
            <Field label="Forklift at pickup?" name="fl-pickup" as="select" options={YesNo} required testid="tr-fl-pickup" />
            <Field label="Forklift at drop-off?" name="fl-drop" as="select" options={YesNo} required testid="tr-fl-drop" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Section id="quote" className="py-20 md:py-28 relative">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left copy */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <Eyebrow>Free Quote</Eyebrow>
          <h2 className="font-display font-semibold text-[38px] md:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#0f1a16] mt-4">
            Tell us about your shipment.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.75] text-[#3a463f]">
            Pick the service you need, fill in a few details, and one of our coordinators will send you a
            transparent, all-inclusive quote within <b className="text-brand">4 working hours</b>.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "No hidden fees, ever",
              "Bilingual coordinators (EN / 中文 / हिंदी)",
              "Cancel anytime before pickup",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[14px] text-[#3a463f]">
                <CheckCircle2 className="h-4 w-4 text-brand" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right form */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#e6e1d5] rounded-[8px] p-6 md:p-10">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#e6e1d5] pb-5 mb-8">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setTab(s.id)}
                  data-testid={`tab-${s.id}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.14em] transition ${
                    tab === s.id ? "tab-active" : "tab-inactive"
                  }`}
                >
                  <s.icon className="h-4 w-4" /> {s.label}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
              {/* Contact fields */}
              <Field label="Full name" name="name" placeholder="Your name" required testid="q-name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" required testid="q-email" />

              {renderFields()}

              {/* Upload */}
              <div className="md:col-span-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3a463f] mb-2">
                  Upload photos / documents <span className="text-[#b6ac96] normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-[#e6e1d5] hover:border-brand bg-[#faf8f2] rounded-[6px] px-6 py-8 text-center transition"
                  data-testid="upload-zone"
                >
                  <div className="h-11 w-11 mx-auto rounded-full bg-brand/10 grid place-items-center">
                    <Upload className="h-5 w-5 text-brand" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold text-[#0f1a16]">
                    Click to upload or drag files here
                  </div>
                  <div className="text-[12px] text-[#7a857f] mt-1">
                    Invoices, photos, packing lists, HS-codes · PDF / JPG / PNG · max 20 MB each
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    data-testid="upload-input"
                  />
                </div>
                {files.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {files.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between bg-[#f5f2ea] rounded-[4px] px-4 py-2 text-[13px]"
                      >
                        <span className="truncate flex items-center gap-2">
                          <ClipboardList className="h-4 w-4 text-brand" /> {f.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-brand hover:text-brand-dark"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Field
                label="Anything else we should know?"
                name="notes"
                as="textarea"
                placeholder="Special handling, timelines, questions…"
                span={2}
                testid="q-notes"
              />

              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3">
                <p className="text-[12px] text-[#7a857f] max-w-[420px] leading-[1.6]">
                  By submitting you agree to be contacted by Keshav Marketplace. We never share your details with third parties.
                </p>
                <PillBtn variant="solid" type="submit" testid="quote-submit">
                  Send my quote request <ArrowRight className="h-4 w-4" />
                </PillBtn>
              </div>

              {submitted && (
                <div
                  className="md:col-span-2 bg-brand/10 border border-brand rounded-[6px] p-5 flex items-start gap-3"
                  data-testid="quote-success"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-brand">Quote request received.</div>
                    <div className="text-[14px] text-[#3a463f] mt-1">
                      Thanks! A coordinator will email you at the address provided within 4 working hours.
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Import Consultation Banner                                         */
/* ------------------------------------------------------------------ */
const ConsultBanner = () => (
  <Section className="pb-20 md:pb-28">
    <div id="contact" className="relative overflow-hidden bg-[#0f1a16] text-white rounded-[10px] p-10 md:p-16">
      {/* decorative gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,92,74,0.55), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,92,74,0.4), transparent 70%)" }}
      />

      <div className="relative grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <Eyebrow dark>Import Consultation</Eyebrow>
          <h2 className="font-display font-semibold text-[38px] md:text-[54px] leading-[1.04] tracking-[-0.02em] mt-4">
            Thinking about importing?
            <br />
            <span className="italic text-brand-light">Let's start with a chat.</span>
          </h2>
          <p className="mt-6 text-[16px] leading-[1.75] text-white/75 max-w-[680px]">
            Our import consultation is a free, 30-minute session where we sit down with you and map out
            the whole journey — supplier vetting, HS-code classification, landed-cost calculation, GST
            treatment, Australian bio-security requirements and warehouse strategy. Whether you're moving
            your first pallet or your five-thousandth, you'll walk away with a clear, written plan.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-[640px]">
            {[
              { icon: Building2, t: "Supplier vetting" },
              { icon: ShieldCheck, t: "Compliance check" },
              { icon: Snowflake, t: "Cold-chain planning" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[4px] px-4 py-3">
                <b.icon className="h-5 w-5 text-brand-light shrink-0" />
                <span className="text-[13px] font-medium">{b.t}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="mailto:admin@keshavmarketplace.com.au">
              <PillBtn variant="white" testid="consult-contact">
                Contact Us <ArrowRight className="h-4 w-4" />
              </PillBtn>
            </a>
            <a href="mailto:admin@keshavmarketplace.com.au" className="inline-flex items-center gap-2 text-[14px] text-white/80 hover:text-white link-sweep">
              <Mail className="h-4 w-4" /> admin@keshavmarketplace.com.au
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 relative">
          <div className="relative aspect-[4/5] w-full rounded-[6px] overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
              alt="Consultant"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a16] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-[11px] uppercase tracking-[0.24em] text-brand-light">Your point of contact</div>
              <div className="font-display text-[24px] font-semibold mt-1">The Keshav Team</div>
              <div className="text-[13px] text-white/70">Reply within 4 working hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
const Footer = () => (
  <footer className="border-t border-[#e6e1d5] bg-[#f5f2ea]">
    <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-14">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-brand grid place-items-center">
              <Anchor className="h-4 w-4 text-white" strokeWidth={2.4} />
            </span>
            <div className="leading-tight">
              <div className="font-display text-[18px] font-semibold text-[#0f1a16]">Keshav Marketplace</div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-brand">Global Logistics</div>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-[1.7] text-[#3a463f] max-w-[380px]">
            Freight forwarding, warehousing and supplier sourcing between China, India and Australia — with
            offices, warehouses and real people in all three.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-[12px] uppercase tracking-[0.2em] text-brand font-semibold">Navigate</div>
          <ul className="mt-4 space-y-2 text-[14px] text-[#3a463f]">
            {["Services", "Why Us", "Food & Beverage", "Get Quote", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s|&/g, "").replace("services", "services")}`} className="hover:text-brand link-sweep">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-[12px] uppercase tracking-[0.2em] text-brand font-semibold">Get in touch</div>
          <ul className="mt-4 space-y-3 text-[14px] text-[#3a463f]">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-brand" />
              <a href="mailto:admin@keshavmarketplace.com.au" className="hover:text-brand">
                admin@keshavmarketplace.com.au
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-brand" /> Melbourne · Shanghai · Mumbai
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-brand" /> 24 / 7 support desk
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-[#e6e1d5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-[#7a857f]">
        <div>© {new Date().getFullYear()} Keshav Marketplace Pty Ltd. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-brand link-sweep">Privacy</a>
          <a href="#" className="hover:text-brand link-sweep">Terms</a>
          <a href="#" className="hover:text-brand link-sweep">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <main className="bg-white">
      <Nav />
      <Hero />
      <LandedCostEstimator />
      <Stats />
      <ServicesGrid />
      <WhyChoose />
      <FoodBev />
      <QuoteForm />
      <ConsultBanner />
      <Footer />
    </main>
  );
}

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Users, Droplets, Sunrise, Leaf } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Trained Staff",
    body: "Uniformed, background-verified professionals who treat every car with care.",
    span: "lg:col-span-5 lg:row-span-2",
    accent: true,
  },
  {
    icon: Droplets,
    title: "Premium Cleaning Liquid",
    body: "PH-neutral shampoo that lifts dirt without stripping wax or paint.",
    span: "lg:col-span-4",
  },
  {
    icon: ShieldCheck,
    title: "Scratch Protection",
    body: "Super-smooth nano polish cloth prevents swirls & micro-scratches.",
    span: "lg:col-span-3",
  },
  {
    icon: Sunrise,
    title: "Daily Morning Service",
    body: "Ready before 9 AM at your doorstep. Wake up to a fresh car.",
    span: "lg:col-span-4",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    body: "Water-efficient wash — uses up to 90% less water than a jet-wash.",
    span: "lg:col-span-3",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      data-testid="why-section"
      className="bg-cloud py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono-label text-brand">Why CleanDrive</div>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Not just a car wash. A daily ritual for your ride.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Every detail — from the cloth to the timing — is engineered so you
            drive off in a car that looks showroom-fresh.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                data-testid={`why-card-${idx}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  it.accent
                    ? "bg-navy text-white lg:p-8"
                    : "bg-white text-navy"
                } ${it.span || "lg:col-span-4"}`}
              >
                <div
                  className={`inline-grid h-10 w-10 place-items-center rounded-lg ${
                    it.accent ? "bg-white/10 text-white" : "bg-brand/10 text-brand"
                  }`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3
                  className={`mt-5 font-heading text-lg font-bold tracking-tight sm:text-xl ${
                    it.accent ? "text-white" : "text-navy"
                  }`}
                >
                  {it.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    it.accent ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  {it.body}
                </p>
                {it.accent && (
                  <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand opacity-25 blur-3xl" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

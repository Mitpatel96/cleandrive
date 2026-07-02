import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Rakesh P.",
    initials: "RP",
    area: "Vesu, Surat",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=240&h=240&fit=crop&crop=faces",
    text: "Genuinely the smoothest car-care experience I've had in Surat. My i20 looks brand new every morning and I never have to think about it.",
  },
  {
    name: "Meera S.",
    initials: "MS",
    area: "Adajan",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=240&h=240&fit=crop&crop=faces",
    text: "The team is punctual, polite and super careful with the paint. Nano cloth actually makes a visible difference — zero swirl marks.",
  },
  {
    name: "Harsh D.",
    initials: "HD",
    area: "Piplod",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=240&h=240&fit=crop&crop=faces",
    text: "Switched from the neighbourhood cleaner and the difference is night and day. Worth every rupee for the alternate-days plan.",
  },
  {
    name: "Nikita J.",
    initials: "NJ",
    area: "Athwa Lines",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=240&h=240&fit=crop&crop=faces",
    text: "Loved that they use very little water. Feels premium and eco-conscious at the same time. Highly recommended.",
  },
];

const fallback = (initials) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=0066FF&color=ffffff&size=240&bold=true&format=png`;

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono-label text-brand">Reviews</div>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Loved by car owners across Surat.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              A few words from customers who let us handle their morning
              routine — so they don&apos;t have to.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-cloud px-5 py-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-sm font-semibold text-navy">
              4.9<span className="text-slate-400"> / 5</span>
            </div>
            <div className="text-xs text-slate-500">200+ happy cars</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              data-testid={`testimonial-card-${i}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote size={24} className="text-brand/30" />
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {r.text}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={r.photo}
                    alt={r.name}
                    loading="lazy"
                    data-testid={`testimonial-avatar-${i}`}
                    onError={(e) => {
                      e.currentTarget.src = fallback(r.initials);
                    }}
                    className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="font-heading font-bold text-navy">
                      {r.name}
                    </div>
                    <div className="text-xs text-slate-500">{r.area}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Photos are illustrative — swap with your real customer photos anytime from
          <code className="mx-1 rounded bg-cloud px-1.5 py-0.5 text-slate-500">
            Testimonials.jsx
          </code>
        </p>
      </div>
    </section>
  );
}

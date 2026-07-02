import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Remove Dust & Loose Dirt",
    body: "Gentle dust removal with soft brushes so paint stays scratch-free — the perfect prep before any water touches your car.",
    img: "https://images.pexels.com/photos/6872582/pexels-photo-6872582.jpeg",
    alt: "Removing dust and dirt from car",
  },
  {
    n: "02",
    title: "Spray & Clean",
    body: "Eco-friendly PH-neutral shampoo lifts stains and mud while using minimal water — smart, efficient, effective.",
    img: "https://images.pexels.com/photos/6872151/pexels-photo-6872151.jpeg",
    alt: "Spraying and cleaning the car",
  },
  {
    n: "03",
    title: "Wipe with Microfibre",
    body: "Nano polish microfibre cloth absorbs moisture completely, prevents swirl marks and leaves a glossy showroom shine.",
    img: "https://images.unsplash.com/photo-1732357624591-f2137085659b",
    alt: "Wiping car with a yellow microfibre cloth",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono-label text-brand">How We Clean</div>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              A three-step, scratch-free ritual.
            </h2>
          </div>
          <p className="max-w-md text-base text-slate-600">
            Same process, every day, every car — because consistency is the
            real secret behind a great finish.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              data-testid={`process-step-${i + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src={s.img}
                  alt={s.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono-label text-navy backdrop-blur">
                  STEP {s.n}
                </div>
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl">
                {s.title}
              </h3>
              <p className="mt-2 text-base text-slate-600">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

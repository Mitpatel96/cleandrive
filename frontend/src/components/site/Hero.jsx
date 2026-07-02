import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative overflow-hidden bg-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-20 pt-14 lg:grid-cols-12 lg:gap-12 lg:pb-32 lg:pt-24">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-brand"
          >
            <span className="font-mono-label text-brand">
              Doorstep Car Wash · Surat
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.02] tracking-tighter text-navy sm:text-5xl lg:text-6xl"
          >
            A spotless car,
            <br />
            <span className="text-brand">every single morning.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            CleanDrive brings premium doorstep car cleaning to your address in
            Surat. Trained staff, premium liquids and nano polish cloth — done
            before you step out for the day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#enquiry">
              <Button
                data-testid="hero-book-now-button"
                size="lg"
                className="group h-12 rounded-full bg-brand px-6 text-base font-semibold text-white hover:bg-[#0052CC]"
              >
                Book Now
                <ArrowRight
                  className="ml-1 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </Button>
            </a>
            <a href="#pricing">
              <Button
                data-testid="hero-view-pricing-button"
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-slate-300 px-6 text-base text-navy hover:bg-slate-50"
              >
                View Pricing
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-brand" /> Serving all of Surat
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles size={14} className="text-brand" /> Scratch-free nano cloth
            </span>
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <img
              data-testid="hero-image"
              src="https://images.pexels.com/photos/6873074/pexels-photo-6873074.jpeg"
              alt="Premium doorstep car wash by CleanDrive"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/85 p-4 backdrop-blur">
              <div className="font-mono-label text-brand">Live in Surat</div>
              <div className="mt-1 font-heading text-lg font-bold text-navy">
                Cleaned before 9 AM. Guaranteed.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

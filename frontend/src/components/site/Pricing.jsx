import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Check, Star } from "lucide-react";
import { PLANS } from "../../lib/plans";

function PlanCard({ plan, seater, onChoose, index }) {
  const price = plan.prices[seater];
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-testid={`pricing-card-${plan.id}-${seater.replace(" ", "-").toLowerCase()}`}
      className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
        plan.highlight
          ? "border-brand bg-navy text-white"
          : "border-slate-200 bg-white text-navy"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
          <Star size={12} strokeWidth={2.5} /> Most Popular
        </div>
      )}
      <div
        className={`font-mono-label ${plan.highlight ? "text-[#38BDF8]" : "text-brand"}`}
      >
        {plan.subtitle}
      </div>
      <h3
        className={`mt-3 font-heading text-xl font-bold tracking-tight sm:text-2xl ${
          plan.highlight ? "text-white" : "text-navy"
        }`}
      >
        {plan.category}
      </h3>
      <p
        className={`mt-1 text-sm ${
          plan.highlight ? "text-white/70" : "text-slate-500"
        }`}
      >
        {plan.tagline}
      </p>

      <div className="mt-5 flex items-end gap-1">
        <span
          className={`font-heading text-4xl font-extrabold tracking-tight sm:text-5xl ${
            plan.highlight ? "text-white" : "text-navy"
          }`}
        >
          ₹{price.toLocaleString("en-IN")}
        </span>
        <span
          className={`mb-1 text-sm ${
            plan.highlight ? "text-white/60" : "text-slate-500"
          }`}
        >
          {plan.period}
        </span>
      </div>

      <ul
        className={`mt-6 space-y-2 text-sm ${
          plan.highlight ? "text-white/85" : "text-slate-600"
        }`}
      >
        <li className="flex items-start gap-2">
          <Check
            size={16}
            className={plan.highlight ? "text-[#38BDF8]" : "text-brand"}
          />
          {plan.frequency} morning service
        </li>
        <li className="flex items-start gap-2">
          <Check
            size={16}
            className={plan.highlight ? "text-[#38BDF8]" : "text-brand"}
          />
          Nano polish microfibre cloth
        </li>
        <li className="flex items-start gap-2">
          <Check
            size={16}
            className={plan.highlight ? "text-[#38BDF8]" : "text-brand"}
          />
          Trained, uniformed staff
        </li>
        <li className="flex items-start gap-2">
          <Check
            size={16}
            className={plan.highlight ? "text-[#38BDF8]" : "text-brand"}
          />
          Eco-friendly cleaning
        </li>
      </ul>

      <Button
        onClick={() => onChoose(`${plan.category} - ${seater}`)}
        data-testid={`choose-plan-${plan.id}-${seater.replace(" ", "-").toLowerCase()}`}
        className={`mt-7 h-11 w-full rounded-full font-semibold ${
          plan.highlight
            ? "bg-white text-navy hover:bg-slate-100"
            : "bg-brand text-white hover:bg-[#0052CC]"
        }`}
      >
        Choose Plan
      </Button>
    </motion.div>
  );
}

export default function Pricing() {
  const [seater, setSeater] = useState("5 Seater");

  const scrollToEnquiry = (planLabel) => {
    // set plan in URL hash so form can pick up
    window.dispatchEvent(
      new CustomEvent("cleandrive:choose-plan", { detail: planLabel })
    );
    const el = document.getElementById("enquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="bg-cloud py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono-label text-brand">Pricing</div>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Simple plans. Zero surprises.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Pick your car size, choose a plan, and we handle the rest. Cancel
              or switch anytime.
            </p>
          </div>

          <Tabs value={seater} onValueChange={setSeater} className="w-fit">
            <TabsList
              data-testid="seater-tabs"
              className="h-11 rounded-full border border-slate-200 bg-white p-1"
            >
              <TabsTrigger
                data-testid="tab-5-seater"
                value="5 Seater"
                className="h-9 rounded-full px-5 text-sm font-semibold data-[state=active]:bg-navy data-[state=active]:text-white"
              >
                5 Seater
              </TabsTrigger>
              <TabsTrigger
                data-testid="tab-7-seater"
                value="7 Seater"
                className="h-9 rounded-full px-5 text-sm font-semibold data-[state=active]:bg-navy data-[state=active]:text-white"
              >
                7 Seater
              </TabsTrigger>
            </TabsList>
            <TabsContent value="5 Seater" />
            <TabsContent value="7 Seater" />
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <PlanCard
              key={p.id}
              plan={p}
              seater={seater}
              index={i}
              onChoose={scrollToEnquiry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

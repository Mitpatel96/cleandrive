import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Phone, MapPin } from "lucide-react";
import { PLAN_OPTIONS, TIME_SLOTS } from "../../lib/plans";
import { BUSINESS } from "../../lib/business";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const empty = {
  full_name: "",
  phone: "",
  email: "",
  address: "",
  car_type: "",
  preferred_plan: "",
  preferred_time_slot: "",
  message: "",
};

export default function EnquiryForm() {
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const value = e.detail;
      const inferredCar = value?.includes("7 Seater") ? "7 Seater" : "5 Seater";
      setForm((f) => ({ ...f, preferred_plan: value, car_type: inferredCar }));
    };
    window.addEventListener("cleandrive:choose-plan", handler);
    return () => window.removeEventListener("cleandrive:choose-plan", handler);
  }, []);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.phone || !form.address || !form.car_type || !form.preferred_plan || !form.preferred_time_slot) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form, email: form.email || null, message: form.message || null };
      await axios.post(`${API}/enquiries`, payload);
      setDone(true);
      setForm(empty);
      toast.success("Enquiry sent! We'll call you shortly.");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.detail || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry"
      data-testid="enquiry-section"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <div className="font-mono-label text-brand">Enquire</div>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Ready for a spotless morning?
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Share your details and preferred plan. Our team will call you back
              within a few hours to confirm your first wash — usually the very
              next morning.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-cloud p-6">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="font-mono-label text-slate-500">Call / WhatsApp</div>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    data-testid="enquiry-phone"
                    className="mt-1 block font-heading font-bold text-navy hover:text-brand"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-mono-label text-slate-500">Service Area</div>
                  <div className="mt-1 font-heading font-bold text-navy">
                    All of Surat, Gujarat
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            data-testid="enquiry-form"
            className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {done ? (
              <div
                data-testid="enquiry-success"
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-bold text-navy">
                  Enquiry received!
                </h3>
                <p className="mt-2 max-w-md text-slate-600">
                  Thanks for choosing CleanDrive. Our team will reach out to you
                  shortly to confirm your first wash.
                </p>
                <Button
                  data-testid="enquiry-new-button"
                  onClick={() => setDone(false)}
                  className="mt-6 rounded-full bg-brand px-6 text-white hover:bg-[#0052CC]"
                >
                  Send another enquiry
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="full_name" className="text-sm font-semibold text-navy">
                      Full Name *
                    </Label>
                    <Input
                      id="full_name"
                      data-testid="input-full-name"
                      value={form.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
                      placeholder="Your name"
                      className="mt-2 h-11 rounded-md border-slate-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-navy">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      data-testid="input-phone"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-2 h-11 rounded-md border-slate-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-navy">
                      Email <span className="font-normal text-slate-400">(optional)</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      data-testid="input-email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 h-11 rounded-md border-slate-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address" className="text-sm font-semibold text-navy">
                      Address / Area in Surat *
                    </Label>
                    <Input
                      id="address"
                      data-testid="input-address"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="e.g. Vesu, Adajan, Piplod..."
                      className="mt-2 h-11 rounded-md border-slate-300"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-navy">Car Type *</Label>
                    <Select value={form.car_type} onValueChange={(v) => update("car_type", v)}>
                      <SelectTrigger
                        data-testid="select-car-type"
                        className="mt-2 h-11 rounded-md border-slate-300"
                      >
                        <SelectValue placeholder="Select car type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5 Seater" data-testid="car-5-seater">
                          5 Seater
                        </SelectItem>
                        <SelectItem value="7 Seater" data-testid="car-7-seater">
                          7 Seater
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-navy">Preferred Time Slot *</Label>
                    <Select
                      value={form.preferred_time_slot}
                      onValueChange={(v) => update("preferred_time_slot", v)}
                    >
                      <SelectTrigger
                        data-testid="select-time-slot"
                        className="mt-2 h-11 rounded-md border-slate-300"
                      >
                        <SelectValue placeholder="Choose morning slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((t) => (
                          <SelectItem key={t} value={t} data-testid={`slot-${t.split(" ")[0]}`}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-sm font-semibold text-navy">Preferred Plan *</Label>
                    <Select
                      value={form.preferred_plan}
                      onValueChange={(v) => update("preferred_plan", v)}
                    >
                      <SelectTrigger
                        data-testid="select-plan"
                        className="mt-2 h-11 rounded-md border-slate-300"
                      >
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLAN_OPTIONS.map((p) => (
                          <SelectItem
                            key={p.value}
                            value={p.value}
                            data-testid={`plan-option-${p.value.replace(/\s+/g, "-").toLowerCase()}`}
                          >
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-navy">
                      Notes <span className="font-normal text-slate-400">(optional)</span>
                    </Label>
                    <Textarea
                      id="message"
                      data-testid="input-message"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Anything we should know? (parking, gate code...)"
                      rows={4}
                      className="mt-2 rounded-md border-slate-300"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  data-testid="enquiry-submit-button"
                  className="mt-7 h-12 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-[#0052CC] disabled:opacity-70 sm:w-auto sm:px-10"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} /> Sending...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </Button>
                <p className="mt-3 text-xs text-slate-500">
                  * Required fields. We will never share your details with third parties.
                </p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

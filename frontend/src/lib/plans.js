export const PLANS = [
  {
    id: "monthly-daily",
    category: "Monthly Plans",
    subtitle: "Daily Service",
    tagline: "Sparkling car every single morning.",
    frequency: "Daily",
    highlight: true,
    prices: { "5 Seater": 999, "7 Seater": 1199 },
    period: "/month",
  },
  {
    id: "ninety-days",
    category: "90 Days Plan",
    subtitle: "Quarterly Package",
    tagline: "Lock in the best value for three months.",
    frequency: "Daily",
    prices: { "5 Seater": 2849, "7 Seater": 3449 },
    period: "/ 90 days",
  },
  {
    id: "alternate-days",
    category: "Alternate Days",
    subtitle: "3-4 washes a week",
    tagline: "Perfect balance for regular drivers.",
    frequency: "Alt. Days",
    prices: { "5 Seater": 649, "7 Seater": 849 },
    period: "/month",
  },
  {
    id: "four-time",
    category: "4-Time Cleaning",
    subtitle: "Weekly touch-up",
    tagline: "Light plan for occasional users.",
    frequency: "4x / month",
    prices: { "5 Seater": 320, "7 Seater": 400 },
    period: "/month",
  },
];

export const PLAN_OPTIONS = PLANS.flatMap((p) => [
  { value: `${p.category} - 5 Seater`, label: `${p.category} - 5 Seater (₹${p.prices["5 Seater"]}${p.period})` },
  { value: `${p.category} - 7 Seater`, label: `${p.category} - 7 Seater (₹${p.prices["7 Seater"]}${p.period})` },
]);

export const TIME_SLOTS = [
  "5:00 AM - 6:00 AM",
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
];

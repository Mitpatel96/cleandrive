const mongoose = require('mongoose');
const Plan = require('./src/models/Plan');
const connectDB = require('./src/config/db');
require('dotenv').config();

const seedPlans = async () => {
  await connectDB();
  
  const plansToSeed = [
    { name: "Monthly Plan (Daily)", durationDays: 30, price: 999, seaterType: "5 Seater", washFrequency: "Daily" },
    { name: "Monthly Plan (Daily)", durationDays: 30, price: 1199, seaterType: "7 Seater", washFrequency: "Daily" },
    { name: "90 Days Plan (Daily)", durationDays: 90, price: 2849, seaterType: "5 Seater", washFrequency: "Daily" },
    { name: "90 Days Plan (Daily)", durationDays: 90, price: 3449, seaterType: "7 Seater", washFrequency: "Daily" },
    { name: "Alternate Days", durationDays: 30, price: 649, seaterType: "5 Seater", washFrequency: "Alternate" },
    { name: "Alternate Days", durationDays: 30, price: 849, seaterType: "7 Seater", washFrequency: "Alternate" },
    { name: "4-Time Cleaning", durationDays: 30, price: 320, seaterType: "5 Seater", washFrequency: "4 times a month" },
    { name: "4-Time Cleaning", durationDays: 30, price: 400, seaterType: "7 Seater", washFrequency: "4 times a month" }
  ];

  try {
    for (const p of plansToSeed) {
      await Plan.findOneAndUpdate(
        { name: p.name, seaterType: p.seaterType },
        p,
        { upsert: true, new: true }
      );
    }
    console.log('Plans seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedPlans();

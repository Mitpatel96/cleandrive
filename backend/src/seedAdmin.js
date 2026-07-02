const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // It might be in ../.env

const seedAdmin = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
    await mongoose.connect(mongoUrl, {
      dbName: process.env.DB_NAME || 'cleandrive',
    });
    console.log('MongoDB Connected for seeding');

    const email = 'cleandrive@gmail.com';
    const password = 'cleandrive24';
    
    // Check if admin already exists
    let adminUser = await User.findOne({ email });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (adminUser) {
        adminUser.password = hashedPassword;
        await adminUser.save();
        console.log('Admin user password updated.');
    } else {
        adminUser = await User.create({
            name: 'Admin',
            email: email,
            password: hashedPassword,
            phone: '1234567890',
            role: 'admin'
        });
        console.log('Admin user created successfully.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();

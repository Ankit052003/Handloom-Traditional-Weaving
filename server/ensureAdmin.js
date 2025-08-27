require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/handloom_website');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@handloom.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Admin credentials:');
      console.log('Email: admin@handloom.com');
      console.log('Password: admin123');
      console.log('Username:', existingAdmin.username);
      console.log('Is Admin:', existingAdmin.isAdmin);
      mongoose.disconnect();
      return;
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = new User({
      username: 'admin',
      email: 'admin@handloom.com',
      password: hashedPassword,
      isAdmin: true
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@handloom.com');
    console.log('Password: admin123');
    console.log('Username: admin');

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.disconnect();
  }
};

createAdmin();

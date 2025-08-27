const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/handloom_website');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test admin login
const testAdminLogin = async () => {
  try {
    await connectDB();

    // Find admin user
    const admin = await User.findOne({ email: 'admin@handloom.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found with email: admin@handloom.com');
      
      // Try to find any admin user
      const anyAdmin = await User.findOne({ isAdmin: true });
      if (anyAdmin) {
        console.log('✅ Found admin user:', {
          username: anyAdmin.username,
          email: anyAdmin.email,
          isAdmin: anyAdmin.isAdmin
        });
      } else {
        console.log('❌ No admin users found in database');
      }
      
      process.exit(0);
    }

    console.log('✅ Admin user found:', {
      username: admin.username,
      email: admin.email,
      isAdmin: admin.isAdmin
    });

    // Test password
    const testPassword = 'admin123';
    const isValidPassword = await bcrypt.compare(testPassword, admin.password);
    
    if (isValidPassword) {
      console.log('✅ Password verification successful!');
      console.log('\n🔑 Use these credentials to login:');
      console.log('📧 Email:', admin.email);
      console.log('🔒 Password:', testPassword);
      console.log('👤 Username:', admin.username);
      console.log('⚡ Is Admin:', admin.isAdmin);
    } else {
      console.log('❌ Password verification failed');
    }

  } catch (error) {
    console.error('❌ Error testing admin login:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

testAdminLogin();

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkAdminUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/handloom_website');
    console.log('Connected to MongoDB');

    const users = await User.find({});
    console.log('All users:');
    users.forEach(user => {
      console.log(`- ID: ${user._id}`);
      console.log(`  Username: ${user.username}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Is Admin: ${user.isAdmin}`);
      console.log('  ---');
    });

    const adminUsers = await User.find({ isAdmin: true });
    console.log(`\nAdmin users found: ${adminUsers.length}`);
    
    if (adminUsers.length > 0) {
      console.log('Admin credentials:');
      adminUsers.forEach(admin => {
        console.log(`- Email: ${admin.email}`);
        console.log(`  Username: ${admin.username}`);
        console.log(`  Password: [Your original password - typically admin123]`);
      });
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkAdminUsers();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/handloom_website');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const checkAllUsers = async () => {
  try {
    await connectDB();

    const allUsers = await User.find({}, 'username email isAdmin');
    
    console.log('🔍 All users in database:');
    console.log('============================');
    
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. Username: ${user.username}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Is Admin: ${user.isAdmin}`);
      console.log('   ---');
    });
    
    console.log(`\nTotal users: ${allUsers.length}`);
    console.log(`Admin users: ${allUsers.filter(u => u.isAdmin).length}`);
    
    // Check specific admin user
    const adminUser = await User.findOne({ email: 'admin@handloom.com' });
    if (adminUser) {
      console.log('\n✅ Admin user details:');
      console.log(`   ID: ${adminUser._id}`);
      console.log(`   Username: ${adminUser.username}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Is Admin: ${adminUser.isAdmin}`);
      console.log(`   Created: ${adminUser.createdAt}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

checkAllUsers();

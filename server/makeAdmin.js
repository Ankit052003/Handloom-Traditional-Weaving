const mongoose = require('mongoose');
require('dotenv').config();

// Connect to database
const connectDB = require('./config/db');
const User = require('./models/User');

async function makeUserAdmin() {
  try {
    await connectDB();
    
    console.log('Making user admin...');
    
    // Update the user to be an admin
    const result = await User.updateOne(
      { email: 'admin@handloom.com' },
      { $set: { isAdmin: true } }
    );
    
    console.log('Update result:', result);
    
    // Verify the change
    const adminUser = await User.findOne({ email: 'admin@handloom.com' });
    console.log('User after update:');
    console.log('Email:', adminUser.email);
    console.log('Username:', adminUser.username);
    console.log('isAdmin:', adminUser.isAdmin);
    
    console.log('✅ User successfully made admin!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

makeUserAdmin();

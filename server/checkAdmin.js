const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to database
const connectDB = require('./config/db');
const User = require('./models/User');

async function checkAdminUser() {
  try {
    await connectDB();
    
    console.log('Checking admin user details...');
    
    // Find user by email
    const user = await User.findOne({ email: 'admin@handloom.com' });
    console.log('User found by email:', user ? 'YES' : 'NO');
    if (user) {
      console.log('User isAdmin value:', user.isAdmin);
      console.log('User isAdmin type:', typeof user.isAdmin);
    }
    
    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@handloom.com', isAdmin: true });
    console.log('Admin user found by email + isAdmin:', adminUser ? 'YES' : 'NO');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAdminUser();

// server/config/db.js
const mongoose = require('mongoose');

let cachedConn = null;

async function connectDB() {
  if (cachedConn) return cachedConn;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing in .env');
    process.exit(1);
  }

  try {
    // Mongoose 8: no extra options required
    const conn = await mongoose.connect(uri);
    cachedConn = conn;
    const { host, name } = conn.connection;
    console.log(`MongoDB connected: ${host}/${name}`);

    // Nice-to-have connection event logs
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Optional: more detail
    // console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;

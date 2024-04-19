const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://agrawaljshivam710:S6pM-59nGit4j2j@shivam.3xdumrr.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

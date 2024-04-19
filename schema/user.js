const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  address: String,
});

module.exports = userSchema;

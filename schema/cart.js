const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 }, 
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema], // Array of cartItemSchema 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = cartSchema;

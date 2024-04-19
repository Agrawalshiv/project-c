const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number },
  paymentId: { type: String, required: true },
});

module.exports = orderSchema;

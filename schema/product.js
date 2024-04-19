const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  category: String,
  rating: Number,
});
module.exports = productSchema;

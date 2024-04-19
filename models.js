const mongoose = require('mongoose');
const productSchema = require('../schema/product');
const userSchema = require('../schema/user');
const commentSchema = require('../schema/comment');
const cartSchema = require('../schema/cart');
const orderSchema = require('../schema/order');

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Product,
  User,
  Comment,
  Cart,
  Order
};

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Odniesienie do produktu
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Odniesienie do użytkownika
  items: [cartItemSchema], // Lista przedmiotów w koszyku
});

module.exports = mongoose.model('Cart', cartSchema);

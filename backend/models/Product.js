const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // To pole jest wymagane
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }, // Opcjonalne pole dla zdjęcia
});

module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: {type: String, required: true},
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const Stock = mongoose.model('Product', stockSchema);
module.exports = Product;

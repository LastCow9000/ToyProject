const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['samsung', 'lg', 'apple', 'kakao'],
      message: '{VALUE} is not supported',
    },
    // enum: ['samsung', 'lg', 'apple', 'kakao'],
  }
})

module.exports = mongoose.model('Product', productSchema)
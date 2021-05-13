const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  discription: String,

  category: {
    type: String,
    enum: ['fiction', 'comic', 'non-fiction', 'novel'],
    default: 'fiction',
  },
  purchaseCount: Number,
  imageUrl: String,
  tags: Array,
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book

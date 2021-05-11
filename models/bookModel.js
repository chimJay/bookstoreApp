const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  discription: String,
  category: String,
  purchhaseCount: Number,
  imageUrl: String,
  tag: Array,
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book

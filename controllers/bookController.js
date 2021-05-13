const Book = require('../models/bookModel')

//create books
exports.createBook = (req, res) => {
  //Get book from req.body
  const book = req.body

  //create and save book in DB
  Book.create(
    {
      name: book.name,
      author: book.author,
      category: book.category,
      discription: book.discription,
      purchhaseCount: book.purchhaseCount,
      imageUrl: book.imageUrl,
      tags: book.tags,
    },
    (err, newBook) => {
      if (err) {
        return res.status(500).json({ message: err })
      } else {
        return res.status(200).json({ message: 'new book created', newBook })
      }
    }
  )
}

//Get all books
exports.getAllBooks = (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      return res.status(500).json({ message: err })
    } else {
      return res.status(200).json(books)
    }
  })
}

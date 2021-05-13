const express = require('express')

const bookController = require('../controllers/bookController')

//initialize router
const router = express.Router()

router
  .route('/')
  .post(bookController.createBook)
  .get(bookController.getAllBooks)

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)

module.exports = router

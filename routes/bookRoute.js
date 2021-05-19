const express = require('express')

//import book controller
const bookController = require('../controllers/bookController')

//import middlewares files
const {
  authenticateUser,
  checkIfAdmin,
} = require('../middlewares/authentication')
//initialize router
const router = express.Router()

router
  .route('/')
  .post(authenticateUser, checkIfAdmin, bookController.createBook)
  .get(authenticateUser, bookController.getAllBooks)

router
  .route('/:id')
  .get(authenticateUser, bookController.getBook)
  .patch(authenticateUser, bookController.updateBook)
  .delete(authenticateUser, bookController.deleteBook)

module.exports = router

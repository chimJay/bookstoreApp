const express = require('express')
const router = express.Router()

//import user controller
const authController = require('../controllers/authController')

router.post('/signup', authController.signUp)
router.post('/login', authController.login)

module.exports = router

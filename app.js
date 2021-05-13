const express = require('express')

const bookRoute = require('./routes/bookRoute')

//initialize express
const app = express()

//middlewares

//body-parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/books', bookRoute)

module.exports = app

const express = require('express')

//import book route
const bookRoute = require('./routes/bookRoute')

//import user route
const authRoute = require('./routes/authRoute')
//initialize express
const app = express()

//SEEDERS
const { seedAdmin } = require('./seeders/admin')
//console.log(seedAdmin())

//middlewares

//body-parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/books', bookRoute)

module.exports = app

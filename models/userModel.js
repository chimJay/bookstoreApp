const mongoose = require('mongoose')
//create user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
  },
  userRole: {
    type: String,
    enum: ['regular', 'admin'],
    default: 'regular',
  },
})
const User = mongoose.model('User', userSchema)

module.exports = User

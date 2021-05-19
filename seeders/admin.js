const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
let password = 'admin'

exports.seedAdmin = () => {
  User.findOne({ userRole: 'admin' }, (err, admin) => {
    if (err) {
      return err.message
    }
    if (admin) {
      return 'An admin already exists'
    }
    User.create(
      {
        firstName: 'caleb',
        lastName: 'doe',
        userRole: 'admin',
        userName: 'admin',
      },
      (err, user) => {
        if (err) {
          return err
        }
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return err
          }
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return err.message
            }
            user.password = hash
            user.save((err, saveduser) => {
              if (err) {
                return err.message
              }
              return 'admin account created successfully'
            })
          })
        })
      }
    )
  })
}

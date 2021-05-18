const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// inport user model
const User = require('../models/userModel')

//create user
exports.signUp = (req, res) => {
  //fetct user from req body
  const { email, password, userName, firstName, lastName } = req.body
  //check if user exists
  User.findOne({ userName }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    if (user) {
      return res.status(404).json({
        message: 'A user with this username already exist',
      })
    }
    //create user
    User.create(
      {
        firstName,
        lastName,
        userName,
      },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ message: err })
        }
        //hash passwors
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ message: err })
          }
          bcrypt.hash(password, salt, (err, hashPassword) => {
            if (err) {
              return res.status(500).json({ message: err })
            }
            //save  user to DB
            newUser.password = hashPassword
            newUser.save((err) => {
              if (err) {
                return res.status(500).json({ message: err })
              }
              //create jwt token
              jwt.sign(
                { id: newUser._id },
                process.env.SECRET,
                { expiresIn: process.env.EXPIRE_IN },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ message: err.message })
                  } else {
                    // send token to cleint
                    return res
                      .status(200)
                      .json({ message: 'user registration successful', token })
                  }
                }
              )
            })
          })
        })
      }
    )
  })
}

//login user
exports.login = (req, res) => {
  //get user from  req body
  const { userName, password } = req.body
  //check if user exists
  User.findOne({ userName }, (err, userFound) => {
    if (err) {
      return res.status(500).json({ message: err })
    }
    if (!userFound) {
      res.status(401).json({ message: 'Incorrect username or password' })
    }
    //compare user password with stored hash Password
    let match = bcrypt.compareSync(password, userFound.password)
    if (!match) {
      return res.json({ message: 'Invalid password' })
    }
    //create token and send
    jwt.sign(
      { id: userFound._id },
      process.env.SECRET,
      {
        expiresIn: process.env.EXPIRE_IN,
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: err.message })
        } else {
          //send token to cleint
          return res
            .status(200)
            .json({ message: 'user logged in successfully', token })
        }
      }
    )
  })
}

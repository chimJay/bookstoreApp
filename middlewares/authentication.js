const jwt = require('jsonwebtoken')

//check for token in headers
exports.authenticateUser = (req, res, next) => {
  //check authorization token
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Invalid authorization header' })
  }

  let splitHeader = req.headers.authorization.split(' ')
  if (splitHeader[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format' })
  }
  //decode token
  let token = splitHeader[1]

  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(500).json(err.message)
      console.log(decodedToken)
    }
    //check if token is valid
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: 'Invalid authorization token, please login' })
    }

    //give user access
    req.user = decodedToken
    return next()
  })
}

exports.checkIfAdmin = (req, res, next) => {
  if (req.user.userRole !== 'admin') {
    return res
      .status(401)
      .json({ message: 'this route is restricted to admin user' })
  }
  return next()
}

const jwt = require('jsonwebtoken')
const User = require('../models/usersDB')
require('dotenv').config()

async function verifyUser(req, res, next) {
   const authorization = req.headers['authorization']
   const token = authorization?.split(' ')[1]
   const user = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      async (err, data) => {
         if (err) throw new Error({ message: 'Unauthorized', status: 401 })
         const user = await User.findOne({ email: data.email }).exec()
         return user
      }
   )
   if (!user) throw new Error({ message: 'Unauthorized', status: 401 })
   req.body.addedBy = user._id
   next()
}

module.exports = {
   verifyUser,
}

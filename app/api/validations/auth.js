const jwt = require('jsonwebtoken')
const User = require('../models/usersDB')
require('dotenv').config()

async function verifyUser(req, res, next) {
   const authorization = req.headers['authorization']
   const token = authorization.split(' ')[1]
   const user = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      async (err, data) => {
         if (err) throw new Error(err)
         console.log(data)
         const user = await User.findOne({ email: data }).exec()
         return user
      }
   )
   if (!user) throw new Error({ message: 'anauthorized' })
   req.body.addedBy = user._id
   next()
}

module.exports = {
   verifyUser,
}

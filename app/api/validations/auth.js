const jwt = require('jsonwebtoken')
const User = require('../models/usersDB')
require('dotenv').config()

async function verifyUser(req, res, next) {
   const authorization = req.headers['authorization']
   const token = authorization.split(' ')[1]
   let message = 'Unauthorized'
   let status = 401
   const user = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      async (err, data) => {
         if (err) {
            message = 'Bad Request'
            status = 400
            return
         }
         const tokenUser = await User.findById(data.id)
         if (!tokenUser) return
         return tokenUser
      }
   )

   if (!user) return next({ message, status })
   req.user = user
   next()
}

module.exports = {
   verifyUser,
}

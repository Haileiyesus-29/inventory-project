require('express-async-errors')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/usersDB')

async function verifyUser(req, res, next) {
   const authorization = req.headers['authorization']
<<<<<<< HEAD
   const token = authorization?.split(' ')[1]
=======
   const token = authorization.split(' ')[1]
   let message = 'Unauthorized'
   let status = 401
>>>>>>> inv_api
   const user = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      async (err, data) => {
<<<<<<< HEAD
         if (err) throw new Error({ message: 'Unauthorized', status: 401 })
         const tokenUser = await User.findOne({ email: data.email }).exec()
         return tokenUser
      }
   )
   if (!user) throw new Error({ message: 'Unauthorized', status: 401 })
=======
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
>>>>>>> inv_api
   req.user = user
   next()
}

module.exports = {
   verifyUser,
}

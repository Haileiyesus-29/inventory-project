require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/usersDB')

const getUserById = async (req, res, next) => {
   const user = await User.findById(req.params.id)
   if (!user)
      res.status(404).json({ error: { message: 'Not Found', status: 404 } })
   user.password = undefined
   res.status(200).json({ user })
}

const createUser = async (req, res) => {
   const { email, name, password } = req.body
   if (!email || !name)
      return res.status(400).json({
         error: {
            message: 'Bad Request',
            status: 400,
         },
      })
   const user = new User({ email, password, name })
   const newUser = await user.save()
   const token = jwt.sign(
      { email: newUser.email },
      process.env.ACCESS_TOKEN_KEY
   )
   res.status(201).json({ token })
}

module.exports = {
   getUserById,
   createUser,
}

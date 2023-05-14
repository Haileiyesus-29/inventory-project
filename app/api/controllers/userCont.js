require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/usersDB')

const getUserById = async (req, res) => {
   const user = await User.findById(req.params.id)
   if (!user) throw new Error({ message: 'Not Found', status: 404 })
   user.password = undefined
   res.status(200).json({ user })
}

const createUser = async (req, res) => {
   const data = {
      email: req.body.email,
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10),
   }

   const user = new User(data)
   const newUser = await user.save()
   if (!newUser) throw new Erorr({ message: 'Bad Request', status: 400 })
   const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.ACCESS_TOKEN_KEY
   )
   res.status(201).json({ token })
}

module.exports = {
   getUserById,
   createUser,
}

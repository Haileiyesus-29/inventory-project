require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/usersDB')

const getUserById = async (req, res) => {
   const user = await User.findById(req.params.id)
   if (!user) throw new Error('not found')
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
   if (!newUser) throw new Erorr({ message: 'bad request' })

   const token = jwt.sign(req.body.email, process.env.ACCESS_TOKEN_KEY)

   console.log(token)
   res.status(201).json({ token })
}

module.exports = {
   getUserById,
   createUser,
}

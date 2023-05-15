require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/usersDB')
const statusObject = require('../helpers/statusObject')

const getUserById = async (req, res, next) => {
<<<<<<< HEAD
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
=======
   const user = await User.findById(req.params.id).select('name email').exec()
   if (!user) return next(statusObject(404))
   res.status(200).json({ user })
}
const createUser = async (req, res, next) => {
   let { email, name, password } = req.body
   if (!email || !name || !password) return next(statusObject(400))

   password = await bcrypt.hash(req.body.password, 10)

   const user = new User({ name, email, password })
   const newUser = await user.save()
   if (!newUser) return next(statusObject(400))

   const token = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_KEY)
>>>>>>> inv_api
   res.status(201).json({ token })
}

module.exports = {
   getUserById,
   createUser,
}

const users = require('../models/usersDB')

const getUserById = async (req, res) => {
   const user = await users.findById(req.params.id)
   if (user) res.status(200).json(user)
   else res.status(404).send()
}
const createUser = async (req, res, next) => {
   const user = new users(req.body)
   const newUser = await user.save()
   res.status(201).json(newUser)
}

module.exports = {
   getUserById,
   createUser,
}

const users = require('../models/usersDB')

const getUserById = async (req, res) => {
   try {
      const user = await users.findById(req.params.id)
      res.status(200).json(user)
   } catch (error) {
      res.status(404).send('NOT FOUND')
   }
}
const createUser = async (req, res) => {
   try {
      const user = new users(req.body.user)
      await user.save()
      res.status(201).json(user)
   } catch (error) {
      res.status(400).send('BAD REQUEST')
   }
}

module.exports = {
   getUserById,
   createUser,
}

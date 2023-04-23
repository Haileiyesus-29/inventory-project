const express = require('express')
const routes = express.Router()
const users = require('../models/usersDB')
const products = require('../models/productsDB')

routes.get('/:id', async (req, res) => {
   try {
      const user = await users.findById(req.params.id)
      res.status(200).json(user)
   } catch (error) {
      res.status(404).send('NOT FOUND')
   }
})

routes.post('/', async (req, res) => {
   try {
      const user = new users(req.body.user)
      await user.save()
      res.status(201).json(user)
   } catch (error) {
      res.status(400).send('BAD REQUEST')
   }
})
module.exports = routes

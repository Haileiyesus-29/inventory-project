const express = require('express')
const routes = express.Router()
const users = require('../models/usersDB')
const products = require('../models/productsDB')

routes.get('/', async (req, res) => {
   try {
      const productList = await products.find()
      res.status(200).json(productList)
   } catch (error) {
      res.status(500).send('INTERNAL SERVER FAILURE')
   }
})

routes.post('/', async (req, res) => {
   try {
      const product = new products(req.body.product)
      await product.save()
      res.status(201).json(product)
   } catch (error) {
      res.status(400).json(product)
   }
})

routes.get('/:id', async (req, res) => {
   try {
      const product = await products.findById(req.params.id)
      res.status(200).json(product)
   } catch (error) {
      res.status(404).send('NOT FOUND')
   }
})

routes.put('/:id', async (req, res) => {
   try {
      const product = await products.findByIdAndUpdate(
         req.params.id,
         req.body.product
      )
      res.status(201).json(product)
   } catch (error) {
      res.status(400).send('BAD REQUEST')
   }
})

routes.delete('/:id', async (req, res) => {
   try {
      const product = await products.findByIdAndDelete(req.params.id)
      if (!product) throw new Error()
      res.status(200).json(product)
   } catch (error) {
      res.status(404).send('NOT FOUND')
   }
})

module.exports = routes

const express = require('express')
const mongoose = require('mongoose')
// const { PORT } = require('./config')
const cors = require('cors')
const app = express()
const products = require('./models/productsDB')
const users = require('./models/usersDB')

// connect to MongoDB

app.use(express.static('static'))
app.use(cors())
app.use(express.json())

// Your routes will go here

app.get('/status', (req, res) => {
   res.json({ status: 'OK' })
})
app.get('/api/products', async (req, res) => {
   try {
      const productList = await products.find()
      res.json(productList)
   } catch (err) {
      console.log(err)
   }
})

app.post('/api/products', async (req, res) => {
   //  const product = {
   //     ...req.body.product,
   //     images: JSON.parse(req.body.product.images),
   //  }
   //  console.log(req.body)
   const product = req.body.map(product => {
      return { ...product, images: JSON.parse(product.images) }
   })
   console.log(product)
   try {
      product.forEach(async p => {
         newProd = new products(p)
         await newProd.save()
      })
      res.json(product)
      // const newProduct = new products(product)
      // await newProduct.save()
      // res.json(newProduct)
   } catch (err) {
      console.log(err)
   }
})

module.exports = app
app.listen(3000, () => console.log('server running on port 3000'))

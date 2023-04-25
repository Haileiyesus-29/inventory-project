const products = require('../models/productsDB')

const getAllProduct = async (req, res) => {
   try {
      const productList = await products.find()
      res.status(200).json(productList)
   } catch (error) {
      res.status(500).send('INTERNAL SERVER FAILURE')
   }
}
const createProduct = async (req, res) => {
   try {
      const product = new products(req.body.product)
      await product.save()
      res.status(201).json(product)
   } catch (error) {
      res.status(400).send('BAD REQUEST')
   }
}
const getProductById = async (req, res) => {
   try {
      const product = await products.findById(req.params.id)
      product
         ? res.status(201).json(product)
         : res.status(404).send('NOT FOUND')
   } catch (error) {
      res.status(404).send('NOT FOUND')
   }
}
const updateProduct = async (req, res) => {
   try {
      const product = await products.findByIdAndUpdate(
         req.params.id,
         req.body.product
      )
      product
         ? res.status(201).json(product)
         : res.status(404).send('NOT FOUND')
   } catch (error) {
      res.status(400).send('BAD REQUEST')
   }
}
const deleteProduct = async (req, res) => {
   try {
      const product = await products.findByIdAndDelete(req.params.id)
      if (!product) throw new Error()
      res.status(200).json(product)
   } catch (error) {
      res.status(404).send('NOT FOUND')
   }
}

module.exports = {
   getAllProduct,
   createProduct,
   getProductById,
   updateProduct,
   deleteProduct,
}

const Product = require('../models/productsDB')

const getAllProduct = async (req, res) => {
   const productList = await Product.find().populate({
      path: 'addedBy',
      select: 'name email _id',
   })
   res.status(200).json(productList)
}

const createProduct = async (req, res) => {
   const product = new Product(req.body)
   await product.save()
   if (!product) throw new Error({ message: 'Bad Request', status: 400 })
   res.status(201).json(product)
}

const getProductById = async (req, res) => {
   const product = await Product.findById(req.params.id)
   if (!product) throw new Error({ message: 'Not Found', status: 404 })
   res.status(200).json(product)
}

const updateProduct = async (req, res) => {
   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   })
   if (!product) throw new Error({ message: 'Not Found', status: 404 })
   res.status(200).json(product)
}
const deleteProduct = async (req, res) => {
   const product = await Product.findByIdAndDelete(req.params.id)
   if (!product) throw new Error({ message: 'Not Found', status: 404 })
   res.status(204).json(product)
}

module.exports = {
   getAllProduct,
   createProduct,
   getProductById,
   updateProduct,
   deleteProduct,
}

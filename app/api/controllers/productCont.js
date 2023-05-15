const Product = require('../models/productsDB')
const validateUser = require('../validations/validateUser')
const statusObject = require('../helpers/statusObject')

// Public
const getAllProduct = async (req, res, next) => {
   const productList = await Product.find().populate({
      path: 'addedBy',
      select: 'name email _id',
   })
   res.status(200).json(productList)
}

<<<<<<< HEAD
const createProduct = async (req, res) => {
   const product = new Product({ ...req.body, addedBy: req.user._id })
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
   const product = await Product.findById(req.params.id)
   const isValidUser = product.addedBy.toString() == req.user._id.toString()
   if (!isValidUser)
      return res
         .status(401)
         .json({ error: { message: 'Unauthorized', status: 401 } })

   const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, addedBy: req.user._id },
      {
         new: true,
         runValidators: true,
      }
   )
   if (!updatedProduct) throw new Error({ message: 'Not Found', status: 404 })
   res.status(200).json(updatedProduct)
}
const deleteProduct = async (req, res) => {
   const product = await Product.findById(req.params.id)
   if (!product)
      return res
         .status(404)
         .json({ error: { message: 'Not Found', status: 404 } })
   const isValidUser = product?.addedBy.toString() == req.user._id.toString()
   if (!isValidUser)
      return res
         .status(401)
         .json({ error: { message: 'Unauthorized', status: 401 } })

   const deletedProduct = await Product.findByIdAndDelete(req.params.id)
   if (!deletedProduct) throw new Error({ message: 'Not Found', status: 404 })
=======
const getProductById = async (req, res, next) => {
   const product = await Product.findById(req.params.id)
   if (!product) return next(statusObject(404))
   res.status(200).json(product)
}

// Private
const createProduct = async (req, res, next) => {
   const product = new Product({ ...req.body, addedBy: req.user._id })
   await product.save()
   if (!product) return next(statusObject(400))
   res.status(201).json(product)
}

const updateProduct = async (req, res, next) => {
   const product = await Product.findById(req.params.id)
   if (!product) return next(statusObject(404))
   if (!validateUser(req.user._id, product.addedBy))
      return next(statusObject(403))

   const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,
         runValidators: true,
      }
   )
   if (!updatedProduct) return next(statusObject(400))
   res.status(200).json(updatedProduct)
}

const deleteProduct = async (req, res, next) => {
   const product = await Product.findById(req.params.id)
   if (!product) return next(statusObject(404))
   if (!validateUser(req.user._id, product.addedBy))
      return next(statusObject(403))

   const deletedProduct = await Product.findByIdAndDelete(req.params.id)
   if (!deletedProduct) return next(statusObject(500))
>>>>>>> inv_api
   res.status(204).json(deletedProduct)
}

module.exports = {
   getAllProduct,
   createProduct,
   getProductById,
   updateProduct,
   deleteProduct,
}

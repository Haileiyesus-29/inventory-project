const express = require('express')
const routes = express.Router()
const productCont = require('../controllers/productCont')
const { verifyUser } = require('../validations/auth')

// public routes
routes.get('/', productCont.getAllProduct)

routes.get('/:id', productCont.getProductById)

// private routes
routes.post('/', verifyUser, productCont.createProduct)

routes.put('/:id', verifyUser, productCont.updateProduct)

routes.delete('/:id', verifyUser, productCont.deleteProduct)

module.exports = routes

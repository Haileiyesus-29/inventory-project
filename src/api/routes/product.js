const express = require('express')
const routes = express.Router()
const productCont = require('../controllers/productCont')

routes.get('/', productCont.getAllProduct)

routes.post('/', productCont.createProduct)

routes.get('/:id', productCont.getProductById)

routes.put('/:id', productCont.updateProduct)

routes.delete('/:id', productCont.deleteProduct)

module.exports = routes

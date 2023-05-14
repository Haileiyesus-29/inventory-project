const express = require('express')
const routes = express.Router()
const userCont = require('../controllers/userCont')
const { hashPassword } = require('../middlewares/hashPassword')

routes.get('/:id', userCont.getUserById)

routes.post('/', hashPassword, userCont.createUser)

module.exports = routes

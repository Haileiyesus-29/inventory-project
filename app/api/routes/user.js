const express = require('express')
const routes = express.Router()
const userCont = require('../controllers/userCont')

routes.get('/:id', userCont.getUserById)

routes.post('/', userCont.createUser)

routes.post('/login', userCont.login)

module.exports = routes

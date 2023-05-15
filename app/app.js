require('express-async-errors')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {
   clientErrorHanlder,
   serverErrorHandler,
} = require('./api/middlewares/errorHandler')

const app = express()

app.use(express.static('static'))
app.use(cors())
app.use(express.json())

// Your routes will go here
const users = require('./api/routes/user')
const products = require('./api/routes/product')

app.use('/api/users', users)
app.use('/api/products', products)

app.get('/status', (req, res) => {
   res.status(200).json({ status: 'OK' })
})

app.use(clientErrorHanlder)
app.use(serverErrorHandler)

module.exports = app

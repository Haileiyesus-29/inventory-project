require('express-async-errors')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {
   clientErrorHanlder,
   mongooseErrorHanlder,
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

app.use((req, res) => {
   res.status(404).json({ status: 'NOT FOUND' })
})

// Error handling middlewares
app.use(clientErrorHanlder)
app.use(mongooseErrorHanlder)

module.exports = app

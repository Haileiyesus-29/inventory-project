require('express-async-errors')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { errorHandler } = require('./api/middlewares/errorHandler')
const jwt = require('jsonwebtoken')

const app = express()

// connect to MongoDB
mongoose.connect(process.env.DB_URI).catch(err => console.log(err.message))

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
app.use(errorHandler)

module.exports = app

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

// connect to MongoDB
mongoose.connect(process.env.DB_URI).catch(err => console.log(err.message))

app.use(express.static('static'))
app.use(cors())
app.use(express.json())

// Your routes will go here
const users = require('./routes/user')
const products = require('./routes/product')

app.use('/api/users', users)
app.use('/api/products', products)

app.get('/status', (req, res) => {
   res.status(200).json({ status: 'OK' })
})

app.get('/:path', (req, res) => {
   res.status(404).json({ status: 'NOT FOUND' })
})
app.post('/:path', (req, res) => {
   res.status(404).json({ status: 'NOT FOUND' })
})

module.exports = app

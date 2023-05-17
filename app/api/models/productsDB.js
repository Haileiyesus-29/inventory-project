const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   unitPrice: {
      type: Number,
      required: true,
   },
   stock: {
      type: Number,
      default: 1,
   },
   description: {
      type: String,
      required: true,
   },
   images: [String],
   catagory: String,
   addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
   },
})

productsSchema.set('versionKey', false)
productsSchema.set('toJSON', {
   transform: (_, obj) => {
      obj.id = obj._id
      delete obj._id
      delete obj.__v
   },
})
module.exports = mongoose.model('products', productsSchema)

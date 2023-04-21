const mongoose = require('mongoose')

mongoose
   .connect('mongodb://127.0.0.1:27017/inventory')
   .catch(err => console.log(err.message))

const productsSchema = new mongoose.Schema({
   name: {
      type: String,
      // required: true,
   },
   unitPrice: {
      type: Number,
      // required: true,
   },
   stock: {
      type: Number,
      default: 1,
   },
   description: {
      type: String,
      // required: true,
   },
   images: [String],
   catagory: String,
   // addedBy: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    required: true,
   //    populate: true,
   // },
})

const productsModel = mongoose.model('products', productsSchema)
module.exports = productsModel

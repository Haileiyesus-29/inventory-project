const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      immutable: false,
   },
   password: {
      type: String,
      required: true,
   },
})

userSchema.set('versionKey', false)
userSchema.set('toJSON', {
   transform: (_, obj) => {
      obj.id = obj._id
      delete obj._id
      delete obj.__v
   },
})

module.exports = mongoose.model('users', userSchema)

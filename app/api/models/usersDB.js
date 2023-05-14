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

userSchema.set('toJSON', {
   transform: (_, obj) => {
      obj.id = obj._id
      delete obj._id
      delete obj.__v
   },
})

// userSchema.pre('save', () => {
//    bcrypt.genSalt(10, (err, salt) => {
//       if (err) throw new Error(err)
//       bcrypt.hash(this.password, salt, (err, hash) => {
//          if (err) throw new Error(err)
//          this.password = hash
//          next()
//       })
//    })
// })
module.exports = mongoose.model('users', userSchema)

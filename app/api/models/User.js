const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.set("toJSON", {
  transform: (_, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.password;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

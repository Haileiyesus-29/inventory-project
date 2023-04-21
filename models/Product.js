const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  unitPrice: Number,
  description: String,
  images: [
    {
      type: String,
    },
  ],
  stock: Number,
  category: String,
  addedBy: String,
});

productSchema.set("toJSON", {
  transform: (_, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

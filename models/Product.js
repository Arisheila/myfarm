const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
    type: String,
    trim:true,
  },
  price: {
    type: Number,
    unique:true,
    requred: true,
  },

  quantity: {
    type: String,
  },
  status: {
    type: String,
    unique:true,
    requred: true,
  },

  type: {
    type: String,
    unique:true,
    requred: true,
  },





});

// Export Model

module.exports = mongoose.model("Product", ProductSchema);
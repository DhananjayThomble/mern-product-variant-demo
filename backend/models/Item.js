const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  class: String,
  attributes: [String],
});

const combinationSchema = new mongoose.Schema({
  combination: [String],
  price: Number,
  quantity: Number,
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemCode: { type: String, required: true, unique: true },
  variants: [variantSchema],
  combinations: [combinationSchema],
});

module.exports = mongoose.model("Item", itemSchema);

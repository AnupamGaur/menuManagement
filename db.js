const mongoose = require("mongoose");
const { number } = require("zod");

mongoose
  .connect(
    "mongodb+srv://agaurbe:7DLL4sQ5aadSNanj@cluster0.l4w4tje.mongodb.net/Menu"
  )
  .then(console.log("DB connected"))
  .catch((err) => console.log("DB could not be connected!"));

const categories = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  taxApplicability: {
    type: Boolean,
    required: true,
  },
  tax: Number,
  taxType: String,
});

const Categories = mongoose.model("Categories", categories);

const subCategories = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  taxApplicability: {
    type: Boolean,
    required: true,
    default: true,
  },
  tax: Number,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

const SubCategories = mongoose.model("SubCategories", subCategories);
const items = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  taxApplicability: {
    type: Boolean,
    required: true,
    default: true,
  },
  tax: Number,
  baseAmount: {
    type: Number,
    required: true,
  },
  discount: Number,
  totalAmount: Number,
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategories",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

const Items = mongoose.model("Items", items);

module.exports = {
  Categories,
  SubCategories,
  Items,
};

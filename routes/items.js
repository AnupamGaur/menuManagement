const express = require("express");
const mongoose = require("mongoose");
const itemRouter = express.Router();
const { itemBody, updateItemsBody } = require("../zodtypes/zodSchemas");
const { Categories, Items } = require("../db");
const { SubCategories } = require("../db");
const validateIds = require("../Middlewares/validation");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

itemRouter.post("/", validateIds, async (req, res) => {
  const {
    name,
    description,
    image,
    tax,
    taxApplicability,
    baseAmount,
    discount,
    subCategoryId,
  } = req.body;
  let { categoryId } = req.body;
  let { totalAmount } = req.body;
  if (!totalAmount) {
    totalAmount = baseAmount - discount;
    req.body.totalAmount = totalAmount;
  }

  const { success } = itemBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "Your inputs are not correct!",
    });
    return;
  }
  async function findSubCategory(subCategoryId) {
    const subCategory = await SubCategories.findOne({
      _id: subCategoryId,
    });
    return subCategory;
  }
  async function findCategory(categoryId) {
    const category = await Categories.findOne({
      _id: categoryId,
    });
    return category;
  }
  async function addItem({
    name,
    description,
    image,
    tax,
    taxApplicability,
    baseAmount,
    discount,
    totalAmount,
    subCategoryId,
    categoryId,
  }) {
    await Items.create({
      name,
      description,
      image,
      tax,
      taxApplicability,
      baseAmount,
      discount,
      totalAmount,
      subCategoryId,
      categoryId,
    });
    res.status(200).json({
      msg: "Item has been created",
    });
    return;
  }
  if (!subCategoryId && !categoryId) {
    res.status(400).json({
      msg: "Please map the item to either a category or a sub-category",
    });
    return;
  }

  if (subCategoryId && categoryId) {
    const subCategory = await findSubCategory(subCategoryId);
    if (!subCategory) {
      res.status(400).json({
        msg: "The provided subcategoryId does not exists",
      });
      return;
    }

    var category = await findCategory(categoryId);
    if (!category) {
      res.status(400).json({
        msg: "The provided categoryId does not exists",
      });
      return;
    }
    if (categoryId != subCategory.categoryId) {
      res.status(400).json({
        msg: "The given categoryId does not match the categoryId of the sub-category",
      });
      return;
    }
    await addItem(req.body);
  }

  if (subCategoryId && !categoryId) {
    const subCategory = await findSubCategory(subCategoryId);
    if (!subCategory) {
      res.status(400).json({
        msg: "The provided subcategoryId is not valid",
      });
      return;
    }
    const category = await findCategory(subCategory.categoryId);
    req.body.categoryId = category._id;
    await addItem(req.body);
  }
  if (!subCategoryId && categoryId) {
    const category = await findCategory(categoryId);
    if (!category) {
      res.status(400).json({
        msg: "The provided categoryId is not valid",
      });
    }
    await addItem(req.body);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////

itemRouter.get("/", async (req, res) => {
  const allItems = await Items.find({});
  res.status(200).json({
    "List of all Items": allItems,
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////

itemRouter.get("/:identifier", async (req, res) => {
  const { identifier } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if (isValid) {
    const requestedItem = await Items.findOne({
      _id: identifier,
    });
    if (!requestedItem) {
      res.status(400).json({
        msg: "This Item does not exists",
      });
      return;
    }
    res.status(200).json({
      requestedItem,
    });
    return;
  } else {
    const requestedItem = await Items.findOne({
      name: identifier,
    });
    if (!requestedItem) {
      res.status(400).json({
        msg: "This Item does not exists",
      });
      return;
    }
    res.status(200).json({
      requestedItem,
    });
    return;
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

itemRouter.put("/:identifier", async (req, res) => {
  const { identifier } = req.params;
  const { success } = updateItemsBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "Your updated body is not valid",
    });
    return;
  }
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if (!isValid) {
    res.status(400).json({
      msg: "This is not a valid Item Id",
    });
    return;
  }
  // To ensure the Updated Category Id is Valid

  const { categoryId } = req.body;
  if (categoryId) {
    const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);
    if (!isValidCategoryId) {
      res.status(400).json({
        msg: "This is not a valid Category Id",
      });
      return;
    }
    const updatedCategoryId = await Categories.findOne({
      _id: categoryId,
    });
    if (!updatedCategoryId) {
      res.status(400).json({
        msg: "This Category does not exist",
      });
      return;
    }
  }

  const requestedItem = await Items.findOne({
    _id: identifier,
  });
  if (!requestedItem) {
    res.status(400).json({
      msg: "This Item does not exists",
    });
    return;
  }

  await Items.updateOne(
    {
      _id: identifier,
    },
    req.body
  );

  res.status(200).json({
    msg: "This Item's attributes have been Updated",
  });
  return;
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = itemRouter;

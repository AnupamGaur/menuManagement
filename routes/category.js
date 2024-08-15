const express = require("express");
const mongoose = require("mongoose");
const categoryRouter = express.Router();
const { Categories, SubCategories, Items } = require("../db");
const { categoryBody } = require("../zodtypes/zodSchemas");
const {updateCategoryBody} = require('../zodtypes/zodSchemas')

categoryRouter.post("/", async (req, res) => {
  const { success } = categoryBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "Your inputs are not correct!",
    });
    return;
  }
  const { name, description, image, tax, taxType, taxApplicability } = req.body;
  await Categories.create({
    name,
    description,
    image,
    tax,
    taxType,
    taxApplicability,
  });
  res.status(200).json({
    msg: "Category created Successfully",
  });
  return;
});

///////////////////////////////////////////////////////////////////////////////////////////////////

categoryRouter.get("/", async (req, res) => {
  const allCategories = await Categories.find({});
  res.status(200).json({
    "List of all categories": allCategories,
  });
});
module.exports = categoryRouter;

////////////////////////////////////////////////////////////////////////////////////////////////////

categoryRouter.get("/:identifier", async (req, res) => {
  const { identifier } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if (isValid) {
    const requestedCategory = await Categories.findOne({
      _id: identifier,
    });
    if (!requestedCategory) {
      res.status(400).json({
        msg: "This category does not exists",
      });
      return;
    }
    res.status(200).json({
      requestedCategory,
    });
    return;
  } else {
    const requestedCategory = await Categories.findOne({
      name: identifier,
    });
    if (!requestedCategory) {
      res.status(400).json({
        msg: "This category does not exists",
      });
      return;
    }
    res.status(200).json({
      requestedCategory,
    });
    return;
  }
});


categoryRouter.get('/subcategories/:identifier',async (req,res) => {
  const {identifier} = req.params
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if(!isValid){
    res.status(400).json({
      msg: "This is not a valid category",
    });
    return;
  }
  const requestedSubCategories = await SubCategories.find({
    categoryId:identifier
  })
  if(!requestedSubCategories){
    res.status(400).json({
      msg: "No sub-category is mapped to this category",
    });
    return;
  }
  res.status(200).json({
    "All sub categories mapped to this category":requestedSubCategories
  });
  return;
})
//////////////////////////////////////////////////////////////////////////////////////////////////////

categoryRouter.get('/items/:identifier',async (req,res) => {
  const {identifier} = req.params
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if(!isValid){
    res.status(400).json({
      msg: "This is not a valid category ID",
    });
    return;
  }
  const requestedItems = await Items.find({
    categoryId:identifier
  })
  if(!requestedItems){
    res.status(400).json({
      msg: "No Items are mapped to this category",
    });
    return;
  }
  res.status(200).json({
    "All Items mapped to this category":requestedItems
  });
  return;
})

/////////////////////////////////////////////////////////////////////////////////////////////////////

categoryRouter.put("/:identifier", async (req, res) => {
  const { identifier } = req.params;
  const { success } = updateCategoryBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "Your updated body is not valid",
    });
    return;
  }
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if (!isValid) {
    res.status(400).json({
      msg: "This is not a valid category Id",
    });
    return;
  }
  const requestedCategory = await Categories.findOne({
    _id: identifier,
  });
  if (!requestedCategory) {
    res.status(400).json({
      msg: "This category does not exists",
    });
    return;
  }

  await Categories.updateOne(
    {
      _id: identifier,
    },
    req.body
  );

  res.status(200).json({
    msg: "This category's attributes have been changed",
  });
  return;
});


/////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = categoryRouter;
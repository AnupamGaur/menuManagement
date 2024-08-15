const express = require("express");
const mongoose = require("mongoose");
const subCategoryRouter = express.Router();
const { subCategoryBody,updateSubCategoryBody } = require("../zodtypes/zodSchemas");
const { Categories,SubCategories,Items } = require("../db");
const validateIds = require('../Middlewares/validation')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

subCategoryRouter.post("/",validateIds, async (req, res) => {
  const { name, description, image, categoryId } =
  req.body;
  let {taxApplicability,tax} = req.body; 
  const { success } = subCategoryBody.safeParse(req.body);
  const parentCategoryId = req.body.categoryId;

  const isValid = mongoose.Types.ObjectId.isValid(parentCategoryId);
  if (!isValid) {
    res.status(400).json({
      msg: "The provided categoryId is not valid",
    });
    return;
  }
  const parentCategory = await Categories.findOne({
    _id: parentCategoryId,
  });
  if (!parentCategory) {
    res.status(400).json({
      msg: "The provided category does not exist",
    });
    return;
  }
  if (!success) {
    res.status(400).json({
      msg: "Your inputs are not correct!",
    });
    return;
  }

  // If taxApplicability or tax ofthe sub category are not defined, sub cayegory will take the inputs from parent category
  if(taxApplicability == undefined) {
    taxApplicability = parentCategory.taxApplicability
  }
  if(tax == undefined) {
    tax = parentCategory.tax
  }


  await SubCategories.create({
    name,
    description,
    image,
    tax,
    taxApplicability,
    categoryId,
  });
  res.status(200).json({
    msg: "Sub Category created Successfully",
  });
  return;
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

subCategoryRouter.get('/',async (req,res) => {
  const allSubCategories = await SubCategories.find({})
   res.status(200).json({
     "List of all sub-Categories":allSubCategories
   })
 })

 //////////////////////////////////////////////////////////////////////////////////////////////////

 subCategoryRouter.get('/:identifier',async (req,res) => {
  const {identifier} = req.params
  
   const isValid = mongoose.Types.ObjectId.isValid(identifier);
   if(isValid){
   const requestedSubCategory = await SubCategories.findOne({
   _id:identifier
   })
    if(!requestedSubCategory){
    res.status(400).json({
   "msg":"This Sub-category does not exists"
   })
   return;
   }
   res.status(200).json({
    requestedSubCategory
   })
   return;
   }
   else{
    const requestedSubCategory = await SubCategories.findOne({
   name:identifier
   })
   if(!requestedSubCategory){
  res.status(400).json({
   "msg":"This Sub-category does not exists"
   }
   )
   return;
   }
  res.status(200).json({
    requestedSubCategory
   })
   return;
   }
 })

 /////////////////////////////////////////////////////////////////////////////////////////////////////

 subCategoryRouter.get('/items/:identifier',async (req,res) => {
  const {identifier} = req.params
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if(!isValid){
    res.status(400).json({
      msg: "This is not a valid Sub-Category ID",
    });
    return;
  }
  const requestedItems = await Items.find({
    subCategoryId:identifier
  })
  if(!requestedItems){
    res.status(400).json({
      msg: "No Items are mapped to this Sub-category",
    });
    return;
  }
  res.status(200).json({
    "All Items mapped to this Sub-category":requestedItems
  });
  return;
})

//////////////////////////////////////////////////////////////////////////////////////////////////////

subCategoryRouter.put("/:identifier", async (req, res) => {
  const { identifier } = req.params;
  const { success } = updateSubCategoryBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "Your updated body is not valid",
    });
    return;
  }
  const isValid = mongoose.Types.ObjectId.isValid(identifier);
  if (!isValid) {
    res.status(400).json({
      msg: "This is not a valid Sub-Category Id",
    });
    return;
  }
  // To ensure the Updated Category Id is Valid

  const {categoryId} = req.body
  if(categoryId){
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);
  if (!isValidCategoryId) {
    res.status(400).json({
      msg: "This is not a valid Category Id",
      });
      return;
      }

      const updatedCategoryId = await Categories.findOne({
        _id: categoryId
      })
      if(!updatedCategoryId){
        res.status(400).json({
          msg: "This Category does not exist",
          });
          return;
          }
        }
  const requestedSubCategory = await SubCategories.findOne({
    _id: identifier,
  });
  if (!requestedSubCategory) {
    res.status(400).json({
      msg: "This Sub Category does not exists",
    });
    return;
  }

  await SubCategories.updateOne(
    {
      _id: identifier,
    },
    req.body
  );

  res.status(200).json({
    msg: "This Sub-Category's attributes have been Updated",
  });
  return;
});
 
/////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = subCategoryRouter;

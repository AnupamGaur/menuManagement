const express = require("express");
const mongoose = require("mongoose");
const searchItemsRouter = express.Router();
const { Items } = require("../db");

searchItemsRouter.get('/',async (req,res) => {
    const itemname = req.query.name

    const requestedItem = await Items.find({
     name:{
      "$regex":itemname
     }
     })
     if(!requestedItem){
    res.status(400).json({
     "msg":"This Item does not exists"
     }
     )
     return;
     }
    res.status(200).json({
      requestedItem
     })
     return;
})

module.exports = searchItemsRouter
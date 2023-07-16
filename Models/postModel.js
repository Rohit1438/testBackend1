const mongoose=require("mongoose")

const postSchema =new mongoose.Schema({
title:{type:String,required:true},
content:{type:String,required:true},
creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

name:{type:String,required:true},
likes:{type:[String],default:[]},
comments:{type:[String],default:[]},
tags:[String]



})

module.exports=mongoose.model("Post",postSchema)
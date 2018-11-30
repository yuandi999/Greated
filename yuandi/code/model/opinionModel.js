const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let opinionSchema=new Schema({
  	opincontent:{type:String,required:true}, //type字段类型   required必填
  })

  let opinionModel=mongoose.model('opinions', opinionSchema); 

 module.exports=opinionModel;
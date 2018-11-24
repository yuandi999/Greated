const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let discussesSchema=new Schema({
  	content:{type:String,required:true}, //type字段类型   required必填
  })

  let discussesModel=mongoose.model('discusses', discussesSchema); 

 module.exports=discussesModel;
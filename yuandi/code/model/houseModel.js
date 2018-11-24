const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let houseSchema=new Schema({
  	housename:{type:String,required:true}, //type字段类型   required必填
  	addr:{type:String,required:true},
  	photo:{type:String,required:true},
  	area:{type:String,required:true},
  	housestyle:{type:String,required:true},
  	price:{type:String,required:true},
  	property:{type:String,required:true},
    status:{type:String,required:true},
  })

  let houseModel=mongoose.model('houses', houseSchema); 

 module.exports=houseModel;
 
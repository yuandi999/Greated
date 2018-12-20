const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let userSchema=new Schema({
  	uname:{type:String,required:true}, //type字段类型   required必填
  	name:{type:String,required:true},
  	pass:{type:String,required:true},
  	code:{type:String,required:false},
  })

  let usermodel=mongoose.model('users', userSchema);

 module.exports=usermodel;
 
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let orderhouseSchema=new Schema({
  	housename:{type:String,required:true}, //type字段类型   required必填
  	addr:{type:String,required:true},
  	photo:{type:String,required:false},
  	area:{type:String,required:false},
  	housestyle:{type:String,required:false},
  	price:{type:String,required:false},
  	property:{type:String,required:false},
    lander:{type:String,required:false},
    date:{type:String,required:false},
  })

  let orderhouseModel=mongoose.model('orderhouses', orderhouseSchema); 

 module.exports=orderhouseModel;
 
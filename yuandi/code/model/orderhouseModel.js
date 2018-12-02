const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let orderhouseSchema=new Schema({
  	// title:{type:String,required:true}, //type字段类型   required必填
  	price:{type:String,required:true},
    area:{type:String,required:true}
  })

  let orderhousemodel=mongoose.model('orderhouse', orderhouseSchema); 

 module.exports=orderhousemodel;
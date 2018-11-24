const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let adminSchema=new Schema({
  	// title:{type:String,required:true}, //type字段类型   required必填
  	Ltitle:{type:String,required:true},
  	// style:{type:String,required:true},
  	main:{type:String,required:true},
  	img:{type:String,required:true},
  	data:{type:String,required:true},
    name:{type:String,required:true}
  })

  let adminmodel=mongoose.model('goods', adminSchema); 

 module.exports=adminmodel;
 
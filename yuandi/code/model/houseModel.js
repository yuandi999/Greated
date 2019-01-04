const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let houseSchema=new Schema({
  	housename:{type:String,required:false}, //type字段类型   required必填
  	addr:{type:String,required:false},
  	photo:{type:String,required:false},
  	area:{type:String,required:false},
  	housestyle:{type:String,required:false},
  	price:{type:String,required:false},
  	property:{type:String,required:false},
    status:{type:String,required:false},
    lander:{type:String,required:false},
    puttime:{type:String,required:false}
  })

  let houseModel=mongoose.model('houses', houseSchema); 

 module.exports=houseModel;
 
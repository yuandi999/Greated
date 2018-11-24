const mongoose = require("mongoose");
let Schema = mongoose.Schema;
  let memberSchema=new Schema({
    uname:{type:String,required:true}, //type字段类型   required必填
    name:{type:String,required:true},
    pass:{type:String,required:true},
    Cart:{type:String,required:true},
    phone:{type:String,required:true},
    power:{type:String,required:true},
    date:{type:String,required:true},
    sex:{type:String,required:true},
  })

 let membermodel=mongoose.model('delusers', memberSchema); 

 module.exports=membermodel;
 
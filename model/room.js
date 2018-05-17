var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var roomSchema=new Schema({
    //创建者id
    uid:String,
    //房间编号
    no:Number
})



mongoose.model("room",roomSchema);
/*房间成员*/
var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var roomMemberSchema=new Schema({
    //用户名
    uid:String,
    //房间id
    avRoomId:Number,
    //上下麦状态，状态:on-上麦，off-下麦
    status:String,
    //心跳时间
    modifyTime:Number,
    //成员角色，0-观众；1-主播；2-上麦成员
    role:Number
})

// roomMemberSchema.method={
//     enterRoom:async function(){
//         var member=await roomMemberSchema
//     }
// }


mongoose.model("roommember",roomMemberSchema);



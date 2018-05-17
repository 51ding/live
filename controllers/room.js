var model=require("../model");
var Room=model.room;
var RoomMember=model.roommember;
/*创建房间*/
exports.createRoom=async function (ctx,next) {
    var data=ctx.request.body;
    var {type,token}=JSON.parse(Object.keys(data)[0]);
    var {uid}=ctx.session.user;

    var room=await Room.findOne({uid:uid});
    //如果房间存在要先删除直播记录和清空房间成员
    if(room){
        await RoomMember.remove({avRoomId:room.no});
    };
    var roomNumber=parseInt(Date.now()/10000) ;
    var newRoom=new Room({uid:uid,no:roomNumber});
    var newRoomMember=new RoomMember({uid:uid,avRoomId:roomNumber,status:"off",role:1,modifyTime:roomNumber});
    await Promise.all([newRoom.save(),newRoomMember.save()]);
    ctx.body = {
        errorCode: 0,
        errorInfo: "",
        data: {
            roomnum:roomNumber,
            groupid:roomNumber
        }
    };
}

/*上报房间的信息*/
exports.reportroom=async function(ctx,next) {
    ctx.body = {
        errorCode: 0,
        errorInfo: ""
    };
}


var User = require("../model").user;
var tls = require("../lib/tls");
var config = require("../lib/config");
var tool = require("../lib/tool");
exports.index=async function(ctx,index){
  await ctx.render("index");
}

exports.register=async function(ctx,nect){

}


//主播登陆
exports.login=async function (ctx,next) {
    var data=ctx.request.body;
    var {name,pwd}=JSON.parse(Object.keys(data)[0]);

    var user = await User.findOne({uid: name});
    if (!user) {
        ctx.body = {
            errorCode: -1,
            errorInfo: "用户不存在"
        };
    }
    else if (user && user.pwd != pwd) {
        ctx.body = {
            errorCode: -1,
            errorInfo: "密码错误"
        };
    }
    else {
        user.token = tool.createToken(name, Date.now())
        await user.save();
        ctx.session.user = user;
        ctx.body = {
            errorCode: 0,
            errorInfo:"",
            data:{
                userSig:user.userSig,
                token:user.token
            }
        };
    }

}


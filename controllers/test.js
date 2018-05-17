var User = require("../model").user;
var tls = require("../lib/tls");
var config = require("../lib/config");
var tool = require("../lib/tool");
exports.index = async function (ctx, next) {
    await ctx.render("test");
}

exports.login = async function (ctx, next) {
    var {name, pwd} = ctx.request.body;
    var user = await User.findOne({uid: name});
    if (!user) {
        ctx.body = {
            code: -1,
            msg: "用户不存在"
        };
    }
    else if (user && user.pwd != pwd) {
        ctx.body = {
            code: -1,
            msg: "密码错误"
        };
    }
    else {
        user.token = tool.createToken(name, Date.now())
        await user.save();
        ctx.session.user = user;
        ctx.body = {
            code: 0,
            msg: ""
        };
    }


}

exports.register = async function (ctx, next) {
    var {name, pwd} = ctx.request.body;
    var user = await User.findOne({uid: name});
    console.log(user);
    if (user) {
        ctx.body = {
            code: -1,
            msg: "系统已存在该用户！"
        }
    } else {
        var sig = new tls.Sig(config);
        var userSig = sig.genSig(name);
        var user = new User({uid: name, pwd: pwd, userSig, registerTime: Date.now()});
        await user.save();
        ctx.body = {
            code: 0,
            msg: ""
        }
    }
}


exports.loginout = async function (ctx, next) {
    ctx.session = null;
    ctx.body = {
        code: 0,
        msg: ""
    }
}

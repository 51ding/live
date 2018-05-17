var User=require("../model").user;

exports.guest=async function (ctx,next) {
	var user=ctx.session.user;
	var result=await User.update({_id:user._id},{$set:{
		state:1,
		loginTime:Date.now(),
	}});
	
  await ctx.render("guest",{
  	userSig:user.userSig,
  	token:user.token
  });
}
var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var userSchema=new Schema({
  //用户Id
  uid:String,
  //密码
  pwd:String,
  //登录签名
  token:String,
  //登录状态
  state:Number,
  //直播需要的秘钥
  userSig:String,
  //注册时间
  registerTime:Number,
  //登录时间
  loginTime:Number,
  //注销时间
  logoutTime:Number,
  //最后一次请求时间
  lastRequestTime:Number
})


mongoose.model('user', userSchema);






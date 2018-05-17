var mongoose=require("mongoose");
var config=require("../config");

mongoose.set("debug",true);
mongoose.connect(config.db, {
  poolSize:20
}, function (err) {
  if (err) {
    console.log('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});


require("./user");
require("./room");
require("./roommember");


exports.user=mongoose.model("user");
exports.room=mongoose.model("room");
exports.roommember=mongoose.model("roommember");
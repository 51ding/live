const crypto = require('crypto');
/**
 * 功能：生成用户Token
 * 生成策略：用户名+登录时间然后再Base64加密,必须保证生成的token具备唯一性
 */
exports.createToken = function (username, logintime) {
  var cryptoStr = [username, logintime].join("");
  var sha = crypto.createHash('sha512');
  return sha.update(cryptoStr).digest("base64");
}
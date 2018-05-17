const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const views = require("koa-views");
const config = require('./config')
const logger = require("koa-logger");
const session = require("koa-session");

require("./model");

app.keys = ["123456789"];

const sessionConfig = {
    key: 'live',
    maxAge:1000*60*60*2,
    overwrite: true,
    httpOnly: false,
    signed: false,
    rolling: false,
    renew: true,
};

app.use(logger());
app.use(require('koa-static')(__dirname + '/public'))
app.use(session(sessionConfig, app));
app.use(views(__dirname + "/views", {
    extension: "ejs"
}));

app.use(async (ctx, next) => {
    var ignoreUrl = ["/live/test", "/live/test/login", "/live/test/register"];
    if (!ctx.session.user && !ignoreUrl.includes(ctx.path)) return await ctx.render("test");
    await next();
})


// 使用响应处理中间件
// app.use(response);


// 解析请求体
app.use(bodyParser());

// 引入路由分发
const router = require('./routes');

app.use(router.routes());

// 启动程序，监听端口
app.listen(config.port, () => {
    console.log("server is running at " + config.port + " port");
});

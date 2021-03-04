// 导入路由
const Router = require("koa-router");

// 最终控制函数
const { login, success } = require("../controller/auth.controller");
// 中间件middleware: 效验用户是否注册, 帐号密码是否正确
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

// 创建路由
const authRouter = new Router();

authRouter.post("/login", verifyLogin, login);
authRouter.get("/test", verifyAuth, success);

module.exports = authRouter;

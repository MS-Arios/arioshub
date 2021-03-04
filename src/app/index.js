const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

// 所有的路由统一由此导入
const useRoutes = require("../router");

// /users的post路由
// const userRouter = require("../router/user.router");
// /login的post理由
// const authRouter = require("../router/auth.router");

const errorHandle = require("./error-handle");

const app = new Koa();

app.use(bodyParser());
useRoutes(app);
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

app.on("error", errorHandle);

module.exports = app;

const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const md5password = require("../utils/password-handle");
const errorTypes = require("../constants/error.types");
const service = require("../service/user.service");
const authRouter = require("../router/auth.router");

// 验证登录是否成功的中间件middleware
const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { username, password } = ctx.request.body;

  // 2.判断用户名和密码是否为空
  if ((!username, !password)) {
    // console.log("cao");
    const err = new Error(errorTypes.NAME_OR_PASSWORD_ERROR);
    return ctx.app.emit("error", err, ctx);
  }

  // 3.判断用户是否存在(通过数据库)
  const result = await service.getUserName(username);
  // 将数据库从查询到的用户信息保存
  const user = result[0];
  console.log(user);
  if (!user) {
    const err = new Error(errorTypes.USERNAME_ALREADY_EMPTY);
    return ctx.app.emit("error", err, ctx);
  }

  // 4.判断密码是否和数据库中存储的密码一致(加密)
  if (md5password(password) !== user.password) {
    const err = new Error(errorTypes.USER_PASSWORD_ERROR);
    return ctx.app.emit("error", err, ctx);
  }

  // 将数据库中查询到的用户信息保存到ctx.user中
  ctx.user = user;

  await next();
};

// 验证授权的中间件middleware
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的中间件middleware");

  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const err = new Error(errorTypes.UNAHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (error) {
    console.log(error);
    const err = new Error(errorTypes.UNAHORIZATION);
    ctx.app.emit("error", err, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};

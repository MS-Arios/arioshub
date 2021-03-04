const errorTypes = require("../constants/error.types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");

// 判断用户名和密码是否为空, 是否注册过
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { username, password } = ctx.request.body;

  // 2.判断用户名或者密码不能为空
  if (!username || !password) {
    // 手动创建异常
    const err = new Error(errorTypes.NAME_OR_PASSWORD_ERROR);
    // 通过emit将异常发射出去
    return ctx.app.emit("error", err, ctx);
  }

  // 3.判断这次注册的用户名是没有注册过的
  const result = await service.getUserName(username);
  console.log(result);
  if (result.length) {
    console.log(errorTypes.USERNAME_ALREADY_EXISTS);
    const err = new Error(errorTypes.USERNAME_ALREADY_EXISTS);
    return ctx.app.emit("error", err, ctx);
  }

  await next();
};

// 将密码加密
const hanldePassword = async (ctx, next) => {
  // 密码从请求体中结构出来
  let { password } = ctx.request.body;
  // 将密码传入到md5password()函数中进行加密并赋值到请求体中
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  hanldePassword,
};

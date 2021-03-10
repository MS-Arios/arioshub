const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const md5password = require("../utils/password-handle");
const errorTypes = require("../constants/error.types");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");

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
  const result = await userService.getUserName(username);
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

/**
 * 1.很多的内容都需要修改权限: 修改/删除动态,  修改/删除评论
 * 2.接口: 业务接口/后端管理系统
 *  一对一: user => role
 *  多对多: role => menu(删除动态/修改动态)
 */

// 验证是否具有权限
const verifyPromisstion = async (ctx, next) => {
  console.log("验证权限的middleware");

  // 获取参数
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  // 获取参数的id
  const resourceId = ctx.params[resourceKey];
  // 获取用户的id
  const { id: userId } = ctx.user;
  // 验证权限
  const isPermisstion = await authService.checkResource(
    tableName,
    resourceId,
    userId
  );

  if (!isPermisstion) {
    const err = new Error(errorTypes.UNPERMISSTION);
    return ctx.app.emit("error", err, ctx);
  }

  await next();
};

// 通过闭包的形式:   调用时verifyPromisstion(tableName)
// const verifyPromisstion = (tableName) => {
//   return async (ctx, next) => {
//     console.log("验证权限的middleware");

//     // 获取动态的momentId
//     const { momentId } = ctx.params;
//     // 获取用户的id
//     const { id: userId } = ctx.user;
//     // 验证权限
//     const isPermisstion = await authService.check(tableName, momentId, userId);

//     if (!isPermisstion) {
//       const err = new Error(errorTypes.UNPERMISSTION);
//       return ctx.app.emit("error", err, ctx);
//     }

//     await next();
//   };
// };

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPromisstion,
};

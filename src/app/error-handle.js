const errorTypes = require("../constants/error.types");

const errorHnalde = (err, ctx) => {
  // console.log(err.message === errorTypes.USERNAME_ALREADY_EXISTS);
  let status, message;
  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_ERROR:
      status = 400;
      message = "用户名或密码不能为空";
      break;
    case errorTypes.USERNAME_ALREADY_EXISTS:
      status = 409;
      message = "用户名已存在";
      break;
    case errorTypes.USERNAME_ALREADY_EMPTY:
      status = 400;
      message = "用户名不存在";
      break;
    case errorTypes.USER_PASSWORD_ERROR:
      status = 400;
      message = "密码错误, 请重新输入";
      break;
    case errorTypes.UNAHORIZATION:
      status = 401;
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSTION:
      status = 401;
      message = "您没有权限~";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHnalde;

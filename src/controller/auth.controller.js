// 导入生成token令牌的jwt库
const jwt = require("jsonwebtoken");
// 导入私钥
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    // 将查询到的用户信息对象解构出来
    const { id, name } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = {
      id,
      name,
      token,
    };

    // const { username } = ctx.request.body;
    // ctx.body = `欢迎${username}回来`;
  }

  async success(ctx, next) {
    console.log("jinlaile");
    ctx.body = "登录成功~";
  }
}

module.exports = new AuthController();

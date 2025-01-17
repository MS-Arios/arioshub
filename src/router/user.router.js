const Router = require("koa-router");
const { create } = require("../controller/user.controller");
const { verifyUser, hanldePassword } = require("../middleware/user.middleware");

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/", verifyUser, hanldePassword, create);

module.exports = userRouter;

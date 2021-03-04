// 导入路由
const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, detail, list } = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

// 保存评论的路由
momentRouter.post("/", verifyAuth, create);
// 获取某个用户的评论信息
momentRouter.get("/:momentId", detail);
// 获取所有的评论
momentRouter.get("/", list);

module.exports = momentRouter;

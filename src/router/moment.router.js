// 导入路由
const Router = require("koa-router");
const {
  verifyAuth,
  verifyPromisstion,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
} = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

// 保存动态的路由
momentRouter.post("/", verifyAuth, create);
// 获取某个用户的动态信息
momentRouter.get("/:momentId", detail);
// 获取所有的动态
momentRouter.get("/", list);

// 修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPromisstion, update);
// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPromisstion, remove);

module.exports = momentRouter;

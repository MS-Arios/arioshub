const momentService = require("../service/moment.service");

class momentController {
  // 获取数据变插入到数据库中
  async create(ctx, next) {
    // 1.获取数据(user_id, content)
    const user_id = ctx.user.id;
    const content = ctx.request.body.content;
    // 2.将数据插入到数据库中
    const result = await momentService.create(user_id, content);

    ctx.body = "发表动态成功~";
  }

  // 查询单个用户的评论数据
  async detail(ctx, next) {
    // 1.获取用户的id
    const momentId = ctx.params.momentId;
    // 2.根据id查询数据
    const result = await momentService.getMomentById(momentId);
    console.log(result);
    ctx.body = result;
  }

  // 分页查询评论数据
  async list(ctx, next) {
    // 1.获取查询信息, offset从哪开始,  size查询多少条
    const { offset, size } = ctx.query;
    // 2.查询数据
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }
}

module.exports = new momentController();

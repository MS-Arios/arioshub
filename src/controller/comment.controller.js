const CommentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id: userId } = ctx.user;

    const result = await CommentService.create(content, momentId, userId);
    console.log(result);
    ctx.body = "发布评论成功~";
  }
}

module.exports = new CommentController();

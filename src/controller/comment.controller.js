const commentService = require("../service/comment.service");

class CommentController {
  // 发布评论
  async create(ctx, next) {
    // 获取用户ID
    const { id: userId } = ctx.user;
    // 获取动态的ID,  获取发布评论的内容
    const { momentId, content } = ctx.request.body;

    const result = await commentService.create(content, momentId, userId);
    console.log(result);
    ctx.body = "发布评论成功~";
  }

  // 回复评论
  async reply(ctx, next) {
    // 获取用户ID
    const { id: userId } = ctx.user;
    // 获取动态的ID, 回复评论的内容
    const { momentId, content } = ctx.request.body;
    // 获取评论的id
    const { commentId } = ctx.params;
    // console.log(commentId);

    const result = await commentService.reply(
      content,
      momentId,
      userId,
      commentId
    );

    ctx.body = "回复评论成功~";
  }

  // 修改评论
  async update(ctx, next) {
    const { content } = ctx.request.body;
    const { commentId } = ctx.params;

    const result = await commentService.update(content, commentId);
    // ctx.body = `${commentId} + ${content}`;
    ctx.body = "修改评论成功~";
  }

  // 删除评论
  async remove(ctx, next) {
    const { commentId } = ctx.params;

    const result = await commentService.remove(commentId);
    ctx.body = "删除评论成功~";
  }

  // 获取评论
  async list(ctx, next) {
    console.log(ctx.query);
    const { momentId } = ctx.query;

    const result = await commentService.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();

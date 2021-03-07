const connection = require("../app/database");

class CommentService {
  // 发布评论
  async create(content, momentId, userId) {
    const statement = ` INSERT INTO comment (content, moment_id, user_id) values (?, ?, ?); `;
    const result = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    return result;
  }

  // 回复评论
  async reply(content, momentId, userId, commentId) {
    const statement = ` INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?); `;
    const result = await connection.execute(statement, [
      content,
      momentId,
      userId,
      commentId,
    ]);

    return result;
  }

  // 修改/更新评论-更新评论表格的id修改评论coantent
  async update(content, commentId) {
    const statement = ` UPDATE comment SET content = ? WHERE id = ?; `;
    const result = await connection.execute(statement, [content, commentId]);
    return result;
  }

  // 删除评论
  async remove(commentId) {
    const statement = ` DELETE FROM comment WHERE id = ?; `;
    const result = await connection.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService();

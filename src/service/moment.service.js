const connection = require("../app/database");

class MomentService {
  // 创建/插入评论数据
  async create(userId, content) {
    console.log(userId);
    const statement = ` INSERT INTO moment (content, user_id) VALUES (?, ?); `;
    const result = await connection.execute(statement, [content, userId]);
    console.log(result);
    return result;
  }

  // 获取评论数据-(查询单个的用户信息)
  async getMomentById(userId) {
    const statement = ` 
      SELECT 
        m.id id, m.content, m.createAt AS createTime, m.updateAt AS updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) author, 
        (SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) AS commentCount
      FROM moment AS m 
      LEFT JOIN users AS u ON m.user_id = u.id 
      WHERE m.id = ?; `;

    const [result] = await connection.execute(statement, [userId]);
    console.log(result);
    return result[0];
  }

  // 获取评论数据-(根据offset, size)
  async getMomentList(offset, size) {
    const statement = ` 
      SELECT 
        m.id id, m.content, m.createAt AS createTime, m.updateAt AS updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 'user', JSON_OBJECT('id', cu.id, 'name', cu.name)) 
        ) AS comments
      FROM moment AS m 
      LEFT JOIN users AS u ON m.user_id = u.id 
      LEFT JOIN comment AS c ON c.moment_id = m.id
      LEFT JOIN users AS cu ON cu.id = c.user_id
      LIMIT 0, 20;`;
    const [result] = await connection.execute(statement, [offset, size]);
    console.log(result);
    return result;
  }

  // 修改评论数据
  async update(content, momentId) {
    const statement = ` UPDATE moment SET content = ? WHERE id = ?; `;
    const result = await connection.execute(statement, [content, momentId]);
    console.log(result);
    return result;
  }

  // 删除评论数据
  async remove(momentId) {
    const statement = ` DELETE FROM moment WHERE id = ?; `;
    const result = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();

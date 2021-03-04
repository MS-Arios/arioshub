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
    const statement = ` SELECT m.user_id id, m.content, m.createAt AS createTime, m.updateAt AS updateTime, JSON_OBJECT('id', u.id, 'name', u.name) users FROM moment AS m LEFT JOIN users AS u ON m.user_id = u.id WHERE m.user_id = ?; `;
    const [result] = await connection.execute(statement, [userId]);
    // console.log(result);
    return result[0];
  }

  // 获取评论数据-(根据offset, size)
  async getMomentList(offset, size) {
    const statement = ` SELECT m.user_id id, m.content, m.createAt AS createTime, m.updateAt AS updateTime, JSON_OBJECT('id', u.id, 'name', u.name) users FROM moment AS m LEFT JOIN users AS u ON m.user_id = u.id LIMIT ?, ?; `;
    const [result] = await connection.execute(statement, [offset, size]);
    console.log(result);
    return result;
  }
}

module.exports = new MomentService();

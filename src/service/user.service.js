const connection = require("../app/database");

class UserService {
  // 将user存储到数据库中
  async create(user) {
    const { username, password } = user;
    const statement = ` INSERT INTO users (name, password) VALUES (?, ?); `;
    const result = await connection.execute(statement, [username, password]);
    return result[0];
  }

  // 查询user是否存在
  async getUserName(username) {
    const statement = ` SELECT * FROM users WHERE name = ?; `;
    const result = await connection.execute(statement, [username]);

    return result[0];
  }
}

module.exports = new UserService();

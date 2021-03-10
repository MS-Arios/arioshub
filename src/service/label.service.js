const connection = require("../app/database");

class LabelService {
  // 创建标签
  async create(name) {
    const statement = ` INSERT INTO label (name) VALUES (?); `;
    const result = await connection.execute(statement, [name]);
    console.log("cao");
    return result;
  }

  // 根据name查询标签是否存在
  async getLabelByName(name) {
    const statement = ` SELECT * FROM label WHERE name = ?; `;
    const [result] = await connection.execute(statement, [name]);
    // console.log(result[0]);
    return result[0];
  }
}

module.exports = new LabelService();

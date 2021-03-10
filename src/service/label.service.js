const connection = require("../app/database");

class LabelService {
  // 创建标签
  async create(name) {
    const statement = ` INSERT INTO label (name) VALUES (?); `;
    const result = await connection.execute(statement, [name]);
    return result;
  }

  // 根据name查询标签是否存在
  async getLabelByName(name) {
    const statement = ` SELECT * FROM label WHERE name = ?; `;
    const [result] = await connection.execute(statement, [name]);
    // console.log(result[0]);
    return result[0];
  }

  // 查询moment_label数据表中是否有此标签
  async hasLabel(labelId, momentId) {
    // console.log(labelId, momentId);
    const statement = ` SELECT * FROM moment_label WHERE label_id = ? AND moment_id = ?; `;
    const [result] = await connection.execute(statement, [labelId, momentId]);
    return result[0] ? true : false;
  }

  // 在moment_label数据表中保存给动态添加标签的关系
  async addLabel(labelId, momentId) {
    const statement = ` INSERT INTO moment_label (label_id, moment_id) VALUES (?, ?);  `;
    const result = await connection.execute(statement, [labelId, momentId]);
    return result;
  }

  // 获取标签-根据offset和limit
  async getLabels(offset, limit) {
    const statement = ` SELECT * FROM label LIMIT ?, ?; `;
    const result = await connection.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new LabelService();

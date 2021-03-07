const connection = require("../app/database");

class AuthService {
  async checkResource(tableName, resourceId, userId) {
    try {
      const statement = ` SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?; `;
      const [result] = await connection.execute(statement, [
        resourceId,
        userId,
      ]);
      return result.length === 0 ? false : true;
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const statement = ` SELECT * FROM moment WHERE id = ? AND user_id = ?; `;
    //   const [result] = await connection.execute(statement, [momentId, userId]);
    //   return result.length === 0 ? false : true;
    // } catch (error) {
    //   console.log(error);
    // }
  }
}

module.exports = new AuthService();

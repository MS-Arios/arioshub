const connection = require("../app/database");

class AuthService {
  async authMoment(momentId, userId) {
    try {
      const statement = ` SELECT moment.content FROM moment WHERE id = ? AND user_id = ?; `;
      const [result] = await connection.execute(statement, [momentId, userId]);
      return result.length === 0 ? false : true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthService();

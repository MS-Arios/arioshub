const mysql = require("mysql2");

const config = require("./config");

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  connectionLimit: 10,
});

connections.getConnection((err, connect) => {
  if (err) {
    console.log(err);
  } else {
    console.log("数据库连接成功~");
  }
});

module.exports = connections.promise();

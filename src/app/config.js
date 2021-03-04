// 导入文件读取模块
const fs = require("fs");
// 导入路径拼接模块
const path = require("path");

// 导入从.env文件加入环境变量的库
const dotenv = require("dotenv");

// 默认读取项目根目录下的.env文件
dotenv.config();

// 导入私钥
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
// 导入公钥
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);

// 读取到的.env文件保存在process.env中,  通过对象结构的形式将其导出
module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;

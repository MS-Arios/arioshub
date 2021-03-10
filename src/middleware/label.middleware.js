const labelService = require("../service/label.service");

const verifyLabelExists = async (ctx, next) => {
  console.log("验证label表中标签是否存在的中间件");

  // 1.取出要添加的所有的标签
  const { labels } = ctx.request.body;
  const newLabels = [];
  // 2.判断每一个标签在label表中是否存在
  for (let name of labels) {
    // 查询name标签是否在label表中
    const labelResult = await labelService.getLabelByName(name);
    // 创建label对象, 将所有的name标签添加进去
    const label = { name };
    // 如果label表中没有name标签
    if (!labelResult) {
      // 将name添加到label中
      const result = await labelService.create(name);
      // 添加到label中返回的insertId保存到label.id中
      label.id = result.insertId;
      console.log(labelResult);
    } else {
      // label表中查询到的name标签的id属性保存到label.id中
      label.id = labelResult.id;
    }
    newLabels.push(label);
    // console.log(label);
  }

  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};

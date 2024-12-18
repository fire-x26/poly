// server.js
const express = require('express');
const app = express();

// 导入服务
const generateKeysService = require('./service/generateKeys');
const deployService = require('./service/prepareCondition');

app.use(express.json()); // 允许处理JSON数据

// 使用中间件，挂载路由
app.use('/generateKeys', generateKeysService); // 所有 /user 路由由 userService.js 处理
app.use('/deploy', deployService); // 所有 /user 路由由 userService.js 处理

// 启动服务
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

# 图书管理系统

> 基于 nodejs+mysql 开发的图书管理系统

## 构建步骤

```bash
# 进入项目根目录，打开db文件夹，将book_mgr.sql 导入到mysql数据库并修改 confing.js 配置文件。
module.exports = {
  port: 99, //端口
  mysql : {
    host     : '',
    user     : '',
    password : '',
    database : ''
  },
};

# 进入项目根目录，安装项目依赖模块
npm install

# 运行项目
node app.js

# 或者
npm run start

# 打开浏览器运行 hthp://127.0.0.1:99/ 浏览项目

```


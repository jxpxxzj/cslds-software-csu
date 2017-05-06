# cslds-software-csu
中南大学软件学院 学业服务与发展中心 代码仓库  

[![Build Status](https://travis-ci.org/jxpxxzj/cslds-software-csu.svg?branch=master)](https://travis-ci.org/jxpxxzj/cslds-software-csu)
[![Build status](https://ci.appveyor.com/api/projects/status/wx640hsuqfn8i6k8?svg=true)](https://ci.appveyor.com/project/jxpxxzj/cslds-software-csu)
[![Code Climate](https://codeclimate.com/github/jxpxxzj/cslds-software-csu/badges/gpa.svg)](https://codeclimate.com/github/jxpxxzj/cslds-software-csu)
[![GitHub issues](https://img.shields.io/github/issues/jxpxxzj/cslds-software-csu.svg)](https://github.com/jxpxxzj/cslds-software-csu/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jxpxxzj/cslds-software-csu/master/LICENSE)

## 构建说明
### 修改代码
#### 配置服务器地址
打开 `/frontend/src/main.js`, 修改以下代码:
```js
const baseURL = '/api'; // 修改这行为将要部署的后端地址
Vue.prototype.$axios = axios.create({
    baseURL,
    withCredentials: true
});
```
在 `/frontend/config/index.js` 中配置了开发环境下的路由表和 URL 重写.

#### 配置数据库
1. 打开 `/backend/conf/config.example.js`, 复制一份为 `config.js`, 并修改以下代码:
```js
server: {
    port: '3000' // 监听端口
},
mysql: {
    host: 'localhost', // 数据库地址
    user: 'root', // 数据库用户名
    password: '', // 数据库密码
    database: 'xf', // 数据库名
    port: 3306 // 数据库端口
}
```
2. 在数据库中执行 `/backend/database.sql`.

### 构建前端
#### 安装依赖
在 Terminal 中执行以下命令:
```bash
$ cd frontend
$ npm install
```
等待其安装完毕.

#### 执行构建
在 Terminal 中继续执行以下命令:
```bash
# 确保导航到 /frontend 文件夹
$ npm run build
```
等待构建完成, 可以在 `/dist` 下找到生成的 `/static` 文件夹和 `index.html` 文件.

### 部署后端

#### 安装依赖
在 Terminal 中执行以下命令:
```bash
$ cd backend
$ npm install
```
等待其安装完毕.

#### 部署前端
复制上一步的中构建出的 `/frontend/dist` 文件夹中的全部内容到 `/backend/public` 文件夹, 并新建 `/backend/file` 文件夹, 最终的目录结构类似如下:
```
# 省略了其他目录结构
├── backend/              
    ├── public/
        ├── file/                      
        ├── static/
            ├── js/                 
            ├── css/             
            ├── assets/                  
        ├── index.html                  
```

#### 启动服务器
在 Terminal 中执行以下命令:
```bash
# 确保导航到 /backend 文件夹
$ npm start
```
服务器便会开始运行, 访问 `http://localhost:设置的端口号` 即可看到页面.

## 提交说明
提交前请进行以下工作:
1. 执行 ESLint 的代码检查工作, `/frontent` 和 `/backend` 都配置了各自的 ESLint 检查文件, 确保修复所有的 Error 和除了 `no-unused-variable` 以外的 Warning.
2. 配置 `.gitignore` 文件, 检查以下文件是否在提交列表中:
* 个体差异性开发环境, 包括但不限于 `.idea`, `.vscode`, `.DS_STORE` 等
* `node_modules` 等需要重新安装的文件
* `npm_debug.log`, `yarn_error.log` 等调试文件
* `/backend/conf/config.js` 等配置文件
* `/frontend/dist`, `/backend/public` 等已构建后的文件
3. 对所有文件进行一次 diff 检查, 确保提交的代码正确.

## License
[MIT](http://opensource.org/licenses/MIT)
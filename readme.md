# cslds-software-csu
中南大学软件学院 学业服务与发展中心 代码仓库  

[![Build Status](https://travis-ci.org/jxpxxzj/cslds-software-csu.svg?branch=master)](https://travis-ci.org/jxpxxzj/cslds-software-csu)
[![Build status](https://ci.appveyor.com/api/projects/status/wx640hsuqfn8i6k8?svg=true)](https://ci.appveyor.com/project/jxpxxzj/cslds-software-csu)
[![Code Climate](https://codeclimate.com/github/jxpxxzj/cslds-software-csu/badges/gpa.svg)](https://codeclimate.com/github/jxpxxzj/cslds-software-csu)
[![GitHub issues](https://img.shields.io/github/issues/jxpxxzj/cslds-software-csu.svg)](https://github.com/jxpxxzj/cslds-software-csu/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jxpxxzj/cslds-software-csu/master/LICENSE)

## 运行环境
Node.js >= 7.6.0 或使用 --harmony

## 构建说明
执行以下命令, 按提示完成初始化.
``` bash
$ npm run setup

Setup Script
? Server port                                       # 服务器运行端口
? Server session-key                                # session-key
? MySQL server address                              # 数据库地址
? MySQL server port                                 # 数据库端口
? MySQL username                                    # 数据库用户名
? MySQL password                                    # 数据库密码
? Application database                              # 数据库名
? Initial admin account                             # 初始管理员账号
? Initial admin password                            # 初始管理员密码
? Build now?                                        # 是否立即执行构建
? Force sync model with database now?               # 是否立即与数据库强制同步模型
? Start server now?                                 # 是否立即开始运行
```
配置文件会生成到 `/backend/config/config.json`, 可以使用文本编辑器进行编辑.

#### 启动服务器
在 Terminal 中执行以下命令:
```bash
# 确保导航到 /backend 文件夹
$ npm start
```
服务器便会开始运行, 访问 `http://localhost:设置的端口号` 即可看到页面.

## 提交说明
提交前请进行以下工作:
1. 执行 ESLint 的代码检查工作(通过 `npm run lint` 完成), `/frontent` 和 `/backend` 都配置了各自的 ESLint 检查文件, 确保修复所有的 Error 和除了 `no-unused-variable` 以外的 Warning.
2. 配置 `.gitignore` 文件, 检查以下文件是否在提交列表中:
* 个体差异性开发环境, 包括但不限于 `.idea`, `.vscode`, `.DS_STORE` 等
* `node_modules` 等需要重新安装的文件
* `npm_debug.log`, `yarn_error.log` 等调试文件
* `/backend/config/config.json` 等配置文件
* `/frontend/dist`, `/backend/public` 等已构建后的文件
3. 对所有文件进行一次 diff 检查, 确保提交的代码正确.

## License
[MIT](http://opensource.org/licenses/MIT)
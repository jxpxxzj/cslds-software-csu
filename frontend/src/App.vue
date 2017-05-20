<template>
  <div id="app">
        <div class="menu-container">
            <div class="nav">
                <div class="left">
                    <router-link :to="{ path: '/'}">首页</router-link>
                    <router-link :to="{ path: '/material' }">学习资料</router-link>
                    <router-link :to="{ path: '/teacher' }">导师介绍</router-link>
                </div>
                <div class="right" v-if="!this.isLogin">
                    <a href="javascript:void(0);" @click="onLogin">登录 / 注册</a>
                </div>
                <div class="right" v-if="this.isLogin">
                    <router-link :to="{ path: '/application' }">我的申请</router-link>
                    <a href="javascript:void(0);" @click="onSetting">个人设置</a>
                    <a href="javascript:void(0);" @click="onLogout">退出登录</a>
                </div>
            </div>
        </div>
        <div class="header" v-if="this.$route.path === '/'">
            <div class="content">
                <div class="logo">
                    <img src="./assets/logo.png">
                </div>
                <div class="text">
                    <p>学业服务与发展中心</p>
                </div>
            </div>
        </div>
        <el-dialog title="登录 / 注册" v-model="loginFormVisible">
            <el-tabs v-model="tabSelected">
                <el-tab-pane label="登录" name="login">
                    <el-form :model="loginForm">
                        <el-form-item label="用户名">
                            <el-input v-model="loginForm.username" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="loginForm.password" auto-complete="off" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer">
                        <el-button type="primary" @click="onLoginClick">登录</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <el-form :model="registerForm" :rules="registerRule" ref="registerForm" label-width="100px">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="registerForm.username" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="registerForm.password" auto-complete="off" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码" prop="repeat">
                            <el-input v-model="registerForm.repeat" auto-complete="off" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="班级" prop="class">
                            <el-input v-model="registerForm.class" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="学号" prop="number">
                            <el-input v-model.number="registerForm.number" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model.number="registerForm.phone" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="qq">
                            <el-input v-model.number="registerForm.qq" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer">
                        <el-button type="primary" @click="onRegisterClick">注册</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>  
        </el-dialog>
        <el-dialog title="个人设置" v-model="settingFormVisible">
            <el-tabs>
                <el-tab-pane label="基本信息">
                <el-form :model="settingForm.user" ref="settingFormUser">
                    <el-form-item label="班级" prop="class" :rules="[{ required: true, message: '班级不能为空'}]">
                        <el-input v-model="settingForm.user.class" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" prop="number" :rules="[{ required: true, message: '学号不能为空'}, { type: 'number', message: '学号必须为数字值'}]">
                        <el-input v-model.number="settingForm.user.number" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '电话不能为空'}, { type: 'number', message: '电话必须为数字值'}]">
                        <el-input v-model.number="settingForm.user.phone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ" prop="qq" :rules="[{ required: true, message: 'QQ 不能为空'}, { type: 'number', message: 'QQ 必须为数字值'}]">
                        <el-input v-model.number="settingForm.user.qq" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button type="primary" @click="onSaveInfoClick">保存</el-button>
                </div>
                </el-tab-pane>
                <el-tab-pane label="修改密码">
                    <el-form :model="settingForm.password" :rules="passwordRule" ref="settingFormPassword">
                        <el-form-item label="原密码" prop="oldPassword">
                            <el-input v-model="settingForm.password.oldPassword" type="password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="password">
                            <el-input v-model="settingForm.password.password" type="password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="重复新密码" prop="repeat">
                            <el-input v-model="settingForm.password.repeat" type="password" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer">
                        <el-button type="primary" @click="onSavePasswordClick">提交</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>   
        </el-dialog>
        <router-view></router-view>
        <footer>
            <el-row>
                <p class="footer-rel sitemap-item">
                    <a target="_blank" href="http://www.csu.edu.cn">中南大学</a>&nbsp;|
                    <a target="_blank" href="http://software.csu.edu.cn">软件学院</a>&nbsp;|
                    <router-link :to="{path: '/admin'}">管理员入口</router-link>&nbsp;|
                    <a target="_blank" href="https://github.com/jxpxxzj/cslds-software-csu">关于</a>
                </p>
                <p class="footer-rel">© 2017 Center for Student Learning Development and Service by School of Software, Central South University , All rights reserved.</p>
            </el-row>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.settingForm.password.repeat !== '') {
                    this.$refs.settingFormPassword.validateField('repeat');
                }
                callback();
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.settingForm.password.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        const validatePassReg = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.registerForm.repeat !== '') {
                    this.$refs.registerForm.validateField('repeat');
                }
                callback();
            }
        };
        const validatePass2Reg = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        const validateUsername = (rule, value, callback) => {
            this.$axios.get('/person/isUsernameExist/' + value)
            .then((response) => {
                if (response.data.isExist.toString() === 'true') {
                    callback(new Error('用户名已存在'));
                } else {
                    callback();
                }
            });
        };

        return {
            loginFormVisible: false,
            loginForm: {
                username: '',
                password: ''
            },
            tabSelected: 'login',
            settingFormVisible: false,
            settingForm: {
                password: {
                    oldPassword: '',
                    password: '',
                    repeat: ''
                },
                user: {
                    class: '',
                    number: 0,
                    phone: 0,
                    qq: 0
                }
            },
            registerForm: {
                username: '',
                password: '',
                repeat: '',
                class: '',
                phone: '',
                qq: ''
            },
            registerRule: {
                username: [
                /*eslint-disable*/
                    { required: true, message: '用户名不能为空' },
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空' },
                    { validator: validatePassReg, trigger: 'blur' }
                ],
                repeat: [
                    { required: true, message: '重复密码不能为空' },
                    { validator: validatePass2Reg, trigger: 'blur' }
                ],
                class: [
                    { required: true, message: '班级不能为空' }
                ],
                number: [
                    { required: true, message: '学号不能为空' },
                    { type: 'number', message: '学号必须为数字' }
                ],
                phone: [
                    { required: true, message: '电话不能为空' },
                    { type: 'number', message: '电话必须为数字' }
                ],
                qq: [
                    { required: true, message: 'QQ 不能为空' },
                    { type: 'number', message: 'QQ 必须为数字' }
                ]
            },
            passwordRule: {
                oldPassword: [
                    { required: true, message: '原密码不能为空' }
                ],
                password: [
                    { required: true, message: '新密码不能为空' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                repeat: [
                    { required: true, message: '重复新密码不能为空' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            /*eslint-enable*/
            isLogin: false
        };
    },
    methods: {
        onLogin() {
            this.loginFormVisible = true;
        },
        onLogout() {
            this.$store.commit('setUser', {

            });
            this.isLogin = false;
            this.$message({
                type: 'success',
                message: '下次再见~',
                duration: 1000
            });
            this.loginForm.username = '';
            this.loginForm.password = '';
            this.$router.push({
                path: '/'
            });
        },
        onSetting() {
            this.settingForm.user = this.$store.state.user;
            this.settingFormVisible = true;
        },
        async onSaveInfoClick() {
            this.$refs.settingFormUser.validate(async (valid) => {
                if (valid) {
                    const response = await this.$axios.post('/person/updateInfo', this.settingForm.user);
                    if (response.data.code.toString() === '200') {
                        this.settingFormVisible = false;
                        this.$message({
                            type: 'success',
                            message: '修改成功',
                            duration: 1000
                        });
                        this.$store.commit('setUser', this.settingForm.user);
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '修改失败, 请检查是否有字段填写错误',
                            duration: 1000
                        });
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: '提交失败',
                        duration: 1000
                    });
                }
            });
        },
        async onSavePasswordClick() {
            const response = await this.$axios.post('/person/updatePassword', this.settingForm.password);
            if (response.data.code.toString() === '200') {
                this.settingFormVisible = false;
                this.$message({
                    type: 'success',
                    message: '修改成功',
                    duration: 1000
                });
            } else {
                this.$message({
                    type: 'error',
                    message: '修改失败, 请检查原密码是否正确',
                    duration: 1000
                });
            }
        },
        async onRegisterClick() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    const response = await this.$axios.post('/person/register', this.registerForm);
                    if (response.data.code.toString() === '200') {
                        this.loginFormVisible = false;
                        this.$message({
                            type: 'success',
                            message: '注册成功',
                            duration: 1000
                        });
                        this.registerForm = {

                        };
                        this.tabSelected = 'login';
                    } else {
                        this.$message({
                            type: 'error',
                            message: '注册失败, 请检查网络',
                            duration: 1000
                        });
                    }
                }
            });
        },
        async onLoginClick() {
            const response = await this.$axios.post('/person/login', this.loginForm);
            if (typeof response.data.code === 'undefined') {
                this.isLogin = true;
                this.$store.commit('setUser', response.data);
                this.loginFormVisible = false;
                this.$message({
                    type: 'success',
                    message: '欢迎回来, ' + response.data.username,
                    duration: 1000
                });
            } else {
                this.$message({
                    type: 'error',
                    message: '登录失败, 请检查用户名和密码是否正确',
                    duration: 1000
                });
            }
        }
    }
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

pre {
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      white-space: pre-wrap;
      word-wrap: break-word;
}

a:active, a:hover, a:link, a:visited {
    outline-style: none;
}

a {
    color: #1d8ce0;
    text-decoration: none;
    transition: color 0.3s ease;
}

.container {
    margin: 0 auto;
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
    padding-bottom:80px;
}

.clearfix:before,　.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
footer
{
    position: absolute;
    background-color: #eef1f6;
    width: 100%;
    bottom: 0px;
}
.sitemap-item
{
    font-size: 12px;
    color: #48576a;
    text-decoration: none;
    transition: color 80ms linear;
    margin-top: 8px;
    margin-bottom: 4px;
}
.sitemap-item a
{
    font-size: 12px;
    color: #48576a;
    text-decoration: none;
    transition: color 80ms linear;
}
.sitemap-item a:hover
{
    color: #48576a;
}
.footer-rel
{
    text-align: center;
    font-size: 12px;
    color: #48576a;
}

.menu-container {
    color: #222;
    position: relative;
    z-index: 10000;
}

.menu-container{
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    height: 42px;
    background: rgba(238,241,246,0.9);
    box-shadow: rgba(0,0,0,0.1) 0 1px 2px;
    top: 0;
    left: 0;
    width: 100%;
    position: relative;
    z-index: 10;
    font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;
}
.menu-container a:hover {
    background-color: rgba(238,241,246,0.9);
}
.menu-container .nav a {
    display: inline-block;
    font-size: 14px;
    line-height: 42px;
    height: 42px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    position: relative;
}

.menu-container .nav .left {
    padding-left: 30px;
    float: left;
}

.menu-container .nav .right {
    padding-right: 30px;
    float: right;
}


.header {
    margin-top: -42px;
    height: 212px;
    background-image: url(./assets/header.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    box-shadow: rgba(0,0,0,0.1) 0 1px 2px;
}
.header .logo {
    width: 100px;
    height: 80px;
}
.header .logo img {
    width: 100px; 
    margin: 35px;
}
.header .text {
    position: relative;
    float: left;
    margin-left: 170px;
    font-size: 30px;
    color: #fff;
}
</style>

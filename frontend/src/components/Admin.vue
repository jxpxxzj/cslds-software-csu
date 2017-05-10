<template>
    <div class="container">
        <el-row v-if="!isLogin">
            <el-form :model="loginForm">
                <el-form-item label="管理员账号">
                    <el-input v-model="loginForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码">
                    <el-input v-model="loginForm.password" auto-complete="off" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button type="primary" @click="onLoginClick">登录</el-button>
            </div>
        </el-row>
        <el-row v-if="isLogin">
            <el-row>
                <el-button-group>
                    <el-button v-for="obj in tabList" :key="obj.path" @click="onSwitch(obj.path)>{{ obj.name }}</el-button>
                </el-button-group>
                <el-row>&nbsp;</el-row>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-row>
        </el-row>
    
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabList: [{
                name: '中心简介',
                path: 'introduction'
            }, {
                name: '活动通告',
                path: 'activity'
            }, {
                name: '学业发展辅导通知',
                path: 'course'
            }, {
                name: '申请',
                path: 'apply'
            }, {
                name: '学习资料',
                path: 'material'
            }, {
                name: '辅导室',
                path: 'counselingRoom'
            }, {
                name: '导师介绍',
                path: 'teacher'
            }],
            loginForm: {
                account: '',
                password: ''
            },
            isLogin: false
        };
    },
    methods: {
        onSwitch(name) {
            this.$router.push({
                path: '/admin/' + name
            });
        },
        onLoginClick() {
            this.$axios.post('/admin/login', this.loginForm)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.isLogin = true;
                } else if (response.data.code.toString() === '401') {
                    this.$message({
                        type: 'error',
                        message: '登录失败, 请检查用户名和密码'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '登录失败, 请检查网络'
                    });
                }
            });
        }
    }
};
</script>

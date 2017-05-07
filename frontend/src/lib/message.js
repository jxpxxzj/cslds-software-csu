import Vue from 'vue';

export default {
    OK() {
        Vue.prototype.$message({
            type: 'success',
            message: '操作成功',
            duration: 1000,
            showClose: true
        });
    },
    Unauthorized() {
        Vue.prototype.$message({
            type: 'error',
            message: '操作失败, 请检查登录状态',
            duration: 1000,
            showClose: true
        });
    },
    NetworkError() {
        Vue.prototype.$message({
            type: 'error',
            message: '操作失败, 请检查网络',
            duration: 1000,
            showClose: true
        });
    },
    caseCode(code) {
        switch (+code) {
        case 200:
            this.OK();
            break;
        case 401:
            this.Unauthorized();
            break;
        default:
            this.NetworkError();
            break;
        }
    }
};

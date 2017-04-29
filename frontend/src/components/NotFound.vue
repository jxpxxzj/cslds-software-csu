<template>
<div class="container">
    <div class="content">
        <div class="search">
            <div class="tabs">
                <a>提示</a>
            </div>
            <div>
                <p>从前有座山，山里有座庙，庙里有个页面，现在找不到...</p>
                <el-button type="primary" ref="againbtn" @click="onAgain" :disabled="btnDisabled">{{ btnText }}</el-button>
                <el-button type="primary" @click="onMail">跟老板告状</el-button>
                <el-button type="primary" @click="onReturn">返回首页</el-button>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.content {
    position: relative;
    display: block;
    max-width: 1110px;
    width: 100%;
    padding-top: 5.125em;
    margin: 0 auto;
    font-size: 13px;
    clear: both;
    overflow: hidden
}
.search {
    width: 96%;
    min-height: 350px;
    background: #fff;
    padding: 18px 2%;
    color: #414141;
    overflow: hidden;
    clear: both
}
.tabs {
    position: relative;
    width: 100%;
    border-bottom: solid 1px #20a0ff;
    margin: 0 0 1.4em 0;
    overflow: hidden;
    height: 43px
}
.tabs a {
    display: block;
    color: #20a0ff;
    font-size: 16px
}
a {
    text-decoration: none;
    outline: 0
}
</style>
<script>
export default {
    data() {
        return {
            wait: 60,
            btnText: '点一次，扣程序员一块钱',
            btnDisabled: false
        };
    },
    methods: {
        time(a) {
            if (this.wait === 0) {
                this.btnText = '再扣一次';
                this.wait = 60;
                this.btnDisabled = false;
            } else {
                this.btnText = '再扣一次(' + this.wait + ')';
                this.wait--;
                this.btnDisabled = true;
                setTimeout(() => {
                    this.time(a);
                }, 1000);
            }
        },
        onAgain() {
            this.time(this.$refs.againbtn);
        },
        onMail() {
            document.location.href = 'mailto:28256042@qq.com';
        },
        onReturn() {
            this.$router.push('/');
        }
    }
};
</script>

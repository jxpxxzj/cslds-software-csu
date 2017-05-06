<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :xs="24" :md="6" >
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">中心简介</span>
                            <el-button style="float: right;" type="primary" @click="toggleClick">查看详细</el-button>
                        </div>
                        <div class="text item">
                            {{ intro.introduction }}
                        </div>
                    </el-card>
                </el-row>
                <el-row>&nbsp;</el-row>
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">自习室</span>
                        </div>
                        <div class="text item" v-for="obj in room" :key="obj.id">
                            {{ obj.place }} <el-tag style="float: right">{{ new Date(obj.time).toLocaleString() }}</el-tag> 
                        </div>
                    </el-card>
                </el-row>
            </el-col>
            <el-col :xs="24" :md="18">
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">活动通告</span>
                        </div>
                        <div class="text item" v-for="obj in act" :key="obj.id">
                            <a :href="obj.address">{{ obj.title }}</a>  <el-tag style="float: right">{{ new Date(obj.date).toLocaleDateString() }}</el-tag> 
                        </div>
                    </el-card>
                </el-row>
                <el-row>&nbsp;</el-row>
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">学业发展辅导通知</span>
                        </div>
                        <div class="text item" v-for="obj in cou" :key="obj.id">
                            {{ obj.course }} <el-tag type="primary">{{ obj.place }}</el-tag> <el-tag style="float: right">{{ new Date(obj.time).toLocaleString() }}</el-tag> 
                        </div>
                    </el-card>
                </el-row>
            </el-col>
        </el-row>  
        <el-dialog title="中心简介" v-model="dialogVisible">
            <h3>中心简介</h3>
            <pre>{{ intro.introduction }}</pre>
            <h3>章程</h3>
            <pre>{{ intro.constitution }}</pre>
            <h3>规章制度</h3>
            <pre>{{ intro.rule }}</pre>
        </el-dialog>
    </div>
</template>
<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 10px 0;
  }
</style>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            intro: {

            },
            act: {

            },
            cou: {

            },
            room: []
        };
    },
    created() {
        this.$axios.get('/introduction/get')
        .then((response) => {
            this.intro = response.data;
        });
        this.$axios.get('/activity/list')
        .then((response) => {
            this.act = response.data;
        });
        this.$axios.get('/course/list')
        .then((response) => {
            this.cou = response.data;
        });

        this.$axios.get('/counselingRoom/list')
        .then((response) => {
            this.room = response.data;
        });
    },
    methods: {
        toggleClick() {
            this.dialogVisible = true;
        }
    }
};
</script>

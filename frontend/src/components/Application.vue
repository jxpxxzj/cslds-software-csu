<template>
    <div class="container">
        <el-button type="primary" @click="onApplyClick">添加申请</el-button>
        <el-row>&nbsp;</el-row>
        <el-table border :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="detail" label="描述"></el-table-column>
            <el-table-column label="时间" width="180">
                <template scope="scope">
                    {{ new Date(scope.row.createdAt).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" width="180"></el-table-column>
        </el-table>
        <el-dialog title="申请" v-model="applyFormVisible">
            <el-form :model="apply"  ref="applyForm">
                <el-form-item label="申请类型" prop="type" :rules="[{ required: true, message: '类型不能为空'}]">
                    <el-select v-model="apply.type" placeholder="请选择申请类型" >
                        <el-tooltip v-for="obj in typeList" :key="obj.name" :content="obj.description" placement="right">
                            <el-option :label="obj.name" :value="obj.name"></el-option>
                        </el-tooltip>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请描述">
                    <el-input v-model="apply.detail" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmitClick">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
.el-table .positive-row {
    background: #e2f0e4;
  }
</style>
<script>
export default {
    data() {
        return {
            tableData: [],
            apply: {
                type: '',
                detail: ''
            },
            typeList: [
                {
                    name: '辅导室使用申请',
                    description: '用于班级或者团队活动，如：开班会等'
                }, {
                    name: '个人自习申请',
                    description: '申请空教室用于自习'
                }, {
                    name: '个人一对一辅导申请',
                    description: '学业有困难，上课跟不上的或者渴望学习高深知识的同学可以申请（请在申请描述中说明具体情况）'
                }, {
                    name: '课程辅导申请',
                    description: '用于集体补课，或者考前复习'
                }, {
                    name: '发展辅导申请',
                    description: '分为竞赛辅导申请和职业规划辅导申请（请在申请描述中说明具体情况）'
                }
            ],
            applyFormVisible: false
        };
    },
    /*eslint-disable*/
    beforeCreate() {
        if (this.$store.state.user === {}) {
            this.$router.push({
                path: '/'
            });
        }
    },
    created() {
        if (this.$store.state.user === {}) {
            this.$router.push({
                path: '/'
            });
        }
        this.fetchData();
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if(vm.$store.state.user.username === undefined) {
                vm.$router.push('/');
            } 
        });
    },
    /*eslint-enable*/
    methods: {
        async fetchData() {
            const response = await this.$axios.get('/application/getByPerson');
            this.tableData = response.data;
        },
        tableRowClassName(row) {
            if (row.state === '已阅') {
                return 'positive-row';
            }
            return '';
        },
        onApplyClick() {
            this.applyFormVisible = true;
        },
        async onSubmitClick() {
            this.$refs.applyForm.validate(async (valid) => {
                if (valid) {
                    const response = await this.$axios.post('/application/add', this.apply);
                    if (response.data.code.toString() === '200') {
                        this.$message({
                            type: 'success',
                            message: '提交成功, 请等待审核',
                            duration: 1000
                        });
                        this.fetchData();
                        this.applyFormVisible = false;
                        this.apply.detail = '';
                    } else {
                        this.$message({
                            type: 'error',
                            message: '提交失败, 请检查是否登录'
                        });
                        this.$router.push({
                            path: '/'
                        });
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '提交失败, 请检查是否有字段填写错误',
                        duration: 1000
                    });
                }
            });
        }
    }
};
</script>

<template>
    <div>
        <el-button type="primary" @click="onAddClick">添加</el-button>
        <el-row>&nbsp;</el-row>
        <el-table stripe border :data="teacher" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="介绍">
                            <span>{{ props.row.intro }}</span>
                        </el-form-item>
                        <el-form-item label="图片">
                            <img :src="props.row.image">
                        </el-form-item>
                        <el-form-item label="类别">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="班级">
                            <span>{{ props.row.class }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="辅导科目">
                            <span>{{ props.row.subject }}</span>
                        </el-form-item>
                        <el-form-item label="工作成就">
                            <span>{{ props.row.achievement }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button type="text" size="small" @click="onRowClick(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="onRowDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="导师编辑" v-model="dialogVisible">
            <el-form :model="form">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input type="textarea" v-model="form.intro" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input v-model="form.image" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="专业导师" value="专业导师"></el-option>
                        <el-option label="成长导师" value="成长导师"></el-option>
                        <el-option-group label="学生导师">
                            <el-option label="朋辈导师" value="朋辈导师"></el-option>
                            <el-option label="党员导师" value="党员导师"></el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级 / 职务">
                    <el-input v-model="form.class" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="辅导科目">
                    <el-input v-model="form.subject" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="工作成就">
                    <el-input v-model="form.achievement" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped>
.table-expand {
    font-size: 0;
}
.table-expand label {
    width: 90px;
    color: #99a9bf;
}
.table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
<script>
import Message from '../../lib/message';

export default {
    data() {
        return {
            dialogVisible: false,
            type: 'add',
            teacher: [],
            form: {
                name: '',
                intro: '',
                image: '',
                type: '',
                class: '',
                phone: '',
                subject: '',
                achievement: ''
            }
        };
    },
    created() {
        this.refresh();
    },
    methods: {
        async refresh() {
            const response = await this.$axios.get('/teacher/list');
            this.teacher = response.data;
            this.dialogVisible = false;
        },
        onAddClick() {
            this.dialogVisible = true;
            this.type = 'add';
            this.form = {
                name: '',
                intro: '',
                image: ''
            };
        },
        onRowClick(index, row) {
            this.dialogVisible = true;
            this.form = row;
            this.type = 'update';
        },
        async onRowDelete(index, row) {
            const response = await this.$axios.get('/teacher/remove/' + row.id);
            if (response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code);
        },
        async onSubmit() {
            const response = await this.$axios.post('/teacher/' + this.type, this.form);
            if (response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code);
        }
    }
};
</script>

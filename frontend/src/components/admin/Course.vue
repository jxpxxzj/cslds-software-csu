<template>
    <div>
        <el-button type="primary" @click="onAddClick">添加</el-button>
        <el-row>&nbsp;</el-row>
        <el-table stripe border :data="course" style="width: 100%">
            <el-table-column prop="course" label="标题"></el-table-column>
            <el-table-column prop="place" label="地点"></el-table-column>
            <el-table-column label="时间" width="180">
                <template scope="scope">
                    {{ new Date(scope.row.time).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="70">
                <template scope="scope">
                    <el-button type="text" size="small" @click="onRowClick(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="课程编辑" v-model="dialogVisible">
            <el-form :model="form">
                <el-form-item label="课程">
                    <el-input v-model="form.course" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="form.place" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="时间">
                    <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Message from '../../lib/message';

export default {
    data() {
        return {
            course: [],
            form: {
                course: '',
                time: '',
                place: ''
            },
            dialogVisible: false,
            type: 'add'
        };
    },
    created() {
        this.refresh();
    },
    methods: {
        async refresh() {
            const response = await this.$axios.get('/course/list');
            this.course = response.data;
            this.dialogVisible = false;
        },
        onAddClick() {
            this.dialogVisible = true;
            this.type = 'add';
            this.form = {
                course: '',
                time: new Date(),
                place: ''
            };
        },
        onRowClick(index, row) {
            this.dialogVisible = true;
            this.form = row;
            this.type = 'update';
        },
        async onSubmit() {
            const response = await this.$axios.post('/course/' + this.type, this.form);
            if (response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code);
        }
    }
};
</script>

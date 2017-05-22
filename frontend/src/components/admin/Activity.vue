<template>
    <div>
        <el-button type="primary" @click="onAddClick">添加</el-button>
        <el-row>&nbsp;</el-row>
        <el-table stripe border :data="activity" style="width: 100%">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="address" label="文件">
                <template scope="scope">
                    <a :href="scope.row.address" download="">{{ scope.row.address.split('_').slice(1).join('_') }}</a>
                </template>
            </el-table-column>
            <el-table-column label="日期" width="180">
                <template scope="scope">
                    {{ new Date(scope.row.date).toLocaleDateString() }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button type="text" size="small" @click="onRowClick(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="onRowDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="活动编辑" v-model="dialogVisible">
            <el-form :model="form">
                <el-form-item label="标题">
                    <el-input v-model="form.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="文件">
                    <el-upload ref="upload" :action="this.baseURL + '/material/upload'" with-credentials :on-success="onUploadSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                 <el-form-item label="日期">
                    <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
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
            activity: [],
            form: {
                title: '',
                address: '',
                date: ''
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
            const response = await this.$axios.get('/activity/list');
            this.activity = response.data;
            this.dialogVisible = false;
        },
        onAddClick() {
            this.dialogVisible = true;
            this.type = 'add';
            this.form = {
                title: '',
                address: '',
                date: new Date()
            };
            if (this.$refs.upload !== undefined) {
                this.$refs.upload.clearFiles();
            }
        },
        onRowClick(index, row) {
            this.dialogVisible = true;
            this.form = row;
            this.type = 'update';
            if (this.$refs.upload !== undefined) {
                this.$refs.upload.clearFiles();
            }
        },
        async onRowDelete(index, row) {
            const response = await this.$axios.get('/activity/remove/' + row.id);
            if (response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code)();
        },
        async onSubmit() {
            const response = await this.$axios.post('/activity/' + this.type, this.form);
            if (response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code);
        },
        onUploadSuccess(response) {
            this.form.address = this.baseURL + '/material/download/' + response.path;
        }
    }
};
</script>

<template>
    <div>
        <el-table stripe border :data="material" style="width:100%">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="文件">
                <template scope="scope">
                    <a :href="scope.row.address">{{ scope.row.address.split('_').slice(1).join('_') }}</a>
                </template>
            </el-table-column>
            <el-table-column label="发布日期" prop="updatedAt"></el-table-column>
            <el-table-column width="180" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="rowClick(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteR(scope.$index, scope.row)">删除</el-button>
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
            research: [],
            form: {
                title: '',
                address: ''
            },
            dialogVisible: false,
            type: add
        }
    },
    created() {

    },
    methods: {
        async refresh() {
            const response = await this.$axios.get('/research/list');
            this.research = response.data;
        },
        rowClick(index, row) {
            this.type = 'update';
            this.dialogVisible = true;
            this.form = row;
            if (this.$refs.upload !== undefined) {
                this.$refs.upload.clearFiles();
            }
        },
        async deleteR(index, row) {
            const response = await this.$axios.get('/research/delete/' + row.id);
            const result = response.data;
            if(response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code);
        },
        async onSubmit() {
            const response = await this.$axios.post('/research/' + this.type, this.form);
            if (response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code);
        }
    }
}
</script>

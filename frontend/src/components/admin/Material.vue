<template>
    <div>
        <el-tabs>
            <el-tab-pane label="文件列表">
                <el-upload :action="this.baseURL + '/material/upload'" with-credentials :on-success="refreshFileList">
                    上传新文件:&nbsp;&nbsp;
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <el-row>&nbsp;</el-row>
                <el-table stripe border :data="fileList" style="width:100%">
                    <el-table-column label="文件名">
                        <template scope="scope">
                            {{ scope.row }}
                        </template>
                    </el-table-column>
                    <el-table-column width="70" label="操作">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="publishFile(scope.$index, scope.row)">发布</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已发布资料">
                <el-table stripe border :data="material" style="width:100%">
                    <el-table-column label="标题" prop="title"></el-table-column>
                    <el-table-column label="文件名" prop="address"></el-table-column>
                    <el-table-column width="180" label="操作">
                        <template scope="scope">
                            <el-button type="text" size="small">下载</el-button>
                            <el-button type="text" size="small" @click="deleteMaterial(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="学习资料编辑" v-model="dialogVisible">
            <el-form :model="form">
                <el-form-item label="标题">
                    <el-input v-model="form.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="文件">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
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
            fileList: [],
            form: {
                title: '',
                address: ''
            },
            material: [],
            dialogVisible: false
        };
    },
    created() {
        this.refresh();
        this.refreshFileList();
    },
    methods: {
        refresh() {
            this.$axios.get('/material/list')
                .then((response) => {
                    this.material = response.data;
                    this.dialogVisible = false;
                });
        },
        refreshFileList() {
            this.$axios.get('/material/listFile')
            .then((response) => {
                this.fileList = response.data;
            });
        },
        publishFile(index, row) {
            this.dialogVisible = true;
            this.form = {
                title: '',
                address: row
            };
        },
        onSubmit() {
            this.$axios.post('/material/add', this.form)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.refresh();
                }
                Message.caseCode(response.data.code);
            });
        },
        deleteMaterial(index, row) {
            this.$axios.get('/material/delete/' + row.id)
            .then((response) => {
                if (response.data.code.toString() === '200') {
                    this.refresh();
                }
                Message.caseCode(response.data.code);
            });
        }
    }
};
</script>

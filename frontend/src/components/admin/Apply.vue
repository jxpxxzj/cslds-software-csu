<template>
    <div>
        <el-table stripe border :data="apply" style="width: 100%">
            <el-table-column prop="person" label="申请人" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="detail" label="描述"></el-table-column>
            <el-table-column label="时间" width="180">
                <template scope="scope">
                    {{ new Date(scope.createdAt).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button type="text" size="small" @click="onRowClick(scope.$index, scope.row)">回复</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="回复申请" v-model="dialogVisible">
            <el-form :model="reply">
                <el-form-item label="描述">
                    <el-input v-model="reply.detail" auto-complete="off"></el-input>
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
            apply: [],
            reply: {
                id: 0,
                detail: ''
            },
            dialogVisible: false
        };
    },
    created() {
        this.refresh();
    },
    methods: {
        async refresh() {
            const response = await this.$axios.get('/application/getByState/申请中');
            this.apply = response.data;
            this.dialogVisible = false;
        },
        onRowClick(index, row) {
            this.reply = row;
            this.dialogVisible = true;
        },
        async onSubmit() {
            const response = await this.$axios.post('/application/update', this.reply)
            if (response.data.code.toString() === '200') {
                this.refresh();
            }
            Message.caseCode(response.data.code);
        }
    }
};
</script>

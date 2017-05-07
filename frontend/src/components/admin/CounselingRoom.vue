<template>
    <div>
        <el-button type="primary" @click="onAddClick">添加</el-button>
        <el-row>&nbsp;</el-row>
        <el-table stripe border :data="room" style="width: 100%">
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
        <el-dialog title="辅导室编辑" v-model="dialogVisible">
            <el-form :model="form">
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
            room: [],
            form: {
                place: '',
                time: ''
            },
            dialogVisible: false,
            type: 'add'
        };
    },
    created() {
        this.refresh();
    },
    methods: {
        refresh() {
            this.$axios.get('/counselingRoom/list')
            .then((response) => {
                this.room = response.data;
            });
        },
        onAddClick() {
            this.dialogVisible = true;
            this.type = 'add';
            this.form = {
                place: '',
                time: new Date()
            };
        },
        onRowClick(index, row) {
            this.dialogVisible = true;
            this.form = row;
            this.type = 'update';
        },
        onSubmit() {
            this.$axios.post('/counselingRoom/' + this.type, this.form)
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

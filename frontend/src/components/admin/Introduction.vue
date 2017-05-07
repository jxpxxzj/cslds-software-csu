<template>
    <el-form :model="form" label-width="80px">
        <el-form-item label="中心简介">
            <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="章程">
            <el-input type="textarea" v-model="form.constitution"></el-input>
        </el-form-item>
        <el-form-item label="规章制度">
            <el-input type="textarea" v-model="form.rule"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="onSave">保存编辑</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Message from '../../lib/message';

export default {
    data() {
        return {
            form: {
                introduction: '',
                constitution: '',
                rule: ''
            }
        };
    },
    created() {
        this.$axios.get('/introduction/get')
        .then((response) => {
            this.form = response.data;
        });
    },
    methods: {
        onSave() {
            this.$axios.post('/introduction/update', this.form)
            .then((response) => {
                Message.caseCode(response.data.code);
            });
        }
    }
};
</script>

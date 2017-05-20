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
    async created() {
        const response = await this.$axios.get('/introduction/get');
        this.form = response.data;
    },
    methods: {
        async onSave() {
            const response = await this.$axios.post('/introduction/upsert', this.form);
            Message.caseCode(response.data.code);
        }
    }
};
</script>

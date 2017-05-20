<template>
    <div class="container">
        <el-table stripe border :data="material" style="width:100%">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column width="80" label="操作">
                <template scope="scope">
                    <a :href="baseURL + '/material/download/' + scope.row.address">下载</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style>
</style>
<script>
export default {
    data() {
        return {
            material: []
        };
    },
    async created() {
        const response = await this.$axios.get('/material/list');
        this.material = response.data;
    }
};
</script>

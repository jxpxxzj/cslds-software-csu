<template>
    <div class="container">
        <el-table stripe border :data="material" style="width:100%">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="发布日期" width="200" prop="date"></el-table-column>
            <el-table-column width="80" label="操作">
                <template scope="scope">
                    <a :href="baseURL + '/material/download/' + scope.row.address">下载</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<<script>
export default {
    data() {
        return {
            report: []
        }
    },
    async created() {
        const response = await this.$axios.get('/report/list');
        this.report = response.data;
    }
}
</script>

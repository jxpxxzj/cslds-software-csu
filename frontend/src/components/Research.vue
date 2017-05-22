<template>
    <div class="container">
        <el-table stripe border :data="research" style="width:100%">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="发布日期" width="200">
                <template scope="scope">
                    {{ new Date(scope.row.updatedAt).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column width="80" label="操作">
                <template scope="scope">
                    <a :href="scope.row.address" download="">下载</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            research: []
        };
    },
    async created() {
        const response = await this.$axios.get('/research/list');
        this.research = response.data;
    }
};
</script>
